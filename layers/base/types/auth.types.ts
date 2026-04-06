import type { User, Session } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  authListenerInitialized: boolean
  userPermissions: Permission[]
  permissionsFetched: boolean
  profileRole: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpPayload {
  email: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  role: string
  imageFile: File | null
}

export interface AuthResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export { type User, type Session }
