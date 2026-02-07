import { serverSupabaseServiceRole } from "#supabase/server";

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

    if (existingRole.is_system_role) {
      throw createError({
        statusCode: 403,
        statusMessage: "Cannot delete system role",
      });
    }

    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .or(`role_id.eq.${roleId},role.eq.${existingRole.name}`);

    if (count && count > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: `Cannot delete role. ${count} user(s) are assigned to this role.`,
      });
    }

    const { error: permError } = await supabase
      .from("role_permissions")
      .delete()
      .eq("role_id", roleId);
    if (permError) throw permError;

    const { error: roleError } = await supabase
      .from("roles")
      .delete()
      .eq("id", roleId);
    if (roleError) throw roleError;

    return { success: true, message: "Role deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting role:", error);
    throw createError({
      statusCode: error.statusCode ?? 500,
      statusMessage: error.statusMessage ?? "Failed to delete role",
    });
  }
});
