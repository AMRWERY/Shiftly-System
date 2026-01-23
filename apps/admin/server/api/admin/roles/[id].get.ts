import { serverSupabaseServiceRole } from "#supabase/server";
import type { RoleWithPermissions } from "../../../../../../layers/base/types";

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
    // Fetch role
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

    // Fetch permissions
    const { data: permissionsData, error: permissionsError } = await supabase
      .from("role_permissions")
      .select("*")
      .eq("role_id", roleId);

    if (permissionsError) throw permissionsError;

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

    // Get user count
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", roleData.name);

    // Fetch users with this role
    const { data: usersData } = await supabase
      .from("users")
      .select("id, email, first_name, last_name, status")
      .eq("role", roleData.name)
      .limit(10);

    const role: RoleWithPermissions = {
      id: roleData.id,
      name: roleData.name,
      displayName: roleData.display_name,
      description: roleData.description,
      isSystemRole: roleData.is_system_role,
      userCount: count || 0,
      createdAt: roleData.created_at,
      updatedAt: roleData.updated_at,
      permissions: Array.from(permissionsMap.values()),
    };

    return {
      role,
      users: usersData || [],
    };
  } catch (error: any) {
    console.error("Error fetching role:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to fetch role",
    });
  }
});
