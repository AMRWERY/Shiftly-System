export function useStock() {
  const supabase = useSupabaseClient()
  const stockLevels = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  async function fetchStockLevels(warehouseId?: string) {
    loading.value = true
    try {
      let q = supabase.from('stock_levels').select('*, product:products(name, sku)')
      if (warehouseId) q = q.eq('warehouse_id', warehouseId)
      const { data, error } = await q
      if (error) throw error
      stockLevels.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  async function adjustStock(productId: string, warehouseId: string, quantity: number, reason: string) {
    const { error } = await supabase.from('stock_adjustments').insert({
      product_id: productId,
      warehouse_id: warehouseId,
      quantity,
      reason,
      adjusted_at: new Date().toISOString(),
    })
    if (error) throw error
    await fetchStockLevels(warehouseId)
  }

  return { stockLevels, loading, fetchStockLevels, adjustStock }
}
