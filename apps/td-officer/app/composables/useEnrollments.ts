export function useEnrollments() {
  const supabase = useSupabaseClient()
  const enrollments = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchEnrollments(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('enrollments').select('*, course:courses(title), employee:employees(name)')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('enrolled_at', { ascending: false })
      if (error) throw error
      enrollments.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function enroll(employeeId: string, courseId: string) {
    const { data, error } = await supabase.from('enrollments').insert({
      employee_id: employeeId,
      course_id: courseId,
      status: 'enrolled',
      enrolled_at: new Date().toISOString(),
    }).select().single()
    if (error) throw error
    return data
  }

  return { enrollments, loading, fetchEnrollments, enroll }
}
