export function usePerformance() {
  const supabase = useSupabaseClient()
  const reviews = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchReviews(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('performance_reviews').select('*, employee:employees(name)')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      reviews.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function submitReview(payload: Record<string, unknown>) {
    const { data, error } = await supabase.from('performance_reviews').insert(payload).select().single()
    if (error) throw error
    return data
  }

  return { reviews, loading, fetchReviews, submitReview }
}
