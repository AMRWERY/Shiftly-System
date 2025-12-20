import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const body = await readBody<{ userId: string }>(event)
  
  if (!body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  try {
    // Set default password for the user
    const defaultPassword = '1234567'
    
    const { data, error } = await client.auth.admin.updateUserById(body.userId, {
      password: defaultPassword,
      user_metadata: {
        status: 'active'
      }
    })

    if (error) {
      console.error('Set default password error:', error)
      throw error
    }

    // Also update the profiles table if it exists
    try {
      await client
        .from('profiles')
        .update({ status: 'active' })
        .eq('id', body.userId)
    } catch (profileError) {
      console.warn('Could not update profiles table:', profileError)
      // Don't throw, as the main operation succeeded
    }

    return { success: true, message: 'Default password set successfully' }
  } catch (error: any) {
    console.error('Set default password error details:', {
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
    })
    
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      statusMessage: error.message || 'Failed to set default password',
    })
  }
})

