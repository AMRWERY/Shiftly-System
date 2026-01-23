import { serverSupabaseServiceRole } from "#supabase/server";
import type { Permission } from "../../../../../../layers/base/types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const { name, displayName, description, permissions } = body as {
    name: string;
    displayName: string;
    description: string;
    permissions: Permission[];
  };

  // Validate required fields
  if (!name || !displayName) {
    throw createError({
      statusCode: 400,
      statusMessage: "Role name and display name are required",
    });
  }

  try {
    // Check if role already exists
    const { data: existingRole } = await supabase
      .from("roles")
      .select("id")
      .eq("name", name)
      .single();

    if (existingRole) {
      throw createError({
        statusCode: 409,
        statusMessage: "Role with this name already exists",
      });
    }

    // Create the role
    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .insert({
        name,
        display_name: displayName,
        description: description || "",
        is_system_role: false,
      })
      .select()
      .single();

    if (roleError) throw roleError;

    // Insert permissions
    if (permissions && permissions.length > 0) {
      const permissionsToInsert = permissions.map((perm) => ({
        role_id: roleData.id,
        module: perm.module,
        actions: perm.actions,
      }));

      const { error: permissionsError } = await supabase
        .from("role_permissions")
        .insert(permissionsToInsert);

      if (permissionsError) throw permissionsError;
    }

    return {
      role: {
        id: roleData.id,
        name: roleData.name,
        displayName: roleData.display_name,
        description: roleData.description,
        isSystemRole: roleData.is_system_role,
        userCount: 0,
        createdAt: roleData.created_at,
        updatedAt: roleData.updated_at,
        permissions: permissions || [],
      },
    };
  } catch (error: any) {
    console.error("Error creating role:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to create role",
    });
  }
});
