import type { UserRole } from './index'

export interface UserAuth {
  firstName: string
  middleName: string
  lastName: string
  email: string
  password: string
  role: UserRole | null
  imageFile: File | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ResetPasswordData {
  email: string
  otp?: string
  newPassword?: string
}

export interface SignupMetadata {
  firstName: string
  middleName: string
  lastName: string
  role: UserRole
  avatarUrl?: string
}
