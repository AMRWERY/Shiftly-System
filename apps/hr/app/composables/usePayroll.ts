export const usePayroll = () => {
  const supabase = useSupabaseClient()
  const payrollRuns = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchPayrollRuns = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase.from('payroll_runs').select('*').order('period_start', { ascending: false })
      if (error) throw error
      payrollRuns.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const getPayslip = async (employeeId: string, runId: string) => {
    const { data, error } = await supabase
      .from('payslips')
      .select('*')
      .eq('employee_id', employeeId)
      .eq('payroll_run_id', runId)
      .single()
    if (error) throw error
    return data
  }

  return { payrollRuns, loading, fetchPayrollRuns, getPayslip }
}
