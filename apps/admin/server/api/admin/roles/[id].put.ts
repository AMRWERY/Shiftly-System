import { serverSupabaseServiceRole } from "#supabase/server";
import type { Permission } from "../../../../../../layers/base/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event);
  const roleId = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!roleId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Role ID is required",
    });
  }

  const { displayName, description, permissions } = body as {
    displayName?: string;
    description?: string;
    permissions?: Permission[];
  };

  try {
    // Check if role exists
    const { data: existingRole, error: fetchError } = await supabase
      .from("roles")
      .select("*")
      .eq("id", roleId)
      .single();

    if (fetchError || !existingRole) {
      throw createError({
        statusCode: 404,
        statusMessage: "Role not found",
      });
    }

    // Prevent editing system roles' name
    if (existingRole.is_system_role) {
      throw createError({
        statusCode: 403,
        statusMessage: "Cannot modify system role",
      });
    }

    // Update role basic info
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (displayName) updateData.display_name = displayName;
    if (description !== undefined) updateData.description = description;

    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .update(updateData)
      .eq("id", roleId)
      .select()
      .single();

    if (roleError) throw roleError;

    // Update permissions if provided
    if (permissions) {
      // Delete existing permissions
      const { error: deleteError } = await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", roleId);

      if (deleteError) throw deleteError;

      // Insert new permissions
      if (permissions.length > 0) {
        const permissionsToInsert = permissions.map((perm) => ({
          role_id: roleId,
          module: perm.module,
          actions: perm.actions,
        }));

        const { error: insertError } = await supabase
          .from("role_permissions")
          .insert(permissionsToInsert);

        if (insertError) throw insertError;
      }
    }

    // Get user count
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", roleData.name);

    return {
      role: {
        id: roleData.id,
        name: roleData.name,
        displayName: roleData.display_name,
        description: roleData.description,
        isSystemRole: roleData.is_system_role,
        userCount: count || 0,
        createdAt: roleData.created_at,
        updatedAt: roleData.updated_at,
        permissions: permissions || [],
      },
    };
  } catch (error: any) {
    console.error("Error updating role:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to update role",
    });
  }
});
