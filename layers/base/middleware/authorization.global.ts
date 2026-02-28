import type { PermissionModule, PermissionAction } from "../types";
import {
  checkRouteAccess,
  checkRouteAccessWithPermissions,
  PUBLIC_ROUTES,
  removeLocalePrefix,
} from "../utils/routeAccess";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { hasPermission } = useAppPermissions();

  const pathWithoutLocale = removeLocalePrefix(to.path);

  if (
    PUBLIC_ROUTES.some((route) =>
      pathWithoutLocale.toLowerCase().startsWith(route),
    )
  ) {
    return;
  }

  if (!authStore.isAuthenticated) {
    return;
  }

  const userRole = authStore.currentUserRole;
  const permissionsLoaded = authStore.permissionsFetched;

  const hasAccess = permissionsLoaded
    ? checkRouteAccessWithPermissions(to.path, userRole, (module, action) =>
        hasPermission(module as PermissionModule, action as PermissionAction),
      )
    : checkRouteAccess(to.path, userRole);

  if (!hasAccess) {
    console.warn(
      `Unauthorized: User role "${userRole}" tried to access "${to.path}"`,
    );
    return navigateTo("/unauthorized");
  }
});
