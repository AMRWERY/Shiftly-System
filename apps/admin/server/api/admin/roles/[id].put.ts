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

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (displayName !== undefined) updateData.display_name = displayName;
    if (description !== undefined) updateData.description = description;

    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .update(updateData)
      .eq("id", roleId)
      .select()
      .single();

    if (roleError) throw roleError;

    if (permissions) {
      const { error: delError } = await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", roleId);
      if (delError) throw delError;

      if (permissions.length > 0) {
        const toInsert = permissions.map((p) => ({
          role_id: roleId,
          module: p.module,
          actions: p.actions,
        }));
        const { error: insertError } = await supabase
          .from("role_permissions")
          .insert(toInsert);
        if (insertError) throw insertError;
      }
    }

    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .or(`role_id.eq.${roleId},role.eq.${roleData.name}`);

    return {
      role: {
        id: roleData.id,
        name: roleData.name,
        displayName: roleData.display_name,
        description: roleData.description,
        isSystemRole: roleData.is_system_role,
        userCount: count ?? 0,
        createdAt: roleData.created_at,
        updatedAt: roleData.updated_at,
        permissions: permissions ?? [],
      },
    };
  } catch (error: any) {
    console.error("Error updating role:", error);
    throw createError({
      statusCode: error.statusCode ?? 500,
      statusMessage: error.statusMessage ?? "Failed to update role",
    });
  }
});
