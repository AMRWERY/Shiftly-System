export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const loading = ref(false)

  const signIn = async (email: string, password: string) => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    }
    finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    }
    finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string) => {
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
