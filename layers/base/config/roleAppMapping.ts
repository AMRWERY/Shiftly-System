import type { UserRole } from "../types";

/**
 * Role-to-App URL mapping
 * Maps user roles to their dedicated application URLs
 */
export const ROLE_APP_URLS: Record<UserRole, string> = {
  admin: process.env.ADMIN_APP_URL || "http://localhost:3000",
  hr: process.env.HR_APP_URL || "http://localhost:3001",
  employee: process.env.EMPLOYEE_APP_URL || "http://localhost:3002",
  manager: process.env.MANAGER_APP_URL || "http://localhost:3003", // Not yet created
  accountant: process.env.ACCOUNTANT_APP_URL || "http://localhost:3004",
  inventory_manager:
    process.env.INVENTORY_MANAGER_APP_URL || "http://localhost:3006",
  td_officer: process.env.TD_OFFICER_APP_URL || "http://localhost:3007",
  system_auditor: process.env.SYSTEM_AUDITOR_APP_URL || "http://localhost:3008",
  maintenance_technician:
    process.env.MAINTENANCE_TECHNICIAN_APP_URL || "http://localhost:3009",
};

/**
 * Get the app URL for a given user role
 * @param role - User role
 * @returns App URL for the role
 */
export const getAppUrlForRole = (role: UserRole): string => {
  return ROLE_APP_URLS[role] || ROLE_APP_URLS.admin;
};

/**
 * Check if the current app is the correct one for the user's role
 * @param role - User role
 * @param currentUrl - Current window location
 * @returns true if user is in the correct app
 */
export const isCorrectAppForRole = (
  role: UserRole,
  currentUrl: string
): boolean => {
  const expectedUrl = getAppUrlForRole(role);
  return currentUrl.startsWith(expectedUrl);
};
