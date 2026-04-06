export function useFileUpload() {
  const supabase = useSupabaseClient()
  const uploading = ref(false)
  const progress = ref(0)

  async function upload(bucket: string, path: string, file: File): Promise<string> {
    uploading.value = true
    progress.value = 0
    try {
      const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      progress.value = 100
      return data.publicUrl
    }
    finally {
      uploading.value = false
    }
  }

  async function remove(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) throw error
  }

  return { uploading, progress, upload, remove }
}
