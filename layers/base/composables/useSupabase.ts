export function useSupabase() {
  const client = useSupabaseClient()

  async function query<T>(
    table: string,
    options?: {
      select?: string
      filters?: Record<string, unknown>
      order?: { column: string; ascending?: boolean }
      limit?: number
    },
  ) {
    let q = client.from(table).select(options?.select ?? '*')

    if (options?.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        q = q.eq(key, value)
      }
    }
    if (options?.order) {
      q = q.order(options.order.column, { ascending: options.order.ascending ?? true })
    }
    if (options?.limit) {
      q = q.limit(options.limit)
    }

    const { data, error } = await q
    if (error) throw error
    return data as T[]
  }

  return { client, query }
}
