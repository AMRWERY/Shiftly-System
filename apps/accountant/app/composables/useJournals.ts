export const useJournals = () => {
  const supabase = useSupabaseClient()
  const entries = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchEntries = async (filters?: Record<string, unknown>) => {
    loading.value = true
    try {
      let q = supabase.from('journal_entries').select('*, lines:journal_lines(*)')
      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          if (value !== undefined && value !== '') q = q.eq(key, value)
        }
      }
      const { data, error } = await q.order('date', { ascending: false })
      if (error) throw error
      entries.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const postEntry = async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase.from('journal_entries').insert(payload).select().single()
    if (error) throw error
    return data
  }

  return { entries, loading, fetchEntries, postEntry }
}
