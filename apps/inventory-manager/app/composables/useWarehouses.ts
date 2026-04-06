export function useWarehouses() {
  const supabase = useSupabaseClient()
  const warehouses = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchWarehouses() {
    loading.value = true
    try {
      const { data, error } = await supabase.from('warehouses').select('*').order('name')
      if (error) throw error
      warehouses.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { warehouses, loading, fetchWarehouses }
}
