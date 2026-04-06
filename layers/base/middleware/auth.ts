export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const supabase = useSupabaseClient()

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

  if (authStore.loading && !authStore.user) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('status')
          .eq('id', session.user.id)
          .single()

        const isBlockedOrDeactivated
          = !profileError
          && profile
          && (profile.status === 'deactivated' || profile.status === 'blocked')

        if (isBlockedOrDeactivated) {
          await supabase.auth.signOut()
          authStore.session = null
          authStore.user = null
        }
        else {
          authStore.session = session
          authStore.user = session.user
        }
      }
      authStore.loading = false
    }
    catch (error) {
      console.error('Auth middleware error:', error)
      authStore.loading = false
    }
  }

  if (!authStore.isAuthenticated && !isPublicRoute) {
    return navigateTo('/auth')
  }

  if (authStore.isAuthenticated && isPublicRoute && !to.query.from) {
    return navigateTo('/')
  }
})
