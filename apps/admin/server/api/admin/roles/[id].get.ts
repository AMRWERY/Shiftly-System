import { serverSupabaseServiceRole } from "#supabase/server";
import type {
  RoleWithPermissions,
  Permission,
  PermissionModule,
  PermissionAction,
} from "@/layers/base/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event);
  const roleId = getRouterParam(event, "id");

  if (!roleId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Role ID is required",
    });
  }

  try {
    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .select("*")
      .eq("id", roleId)
      .single();

    if (roleError || !roleData) {
      throw createError({
        statusCode: 404,
        statusMessage: "Role not found",
      });
    }

    const { data: rpData, error: rpError } = await supabase
      .from("role_permissions")
      .select("module, actions")
      .eq("role_id", roleId);

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
      .or(`role_id.eq.${roleId},role.eq.${roleData.name}`);

    const { data: usersData } = await supabase
      .from("profiles")
      .select("id, email, first_name, last_name, status")
      .or(`role_id.eq.${roleId},role.eq.${roleData.name}`)
      .limit(10);

    const role: RoleWithPermissions = {
      id: roleData.id,
      name: roleData.name,
      displayName: roleData.display_name,
      description: roleData.description,
      isSystemRole: roleData.is_system_role,
      userCount: count ?? 0,
      createdAt: roleData.created_at,
      updatedAt: roleData.updated_at,
      permissions,
    };

    return {
      role,
      users: usersData ?? [],
    };
  } catch (error: any) {
    console.error("Error fetching role:", error);
    throw createError({
      statusCode: error.statusCode ?? 500,
      statusMessage: error.statusMessage ?? "Failed to fetch role",
    });
  }
});
