export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const loading = ref(false)

  async function signIn(email: string, password: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    }
    finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }
    finally {
      loading.value = false
    }
  }

  async function resetPassword(email: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    }
    finally {
      loading.value = false
    }
  }

  return { user, loading, signIn, signOut, resetPassword }
}
