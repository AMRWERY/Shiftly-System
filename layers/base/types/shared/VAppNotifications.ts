export interface Notification {
    id: string
    user_id: string
    title: string | null
    body: string
    type: 'info' | 'success' | 'warning' | 'error'
    read_at: string | null
    link: string | null
    created_at: string
}
