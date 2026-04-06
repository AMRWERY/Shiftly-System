export function useAuditLog() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  async function log(action: string, resource: string, resourceId?: string, metadata?: Record<string, unknown>) {
    if (!user.value) return
    const { error } = await supabase.from('audit_logs').insert({
      user_id: user.value.id,
      action,
      resource,
      resource_id: resourceId,
      metadata,
      created_at: new Date().toISOString(),
    })
    if (error) console.error('[AuditLog]', error)
  }

  return { log }
}
