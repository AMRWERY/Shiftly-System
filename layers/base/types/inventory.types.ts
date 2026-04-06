export interface Product {
  id: string
  sku: string
  name: string
  description?: string
  category_id?: string
  unit: string
  cost_price: number
  selling_price: number
  reorder_level: number
  is_active: boolean
  created_at: string
}

export interface StockLevel {
  id: string
  product_id: string
  warehouse_id: string
  quantity: number
  reserved: number
  available: number
  last_counted_at?: string
}

export interface PurchaseOrder {
  id: string
  po_number: string
  supplier_id: string
  status: 'draft' | 'sent' | 'confirmed' | 'received' | 'cancelled'
  order_date: string
  expected_date?: string
  total: number
  lines?: PurchaseOrderLine[]
  created_by: string
  created_at: string
}

export interface PurchaseOrderLine {
  id: string
  purchase_order_id: string
  product_id: string
  quantity: number
  unit_price: number
  received_qty: number
}

export interface Warehouse {
  id: string
  name: string
  code: string
  address?: string
  manager_id?: string
  is_active: boolean
  created_at: string
}

export interface GoodsReceiptNote {
  id: string
  grn_number: string
  purchase_order_id?: string
  warehouse_id: string
  received_by: string
  received_at: string
  status: 'draft' | 'confirmed'
  lines?: GRNLine[]
}

export interface GRNLine {
  id: string
  grn_id: string
  product_id: string
  quantity: number
  unit_price: number
  batch?: string
  expiry_date?: string
}
