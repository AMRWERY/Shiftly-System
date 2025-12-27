import { checkRouteAccess, PUBLIC_ROUTES, removeLocalePrefix } from "../utils/routeAccess";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Remove locale prefix for checking
  const pathWithoutLocale = removeLocalePrefix(to.path);

  // Skip authorization check for public routes
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathWithoutLocale.toLowerCase().startsWith(route)
  );

  if (isPublicRoute) {
    return;
  }

  // Skip if not authenticated (auth.global.ts handles this)
  if (!authStore.isAuthenticated) {
    return;
  }

  // Get user role from metadata
  const userRole = authStore.currentUserRole;

  // Check if user has access to this route
  const hasAccess = checkRouteAccess(to.path, userRole);

  if (!hasAccess) {
    console.warn(
      `Unauthorized access attempt: User with role "${userRole}" tried to access "${to.path}"`
    );
    return navigateTo("/unauthorized");
  }
});
