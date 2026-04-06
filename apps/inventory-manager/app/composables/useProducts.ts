export function useProducts() {
  const supabase = useSupabaseClient()
  const products = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchProducts(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('products').select('*')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('name')
      if (error) throw error
      products.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { products, loading, fetchProducts }
}
