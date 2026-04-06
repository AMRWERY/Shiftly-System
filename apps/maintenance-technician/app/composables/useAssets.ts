export function useAssets() {
  const supabase = useSupabaseClient()
  const assets = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchAssets(filters?: Record<string, unknown>) {
    loading.value = true
    try {
      let q = supabase.from('assets').select('*')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('name')
      if (error) throw error
      assets.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function getAsset(id: string) {
    const { data, error } = await supabase.from('assets').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  return { assets, loading, fetchAssets, getAsset }
}
