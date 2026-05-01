export const useCourses = () => {
  const supabase = useSupabaseClient()
  const courses = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchCourses = async (filters?: Record<string, unknown>) => {
    loading.value = true
    try {
      let q = supabase.from('courses').select('*')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('title')
      if (error) throw error
      courses.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { courses, loading, fetchCourses }
}
