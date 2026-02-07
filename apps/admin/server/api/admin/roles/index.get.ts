import { serverSupabaseServiceRole } from "#supabase/server";
import type {
  RoleWithPermissions,
  Permission,
  PermissionModule,
  PermissionAction,
} from "../../../../../../layers/base/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event);

  try {
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("*")
      .order("created_at", { ascending: false });

    if (rolesError) {
      if (
        rolesError.code === "42P01" ||
        rolesError.message?.includes("does not exist")
      ) {
        throw createError({
          statusCode: 503,
          statusMessage:
            "Database tables not created. Please run the SQL scripts in docs/database/.",
        });
      }
      throw rolesError;
    }

    if (!rolesData || rolesData.length === 0) {
      return { roles: [] };
    }

    const rolesWithPermissions: RoleWithPermissions[] = await Promise.all(
      rolesData.map(async (role) => {
        const { data: rpData, error: rpError } = await supabase
          .from("role_permissions")
          .select("module, actions")
          .eq("role_id", role.id);

        const permissionsMap = new Map<string, string[]>();
        if (!rpError && rpData?.length) {
          for (const row of rpData as { module: string; actions: string[] | string }[]) {
            const module = row.module;
            let actions: string[] = [];
            if (Array.isArray(row.actions)) actions = row.actions;
            else if (typeof row.actions === "string") {
              try {
                const parsed = JSON.parse(row.actions);
                actions = Array.isArray(parsed) ? parsed : row.actions.split(",").map((s) => s.trim());
              } catch {
                actions = row.actions.split(",").map((s) => s.trim());
              }
            }
            if (!module) continue;
            if (!permissionsMap.has(module)) permissionsMap.set(module, []);
            for (const a of actions) {
              if (a && !permissionsMap.get(module)!.includes(a)) {
                permissionsMap.get(module)!.push(a);
              }
            }
          }
        }

        const permissions: Permission[] = Array.from(permissionsMap.entries()).map(
          ([module, actions]) => ({
            module: module as PermissionModule,
            actions: actions as PermissionAction[],
          }),
        );

        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .or(`role_id.eq.${role.id},role.eq.${role.name}`);

        return {
          id: role.id,
          name: role.name,
          displayName: role.display_name,
          description: role.description,
          isSystemRole: role.is_system_role,
          userCount: count ?? 0,
          createdAt: role.created_at,
          updatedAt: role.updated_at,
          permissions,
        };
      }),
    );

    return { roles: rolesWithPermissions };
  } catch (error: any) {
    console.error("Error fetching roles:", error);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch roles",
    });
  }
});
