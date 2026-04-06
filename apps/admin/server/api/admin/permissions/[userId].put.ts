import { serverSupabaseServiceRole } from '#supabase/server'
import type { Permission } from '@/layers/base/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const userId = getRouterParam(event, 'userId')
  const body = await readBody<{ permissions: Permission[] }>(event)

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  if (!body.permissions || !Array.isArray(body.permissions)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Permissions array is required',
    })
  }

  try {
    // Check if permissions record exists
    const { data: existing } = await client
      .from('user_permissions')
      .select('id')
      .eq('user_id', userId)
      .single()

    let result

    if (existing) {
      // Update existing permissions
      const { data, error } = await client
        .from('user_permissions')
        .update({
          permissions: body.permissions,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      result = data
    } else {
      // Insert new permissions
      const { data, error } = await client
        .from('user_permissions')
        .insert({
          user_id: userId,
          permissions: body.permissions,
        })
        .select()
        .single()

      if (error) throw error
      result = data
    }

    return {
      success: true,
      data: result,
      message: 'Permissions updated successfully',
    }
  } catch (error: any) {
    console.error('Error updating user permissions:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update permissions',
    })
  }
})

