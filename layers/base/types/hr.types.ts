export interface Employee {
  id: string
  employee_id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  phone_number?: string
  avatar_url?: string
  department?: string
  job_title?: string
  manager_id?: string
  hire_date?: string
  base_salary: number
  status: 'active' | 'inactive' | 'on_leave' | 'terminated'
  created_at: string
  updated_at: string
}

export interface AttendanceRecord {
  id: string
  employee_id: string
  date: string
  clock_in?: string
  clock_out?: string
  status: 'present' | 'absent' | 'late' | 'half_day'
  notes?: string
}

export interface LeaveRequest {
  id: string
  employee_id: string
  type: 'annual' | 'sick' | 'unpaid' | 'maternity' | 'paternity' | 'other'
  start_date: string
  end_date: string
  days: number
  reason?: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  manager_note?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

export interface PayrollRun {
  id: string
  period_start: string
  period_end: string
  status: 'draft' | 'processing' | 'completed' | 'cancelled'
  total_gross: number
  total_deductions: number
  total_net: number
  processed_by?: string
  processed_at?: string
  created_at: string
}

export interface Payslip {
  id: string
  employee_id: string
  payroll_run_id: string
  gross_pay: number
  deductions: number
  net_pay: number
  period: string
  generated_at: string
}

export interface PerformanceReview {
  id: string
  employee_id: string
  reviewer_id: string
  cycle_id?: string
  rating: number
  comments?: string
  goals_met?: number
  status: 'draft' | 'submitted' | 'acknowledged'
  review_date: string
  created_at: string
}
