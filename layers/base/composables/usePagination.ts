export const usePagination = (options?: { defaultPerPage?: number }) => {
  const perPage = ref(options?.defaultPerPage ?? 20)
  const currentPage = ref(1)
  const total = ref(0)

  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage.value)))

  const offset = computed(() => (currentPage.value - 1) * perPage.value)

  const goTo = (page: number) => {
    currentPage.value = Math.min(Math.max(1, page), totalPages.value)
  }

  const reset = () => {
    currentPage.value = 1
  }

  watch(perPage, reset)

  return { currentPage, perPage, total, totalPages, offset, goTo, reset }
}
