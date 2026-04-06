export interface Asset {
  id: string
  asset_code: string
  name: string
  description?: string
  category?: string
  location?: string
  assigned_to?: string
  purchase_date?: string
  purchase_cost?: number
  status: 'active' | 'under_maintenance' | 'retired' | 'disposed'
  last_maintenance?: string
  next_maintenance?: string
  created_at: string
}

export interface WorkOrder {
  id: string
  wo_number: string
  title: string
  description?: string
  asset_id: string
  type: 'corrective' | 'preventive' | 'inspection'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
  assigned_to?: string
  due_date?: string
  completed_at?: string
  cost?: number
  notes?: string
  created_by: string
  created_at: string
}

export interface PMSchedule {
  id: string
  title: string
  asset_id: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'custom'
  custom_days?: number
  last_done?: string
  next_due: string
  assigned_to?: string
  instructions?: string
  is_active: boolean
  created_at: string
}
