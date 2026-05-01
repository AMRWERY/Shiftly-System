export const useLeave = () => {
  const supabase = useSupabaseClient()
  const requests = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchLeaveRequests = async (filters?: Record<string, unknown>) => {
    loading.value = true
    try {
      let q = supabase.from('leave_requests').select('*, employee:employees(name)')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      requests.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const submitRequest = async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase.from('leave_requests').insert(payload).select().single()
    if (error) throw error
    return data
  }

  const updateStatus = async (id: string, status: 'approved' | 'rejected', note?: string) => {
    const { error } = await supabase.from('leave_requests').update({ status, manager_note: note }).eq('id', id)
    if (error) throw error
  }

  return { requests, loading, fetchLeaveRequests, submitRequest, updateStatus }
}
