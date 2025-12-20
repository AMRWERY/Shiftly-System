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
    // Delete the user
    const { error } = await client.auth.admin.deleteUser(userId)

    if (error) {
      console.error('Delete user error:', error)
      throw error
    }

    return { success: true, message: 'User deleted successfully' }
  } catch (error: any) {
    console.error('Delete user error details:', {
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
    })
    
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      statusMessage: error.message || 'Failed to delete user',
    })
  }
})

