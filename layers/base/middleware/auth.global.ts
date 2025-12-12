export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const supabase = useSupabaseClient();

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/auth",
    "/signup",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/auth",
  ];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    to.path.toLowerCase().startsWith(route)
  );

  // Initialize auth if not already done
  if (authStore.loading && !authStore.user) {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        authStore.session = session;
        authStore.user = session.user;
      }
      authStore.loading = false;
    } catch (error) {
      console.error("Auth middleware error:", error);
      authStore.loading = false;
    }
  }

  // If user is not authenticated and trying to access a protected route
  if (!authStore.isAuthenticated && !isPublicRoute) {
    return navigateTo("/auth");
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (authStore.isAuthenticated && isPublicRoute) {
    return navigateTo("/");
  }
});
