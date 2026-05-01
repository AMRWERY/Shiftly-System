import type { RealtimeChannel } from '@supabase/supabase-js'

export const useRealtime = () => {
  const supabase = useSupabaseClient()
  const channels = ref<RealtimeChannel[]>([])

  const subscribe = (
    channelName: string,
    table: string,
    callback: (payload: unknown) => void,
  ) => {
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe()

    channels.value.push(channel)
    return channel
  }

  const unsubscribeAll = () => {
    channels.value.forEach((ch) => supabase.removeChannel(ch))
    channels.value = []
  }

  onUnmounted(unsubscribeAll)

  return { subscribe, unsubscribeAll }
}
