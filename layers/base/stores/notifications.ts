import type { Notification } from '@/layers/base/types/shared/VAppNotifications'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    items: [] as Notification[],
    loading: false,
  }),

  actions: {
    async fetch(userId: string) {
      const supabase = useSupabaseClient()
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(50)
        if (error) throw error
        this.items = (data ?? []) as Notification[]
      }
      finally {
        this.loading = false
      }
    },

    async markRead(id: string) {
      const supabase = useSupabaseClient()
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
      const item = this.items.find((n) => n.id === id)
      if (item) item.read_at = new Date().toISOString()
    },

    async markAllRead(userId: string) {
      const supabase = useSupabaseClient()
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', userId)
        .is('read_at', null)
      if (error) throw error
      this.items.forEach((n) => { if (!n.read_at) n.read_at = new Date().toISOString() })
    },
  },

  getters: {
    unreadCount: (state) => state.items.filter((n) => !n.read_at).length,
    hasUnread: (state) => state.items.some((n) => !n.read_at),
  },
})
