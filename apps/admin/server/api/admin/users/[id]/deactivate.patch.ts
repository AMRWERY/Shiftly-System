import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event);
  const userId = getRouterParam(event, "id");

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  try {
    // Get current user status
    const { data: currentUser, error: fetchError } = await client
      .from("profiles")
      .select("status, role")
      .eq("id", userId)
      .single();

    if (fetchError) throw fetchError;

    if (!currentUser) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    // Prevent deactivating admin users
    if (currentUser.role === "admin") {
      throw createError({
        statusCode: 403,
        statusMessage: "Cannot deactivate admin users",
      });
    }

    // Get current user auth data to preserve existing metadata
    const { data: userAuthData, error: getUserError } = await client.auth.admin.getUserById(userId);
    
    if (getUserError) {
      console.error("Failed to get user auth data:", getUserError);
      throw getUserError;
    }

    // Update user_metadata with new status
    const existingMetadata = userAuthData.user?.user_metadata || {};
    const updatedMetadata = {
      ...existingMetadata,
      status: "deactivated"
    };
    
    const { data: updatedAuthUser, error: authUpdateError } = await client.auth.admin.updateUserById(userId, {
      user_metadata: updatedMetadata
    });
    
    if (authUpdateError) {
      console.error("Failed to update user_metadata:", authUpdateError);
      throw authUpdateError;
    }

    // Update profiles table
    const { data: updatedUser, error: updateError } = await client
      .from("profiles")
      .update({ status: "deactivated" })
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Failed to update profiles table:", updateError);
      throw updateError;
    }

    return {
      success: true,
      user: updatedUser,
      message: "User deactivated successfully",
    };
  } catch (error: any) {
    console.error("Error deactivating user:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage:
        error.statusMessage || error.message || "Failed to deactivate user",
    });
  }
});
