import type { RealtimeChannel } from '@supabase/supabase-js'

export function useRealtime() {
  const supabase = useSupabaseClient()
  const channels = ref<RealtimeChannel[]>([])

  function subscribe(
    channelName: string,
    table: string,
    callback: (payload: unknown) => void,
  ) {
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe()

    channels.value.push(channel)
    return channel
  }

  function unsubscribeAll() {
    channels.value.forEach((ch) => supabase.removeChannel(ch))
    channels.value = []
  }

  onUnmounted(unsubscribeAll)

  return { subscribe, unsubscribeAll }
}
