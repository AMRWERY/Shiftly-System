export const useSearch = () => {
  const query = ref('')
  const isOpen = ref(false)
  const results = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const debouncedSearch = useDebounceFn(async (q: string) => {
    if (!q.trim()) {
      results.value = []
      return
    }
    loading.value = true
    try {
      const data = await $fetch<Record<string, unknown>[]>('/api/search', {
        params: { q },
      })
      results.value = data ?? []
    }
    catch {
      results.value = []
    }
    finally {
      loading.value = false
    }
  }, 300)

  watch(query, debouncedSearch)

  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false; query.value = '' }

  return { query, isOpen, results, loading, open, close }
}
