export function usePMSchedules() {
  const supabase = useSupabaseClient()
  const schedules = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchSchedules(assetId?: string) {
    loading.value = true
    try {
      let q = supabase.from('pm_schedules').select('*, asset:assets(name)')
      if (assetId) q = q.eq('asset_id', assetId)
      const { data, error } = await q.order('next_due')
      if (error) throw error
      schedules.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  return { schedules, loading, fetchSchedules }
}
