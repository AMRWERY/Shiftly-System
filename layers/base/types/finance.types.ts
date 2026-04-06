export interface Account {
  id: string
  code: string
  name: string
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  parent_id?: string
  balance: number
  currency: string
  is_active: boolean
  created_at: string
}

export interface JournalEntry {
  id: string
  reference: string
  description: string
  date: string
  status: 'draft' | 'posted' | 'voided'
  lines?: JournalLine[]
  created_by: string
  created_at: string
}

export interface JournalLine {
  id: string
  journal_entry_id: string
  account_id: string
  debit: number
  credit: number
  description?: string
}

export interface Invoice {
  id: string
  type: 'sales' | 'purchase'
  number: string
  party_id: string
  issue_date: string
  due_date: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  subtotal: number
  tax: number
  total: number
  currency: string
  notes?: string
  created_at: string
}

export interface Budget {
  id: string
  name: string
  fiscal_year: number
  department?: string
  total_amount: number
  spent_amount: number
  status: 'draft' | 'approved' | 'active' | 'closed'
  created_at: string
}
