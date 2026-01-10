import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const userId = getRouterParam(event, 'id')

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  try {
    // Get current user status
    const { data: currentUser, error: fetchError } = await client
      .from('profiles')
      .select('status, role')
      .eq('id', userId)
      .single()

    if (fetchError) throw fetchError

    if (!currentUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Prevent blocking admin users
    if (currentUser.role === 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Cannot block admin users',
      })
    }

    // Toggle status between 'active' and 'blocked'
    const newStatus = currentUser.status === 'blocked' ? 'active' : 'blocked'

    // Update user status in profiles table
    const { data: updatedUser, error: updateError } = await client
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId)
      .select()
      .single()

    if (updateError) throw updateError

    // Also update user_metadata to ensure login checks work
    try {
      // First, get the current user to preserve existing metadata
      const { data: userData, error: getUserError } = await client.auth.admin.getUserById(userId)
      
      if (getUserError) {
        console.error('Failed to get user for metadata update:', getUserError)
      } else {
        const existingMetadata = userData.user?.user_metadata || {}
        
        const { data: updatedAuth, error: authUpdateError } = await client.auth.admin.updateUserById(userId, {
          user_metadata: {
            ...existingMetadata,
            status: newStatus
          }
        })
        
        if (authUpdateError) {
          console.error('Failed to update user_metadata for block/unblock:', authUpdateError)
        } else {
          console.log('Successfully updated user_metadata for block/unblock:', updatedAuth.user?.user_metadata)
          
          // If blocking, force sign out all sessions for this user
          if (newStatus === 'blocked') {
            try {
              await client.auth.admin.signOut(userId)
              console.log('Successfully signed out blocked user sessions')
            } catch (signOutError) {
              console.error('Failed to sign out user sessions:', signOutError)
            }
          }
        }
      }
    } catch (metadataError) {
      console.error('Exception updating user_metadata for block/unblock:', metadataError)
      // Continue even if this fails, as the profiles table is updated
    }

    return {
      success: true,
      user: updatedUser,
      message: `User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`,
    }
  } catch (error: any) {
    console.error('Error toggling user block status:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to update user status',
    })
  }
})
