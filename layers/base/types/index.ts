export type UserRole =
  | "admin"
  | "hr"
  | "employee"
  | "manager"
  | "accountant"
  | "inventory_manager"
  | "maintenance_technician"
  | "system_auditor"
  | "td_officer";

// Permission modules
export type PermissionModule =
  | "users"
  | "roles"
  | "employees"
  | "payroll"
  | "attendance"
  | "leave"
  | "recruitment"
  | "performance"
  | "training"
  | "inventory"
  | "maintenance"
  | "finance"
  | "reports"
  | "audit"
  | "settings";

// Permission actions
export type PermissionAction = "view" | "create" | "edit" | "delete" | "approve";

// Single permission structure
export interface Permission {
  module: PermissionModule;
  actions: PermissionAction[];
}

// User permissions (stored in database)
export interface UserPermissions {
  id: string;
  user_id: string;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

// Permission check helper
export interface PermissionCheck {
  module: PermissionModule;
  action: PermissionAction;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  role: UserRole;
  permission: string;
}

export interface InviteUserData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole | '';
  baseSalary?: number;
}

export interface UserListItem {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  employeeId: string;
  baseSalary: number;
  createdAt: string;
  role: UserRole;
  status: "active" | "pending" | "blocked";
  avatarUrl?: string;
  avatar_url?: string; // snake_case for compatibility with API
  permissions?: Permission[]; // User's custom permissions
}
