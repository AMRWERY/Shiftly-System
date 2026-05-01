import type { ROLES } from './constants'

export type Role = typeof ROLES[number]

export type Permission = {
  module: string
  action: 'view' | 'create' | 'update' | 'delete' | 'approve' | 'export'
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { module: '*', action: 'view' },
    { module: '*', action: 'create' },
    { module: '*', action: 'update' },
    { module: '*', action: 'delete' },
    { module: '*', action: 'approve' },
    { module: '*', action: 'export' },
  ],
  hr: [
    { module: 'employees', action: 'view' },
    { module: 'employees', action: 'create' },
    { module: 'employees', action: 'update' },
    { module: 'attendance', action: 'view' },
    { module: 'leave', action: 'view' },
    { module: 'leave', action: 'approve' },
    { module: 'payroll', action: 'view' },
    { module: 'performance', action: 'view' },
    { module: 'recruitment', action: 'view' },
    { module: 'recruitment', action: 'create' },
    { module: 'recruitment', action: 'update' },
  ],
  manager: [
    { module: 'employees', action: 'view' },
    { module: 'attendance', action: 'view' },
    { module: 'leave', action: 'view' },
    { module: 'leave', action: 'approve' },
    { module: 'performance', action: 'view' },
    { module: 'performance', action: 'create' },
  ],
  employee: [
    { module: 'leave', action: 'view' },
    { module: 'leave', action: 'create' },
    { module: 'payslips', action: 'view' },
    { module: 'attendance', action: 'view' },
    { module: 'profile', action: 'view' },
    { module: 'profile', action: 'update' },
  ],
  accountant: [
    { module: 'finance', action: 'view' },
    { module: 'finance', action: 'create' },
    { module: 'finance', action: 'update' },
    { module: 'finance', action: 'export' },
    { module: 'payroll', action: 'view' },
    { module: 'invoices', action: 'view' },
    { module: 'invoices', action: 'create' },
    { module: 'invoices', action: 'update' },
  ],
  inventory_manager: [
    { module: 'inventory', action: 'view' },
    { module: 'inventory', action: 'create' },
    { module: 'inventory', action: 'update' },
    { module: 'inventory', action: 'delete' },
    { module: 'purchase_orders', action: 'view' },
    { module: 'purchase_orders', action: 'create' },
    { module: 'purchase_orders', action: 'approve' },
  ],
  maintenance_technician: [
    { module: 'assets', action: 'view' },
    { module: 'work_orders', action: 'view' },
    { module: 'work_orders', action: 'update' },
    { module: 'pm_schedules', action: 'view' },
  ],
  system_auditor: [
    { module: '*', action: 'view' },
    { module: 'audit_logs', action: 'view' },
    { module: 'reports', action: 'view' },
    { module: 'reports', action: 'export' },
  ],
  td_officer: [
    { module: 'training', action: 'view' },
    { module: 'training', action: 'create' },
    { module: 'training', action: 'update' },
    { module: 'courses', action: 'view' },
    { module: 'courses', action: 'create' },
    { module: 'courses', action: 'update' },
    { module: 'enrollments', action: 'view' },
    { module: 'certifications', action: 'view' },
    { module: 'certifications', action: 'create' },
  ],
}

export const hasPermission = (
  role: Role,
  module: string,
  action: Permission['action'],
): boolean => {
  const perms = ROLE_PERMISSIONS[role] ?? []
  return perms.some(
    (p) => (p.module === '*' || p.module === module) && p.action === action,
  )
}
