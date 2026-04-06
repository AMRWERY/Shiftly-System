export function useCertifications() {
  const supabase = useSupabaseClient()
  const certifications = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchCertifications(employeeId?: string) {
    loading.value = true
    try {
      let q = supabase.from('certifications').select('*, employee:employees(name)')
      if (employeeId) q = q.eq('employee_id', employeeId)
      const { data, error } = await q.order('issued_date', { ascending: false })
      if (error) throw error
      certifications.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { certifications, loading, fetchCertifications }
}
