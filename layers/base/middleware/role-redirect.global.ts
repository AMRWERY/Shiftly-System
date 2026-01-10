/**
 * Role-based app redirection middleware
 * Ensures users are in the correct app for their role
 */
export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on client side
  if (process.server) return;

  const authStore = useAuthStore();

  // Skip if not authenticated or on public routes
  const publicRoutes = [
    "/auth",
    "/signup",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/confirm-invite",
  ];
  const pathWithoutLocale = to.path
    .replace(/^\/[a-z]{2}(\/|$)/, "/")
    .replace(/^\/[a-z]{2}-[a-z]{2}(\/|$)/, "/");
  const isPublicRoute = publicRoutes.some((route) =>
    pathWithoutLocale.toLowerCase().startsWith(route)
  );

  if (!authStore.isAuthenticated || isPublicRoute) {
    return;
  }

  const userRole = authStore.currentUserRole;

  if (userRole) {
    const { getAppUrlForRole } = await import("../config/roleAppMapping");
    const targetAppUrl = getAppUrlForRole(userRole as any);
    const currentUrl = window.location.origin;

    // If user is in the wrong app, redirect to their role-specific app
    if (currentUrl !== targetAppUrl) {
      window.location.href = targetAppUrl;
      return;
    }
  }
});
