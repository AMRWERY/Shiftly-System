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

    // Update user status
    const { data: updatedUser, error: updateError } = await client
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId)
      .select()
      .single()

    if (updateError) throw updateError

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
