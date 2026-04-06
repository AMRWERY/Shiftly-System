export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const authStore = useAuthStore()

  const publicRoutes = [
    '/auth',
    '/signup',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/confirm-invite',
  ]

  const pathWithoutLocale = to.path
    .replace(/^\/[a-z]{2}(\/|$)/, '/')
    .replace(/^\/[a-z]{2}-[a-z]{2}(\/|$)/, '/')

  const isPublicRoute = publicRoutes.some((route) =>
    pathWithoutLocale.toLowerCase().startsWith(route),
  )

  if (!authStore.isAuthenticated || isPublicRoute) {
    return
  }

  const userRole = authStore.currentUserRole

  if (userRole) {
    const { getAppUrlForRole } = await import('../config/roleAppMapping')
    const targetAppUrl = getAppUrlForRole(userRole as never)
    const currentUrl = window.location.origin

    if (currentUrl !== targetAppUrl) {
      window.location.href = targetAppUrl
    }
  }
})
