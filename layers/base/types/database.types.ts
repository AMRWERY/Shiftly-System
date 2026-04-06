export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          email: string | null
          phone_number: string | null
          employee_id: string | null
          status: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          resource: string
          resource_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string | null
          body: string
          type: string
          read_at: string | null
          link: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
