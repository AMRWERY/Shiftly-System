/**
 * Define which roles can access which routes
 * '*' = wildcard access to all routes
 */
export const ROLE_ROUTES: Record<string, readonly string[]> = {
  admin: ["*"], // Admin has access to all routes
  hr: ["/employees", "/recruitment", "/payroll", "/attendance", "/profile"],
  employee: ["/personal-info", "/my-shifts", "/time-tracking", "/profile"],
  manager: ["/team", "/schedules", "/reports", "/approvals", "/profile"],
  accountant: ["/finance", "/invoices", "/expenses", "/reports", "/profile"],
  "inventory-manager": ["/inventory", "/stock", "/orders", "/profile"],
  "maintenance-technician": [
    "/maintenance",
    "/work-orders",
    "/equipment",
    "/profile",
  ],
  "system-auditor": ["/audit-logs", "/compliance", "/reports", "/profile"],
  "td-officer": ["/training", "/development", "/courses", "/profile"],
};

/**
 * Routes that are accessible to all authenticated users
 */
export const COMMON_ROUTES = [
  "/",
  "/profile",
  "/settings",
  "/notifications",
  "/holiday-dates",
];

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  "/auth",
  "/signup",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/confirm-invite",
  "/unauthorized",
];

/**
 * Remove locale prefix from path
 * e.g., /ar/profile -> /profile
 */
export function removeLocalePrefix(path: string): string {
  return path
    .replace(/^\/[a-z]{2}(\/|$)/, "/")
    .replace(/^\/[a-z]{2}-[a-z]{2}(\/|$)/, "/");
}

/**
 * Check if a user role has access to a specific route
 */
export function checkRouteAccess(
  path: string,
  userRole: string | undefined,
  roleRoutes = ROLE_ROUTES,
): boolean {
  // Remove locale prefix
  const pathWithoutLocale = removeLocalePrefix(path);

  // Public routes are accessible to everyone
  if (
    PUBLIC_ROUTES.some((route) =>
      pathWithoutLocale.toLowerCase().startsWith(route),
    )
  ) {
    return true;
  }

  // If no user role, deny access
  if (!userRole) {
    return false;
  }

  // Common routes are accessible to all authenticated users
  if (COMMON_ROUTES.some((route) => pathWithoutLocale.startsWith(route))) {
    return true;
  }

  // Get allowed routes for this role
  const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || [];

  // Check for wildcard access (admin)
  if (allowedRoutes.includes("*")) {
    return true;
  }

  // Check if path matches any allowed route
  return allowedRoutes.some((route) => pathWithoutLocale.startsWith(route));
}

/**
 * Optional: routes that require a specific permission (module + action).
 * If a route is listed here, access is granted only if the user has this permission
 * (in addition to or instead of role-based access, depending on middleware).
 */
export const ROUTE_REQUIRED_PERMISSION: Record<
  string,
  { module: string; action: string }
> = {
  "/roles": { module: "roles", action: "view" },
  "/users": { module: "users", action: "view" },
  "/employees": { module: "employees", action: "view" },
  "/audit-log": { module: "audit", action: "view" },
  "/reports": { module: "reports", action: "view" },
  "/settings": { module: "settings", action: "view" },
};

/**
 * Get required permission for a path (first matching route prefix)
 */
export function getRequiredPermissionForPath(path: string): {
  module: string;
  action: string;
} | null {
  const pathWithoutLocale = removeLocalePrefix(path);
  const entry = Object.entries(ROUTE_REQUIRED_PERMISSION).find(([route]) =>
    pathWithoutLocale.startsWith(route),
  );
  return entry ? entry[1] : null;
}

/**
 * Check if a user has access: either by role (legacy) or by permission when route has required permission
 */
export function checkRouteAccessWithPermissions(
  path: string,
  userRole: string | undefined,
  hasPermission: (module: string, action: string) => boolean,
): boolean {
  const pathWithoutLocale = removeLocalePrefix(path);
  if (
    PUBLIC_ROUTES.some((route) =>
      pathWithoutLocale.toLowerCase().startsWith(route),
    )
  ) {
    return true;
  }
  if (!userRole) return false;
  if (COMMON_ROUTES.some((route) => pathWithoutLocale.startsWith(route))) {
    return true;
  }

  const required = getRequiredPermissionForPath(path);
  if (required) {
    return hasPermission(required.module, required.action);
  }

  return checkRouteAccess(path, userRole);
}

/**
 * Get the list of allowed routes for a specific role
 */
export function getAllowedRoutesForRole(
  userRole: string | undefined,
): string[] {
  if (!userRole) return [];

  const roleSpecificRoutes =
    ROLE_ROUTES[userRole as keyof typeof ROLE_ROUTES] || [];

  // If admin (wildcard), return all routes
  if (roleSpecificRoutes.includes("*")) {
    return ["*"];
  }

  // Combine common routes with role-specific routes
  return [...COMMON_ROUTES, ...roleSpecificRoutes];
}
