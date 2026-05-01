export const useAttendance = () => {
  const supabase = useSupabaseClient()
  const records = ref<Record<string, unknown>[]>([])
  const loading = ref(false)

  const fetchAttendance = async (employeeId?: string, month?: string) => {
    loading.value = true
    try {
      let q = supabase.from('attendance').select('*')
      if (employeeId) q = q.eq('employee_id', employeeId)
      if (month) q = q.gte('date', `${month}-01`).lte('date', `${month}-31`)
      const { data, error } = await q.order('date', { ascending: false })
      if (error) throw error
      records.value = data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const clockIn = async (employeeId: string) => {
    const { error } = await supabase.from('attendance').insert({
      employee_id: employeeId,
      clock_in: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
    })
    if (error) throw error
  }

  const clockOut = async (recordId: string) => {
    const { error } = await supabase.from('attendance').update({
      clock_out: new Date().toISOString(),
    }).eq('id', recordId)
    if (error) throw error
  }

  return { records, loading, fetchAttendance, clockIn, clockOut }
}
