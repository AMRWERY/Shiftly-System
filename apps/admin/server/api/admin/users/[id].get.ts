import { serverSupabaseServiceRole } from '#supabase/server'
import type { UserListItem } from '../../../../../../layers/base/types'

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
    const { data: profile, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    if (!profile) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    // Get auth user metadata for latest avatar
    const { data: authUser } = await client.auth.admin.getUserById(userId)
    const metadata = authUser?.user?.user_metadata || {}

    const user: UserListItem = {
      id: profile.id,
      email: profile.email || '',
      firstName: profile.first_name || '',
      middleName: profile.middle_name || '',
      lastName: profile.last_name || '',
      fullName: profile.full_name || '',
      phoneNumber: profile.phone_number || '',
      employeeId: profile.employee_id || '',
      baseSalary: profile.base_salary || 0,
      createdAt: profile.created_at || '',
      role: profile.role || 'employee',
      status: profile.status || 'pending',
      // Prefer metadata avatarUrl over profile table as it's the source of truth from authStore
      avatarUrl: metadata.avatarUrl || profile.avatar_url,
    }

    return user
  } catch (error: any) {
    console.error('Error fetching user:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message || 'Failed to fetch user',
    })
  }
})
