export function useWorkOrders() {
  const supabase = useSupabaseClient()
  const workOrders = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchWorkOrders(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('work_orders').select('*, asset:assets(name)')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      workOrders.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function saveWorkOrder(payload: Record<string, unknown>, id?: string) {
    if (id) {
      const { data, error } = await supabase.from('work_orders').update(payload).eq('id', id).select().single()
      if (error) throw error
      return data
    }
    const { data, error } = await supabase.from('work_orders').insert(payload).select().single()
    if (error) throw error
    return data
  }

  return { workOrders, loading, fetchWorkOrders, saveWorkOrder }
}
