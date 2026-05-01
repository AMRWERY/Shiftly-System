export const useBudgets = () => {
  const supabase = useSupabaseClient()
  const budgets = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchBudgets = async (fiscalYear?: number) => {
    loading.value = true
    try {
      let q = supabase.from('budgets').select('*')
      if (fiscalYear) q = q.eq('fiscal_year', fiscalYear)
      const { data, error } = await q.order('created_at', { ascending: false })
      if (error) throw error
      budgets.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { budgets, loading, fetchBudgets }
}
