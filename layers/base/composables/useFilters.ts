export function useFilters<T extends Record<string, unknown>>(defaults: T) {
  const filters = reactive<T>({ ...defaults })

  const activeCount = computed(
    () => Object.entries(filters).filter(([k, v]) => v !== undefined && v !== '' && v !== (defaults as Record<string, unknown>)[k]).length,
  )

  function reset() {
    Object.assign(filters, defaults)
  }

  function set(key: keyof T, value: T[keyof T]) {
    (filters as Record<keyof T, unknown>)[key] = value
  }

  return { filters, activeCount, reset, set }
}
