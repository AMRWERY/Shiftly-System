import { serverSupabaseServiceRole } from '#supabase/server'
import type { UserListItem } from '../../../../../../layers/base/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)

  try {
    // Fetch from profiles table instead of user_metadata
    const { data: profiles, error } = await client
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Fetch auth users to get metadata (avatars)
    const { data: authData, error: authError } = await client.auth.admin.listUsers({
        page: 1,
        perPage: 1000 // Fetch a large batch to cover most users for now
    })
    
    if (authError) console.error('Error fetching auth users:', authError)

    // Create a map of user ID to avatar URL from metadata
    const avatarMap = new Map<string, string>()
    if (authData?.users) {
        authData.users.forEach(user => {
            const metadata = user.user_metadata || {}
            if (metadata.avatarUrl) {
                avatarMap.set(user.id, metadata.avatarUrl)
            }
        })
    }

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
      // detailed fetching of avatar from metadata map, fallback to profile table
      avatarUrl: avatarMap.get(profile.id) || profile.avatar_url,
      avatar_url: avatarMap.get(profile.id) || profile.avatar_url // Keep snake_case for frontend
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

