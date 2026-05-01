export const useAccounts = () => {
  const supabase = useSupabaseClient()
  const accounts = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchAccounts = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase.from('accounts').select('*').order('code')
      if (error) throw error
      accounts.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { accounts, loading, fetchAccounts }
}
