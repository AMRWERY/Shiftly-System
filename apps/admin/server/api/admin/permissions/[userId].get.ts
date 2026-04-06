import { serverSupabaseServiceRole } from '#supabase/server'
import type { UserPermissions } from '@/layers/base/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const userId = getRouterParam(event, 'userId')

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  try {
    const { data, error } = await client
      .from('user_permissions')
      .select('*')
      .eq('user_id', userId)
      .single()

    // If no permissions exist yet, return empty array
    if (error && error.code === 'PGRST116') {
      return {
        user_id: userId,
        permissions: [],
      }
    }

    if (error) throw error

    return data
  } catch (error: any) {
    console.error('Error fetching user permissions:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch permissions',
    })
  }
})

