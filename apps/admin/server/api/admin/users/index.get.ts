import { serverSupabaseServiceRole } from '#supabase/server'
import type { UserListItem } from '@/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)

  try {
    // Fetch from profiles table instead of user_metadata
    const { data: profiles, error } = await client
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    const userList: UserListItem[] = (profiles || []).map(profile => ({
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
      avatarUrl: profile.avatar_url,
      avatar_url: profile.avatar_url // Keep snake_case for frontend
    }))

    return userList
  } catch (error: any) {
    console.error('Error fetching users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
})

