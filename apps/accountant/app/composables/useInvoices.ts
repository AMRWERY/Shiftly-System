export const useInvoices = () => {
  const supabase = useSupabaseClient()
  const invoices = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchInvoices = async (type?: 'sales' | 'purchase', status?: string) => {
    loading.value = true
    try {
      let q = supabase.from('invoices').select('*')
      if (type) q = q.eq('type', type)
      if (status) q = q.eq('status', status)
      const { data, error } = await q.order('issue_date', { ascending: false })
      if (error) throw error
      invoices.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const saveInvoice = async (payload: Record<string, unknown>, id?: string) => {
    if (id) {
      const { data, error } = await supabase.from('invoices').update(payload).eq('id', id).select().single()
      if (error) throw error
      return data
    }
    const { data, error } = await supabase.from('invoices').insert(payload).select().single()
    if (error) throw error
    return data
  }

  return { invoices, loading, fetchInvoices, saveInvoice }
}
