interface UserProfile {
  id: string
  full_name: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  email: string | null
  phone_number: string | null
  employee_id: string | null
  department: string | null
  job_title: string | null
  status: string | null
  role: string | null
}

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    loading: false,
  }),

  actions: {
    async fetchProfile(userId: string) {
      const supabase = useSupabaseClient()
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        if (error) throw error
        this.profile = data as UserProfile
      }
      catch (error) {
        console.error('Failed to fetch profile:', error)
      }
      finally {
        this.loading = false
      }
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>) {
      const supabase = useSupabaseClient()
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', userId)
          .select()
          .single()
        if (error) throw error
        this.profile = data as UserProfile
        return { success: true }
      }
      catch (error: unknown) {
        console.error('Failed to update profile:', error)
        return { success: false, error }
      }
      finally {
        this.loading = false
      }
    },
  },

  getters: {
    fullName: (state) => state.profile?.full_name ?? '',
    avatarUrl: (state) => state.profile?.avatar_url ?? null,
    isActive: (state) => state.profile?.status === 'active',
  },
})
