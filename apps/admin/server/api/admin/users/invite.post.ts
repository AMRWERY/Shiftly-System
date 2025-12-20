import { serverSupabaseServiceRole } from '#supabase/server'
import type { InviteUserData } from '@/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole(event)
  const body = await readBody<InviteUserData>(event)
  
  if (!body.email || !body.firstName || !body.lastName || !body.role) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  // Generate a random temporary password or just create user without password (magic link/invite)
  // supabase.auth.admin.inviteUserByEmail is cleaner for invitations but createUser gives more control
  // Let's use createUser with autoConfirm: true and then send password reset or rely on invitation logic
  // Update: The requirement is "triggering an automated invitation email for account activation and password setup"
  // inviteUserByEmail is perfect for this as it sends an invite email.
  
  // However, we want to set custom metadata. 
  // inviteUserByEmail accepts data.
  
  try {
    const employeeId = 'EMP-' + Date.now().toString().slice(-6); // Simple ID generation
    const createdAt = new Date().toISOString();
    
    // Get the base URL for redirect (use environment variable or construct from request)
    const baseUrl = process.env.SUPABASE_REDIRECT_URL || 
                    (process.env.NODE_ENV === 'production' 
                      ? 'https://your-domain.com' 
                      : 'http://localhost:3000')
    
    const { data, error } = await client.auth.admin.inviteUserByEmail(body.email, {
      data: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        fullName: `${body.firstName} ${body.middleName} ${body.lastName}`,
        role: body.role,
        phoneNumber: body.phoneNumber || '',
        employeeId: employeeId,
        base_salary: body.baseSalary || 0,
        createdAt: createdAt,
        status: 'pending',
        avatarUrl: '/img/dummy-profile-img.jpg' // Default profile image
      },
      redirectTo: `${baseUrl}/auth/confirm-invite`
    })

    if (error) {
      console.error('Supabase invite error:', error)
      throw error
    }

    return { success: true, user: data.user }
  } catch (error: any) {
    console.error('Invite user error details:', {
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      cause: error.cause,
      stack: error.stack
    })
    
    // Provide more detailed error message
    const errorMessage = error.message || error.statusMessage || 'Failed to invite user'
    
    throw createError({
      statusCode: error.statusCode || error.status || 500,
      statusMessage: errorMessage,
    })
  }
})

