export function usePurchaseOrders() {
  const supabase = useSupabaseClient()
  const orders = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchOrders(status?: string) {
    loading.value = true
    try {
      let q = supabase.from('purchase_orders').select('*, lines:purchase_order_lines(*)')
      if (status) q = q.eq('status', status)
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      orders.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function saveOrder(payload: Record<string, unknown>, id?: string) {
    if (id) {
      const { data, error } = await supabase.from('purchase_orders').update(payload).eq('id', id).select().single()
      if (error) throw error
      return data
    }
    const { data, error } = await supabase.from('purchase_orders').insert(payload).select().single()
    if (error) throw error
    return data
  }

  return { orders, loading, fetchOrders, saveOrder }
}
