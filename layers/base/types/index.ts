export type UserRole = 'admin' | 'hr' | 'employee' | 'manager' | 'accountant'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  firstName?: string
  lastName?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Permission {
  id: string
  name: string
  description: string
}

export interface RolePermission {
  role: UserRole
  permission: string
}
