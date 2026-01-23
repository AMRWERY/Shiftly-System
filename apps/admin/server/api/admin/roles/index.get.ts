import { serverSupabaseServiceRole } from "#supabase/server";
import type { RoleWithPermissions } from "../../../../../../layers/base/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event);

  try {
    // Fetch all roles except admin
    const { data: rolesData, error: rolesError } = await supabase
      .from("roles")
      .select("*")
      .neq("name", "admin")
      .order("created_at", { ascending: false });

    if (rolesError) {
      // Check if table doesn't exist
      if (
        rolesError.code === "42P01" ||
        rolesError.message?.includes("does not exist")
      ) {
        throw createError({
          statusCode: 503,
          statusMessage:
            "Database tables not created. Please run the SQL scripts to create 'roles' and 'role_permissions' tables.",
        });
      }
      throw rolesError;
    }

    // If no roles exist, return empty array
    if (!rolesData || rolesData.length === 0) {
      return {
        roles: [],
      };
    }

    // Fetch permissions for each role
    const rolesWithPermissions: RoleWithPermissions[] = await Promise.all(
      rolesData.map(async (role) => {
        const { data: permissionsData, error: permissionsError } =
          await supabase
            .from("role_permissions")
            .select("*")
            .eq("role_id", role.id);

        if (permissionsError) {
          console.error(
            "Error fetching permissions for role:",
            role.id,
            permissionsError,
          );
        }

        // Group permissions by module
        const permissionsMap = new Map();
        (permissionsData || []).forEach((perm) => {
          if (!permissionsMap.has(perm.module)) {
            permissionsMap.set(perm.module, {
              module: perm.module,
              actions: [],
            });
          }
          permissionsMap.get(perm.module).actions = perm.actions;
        });

        // Get user count for this role
        const { count } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", role.name);

        return {
          id: role.id,
          name: role.name,
          displayName: role.display_name,
          description: role.description,
          isSystemRole: role.is_system_role,
          userCount: count || 0,
          createdAt: role.created_at,
          updatedAt: role.updated_at,
          permissions: Array.from(permissionsMap.values()),
        };
      }),
    );

    return {
      roles: rolesWithPermissions,
    };
  } catch (error: any) {
    console.error("Error fetching roles:", error);

    // If it's already a createError, rethrow it
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to fetch roles",
    });
  }
});
