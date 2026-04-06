export function useEmployees() {
  const supabase = useSupabaseClient()
  const employees = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchEmployees(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('employees').select('*')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      employees.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function getEmployee(id: string) {
    const { data, error } = await supabase.from('employees').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  return { employees, loading, fetchEmployees, getEmployee }
}
