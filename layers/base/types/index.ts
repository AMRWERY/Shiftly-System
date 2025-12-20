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

export interface Permission {
  id: string;
  name: string;
  description: string;
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
}
