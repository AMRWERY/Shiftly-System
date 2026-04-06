export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return

  const supabase = useSupabaseClient()

  try {
    await supabase.from('audit_logs').insert({
      user_id: authStore.user?.id,
      action: 'page_visit',
      resource: 'route',
      resource_id: to.path,
      metadata: { query: to.query, fullPath: to.fullPath },
      created_at: new Date().toISOString(),
    })
  }
  catch (error) {
    console.error('[AuditMiddleware]', error)
  }
})
