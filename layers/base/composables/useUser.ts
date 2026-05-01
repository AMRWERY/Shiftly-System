export const useUser = () => {
  const supabase = useSupabaseClient()
  const authUser = useSupabaseUser()

  const profile = ref<Record<string, unknown> | null>(null)
  const loading = ref(false)

  const fetchProfile = async () => {
    if (!authUser.value) return
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.value.id)
        .single()
      if (error) throw error
      profile.value = data
    }
    finally {
      loading.value = false
    }
  }

  return { authUser, profile, loading, fetchProfile }
}
