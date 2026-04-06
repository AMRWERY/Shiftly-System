export function useNotifications() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const notifications = ref<Record<string, unknown>[]>([])
  const unreadCount = computed(() => notifications.value.filter((n) => !n.read_at).length)
  const loading = ref(false)

  async function fetchNotifications() {
    if (!user.value) return
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })
        .limit(50)
      if (error) throw error
      notifications.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
    await fetchNotifications()
  }

  async function markAllAsRead() {
    if (!user.value) return
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', user.value.id)
      .is('read_at', null)
    if (error) throw error
    await fetchNotifications()
  }

  return { notifications, unreadCount, loading, fetchNotifications, markAsRead, markAllAsRead }
}
