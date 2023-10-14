export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Events: {
        Row: {
          event_description: string | null
          event_fee: number | null
          event_id: number
          event_name: string
          event_time: string
        }
        Insert: {
          event_description?: string | null
          event_fee?: number | null
          event_id?: number
          event_name: string
          event_time: string
        }
        Update: {
          event_description?: string | null
          event_fee?: number | null
          event_id?: number
          event_name?: string
          event_time?: string
        }
        Relationships: []
      }
      PRODUCTS: {
        Row: {
          category: string | null
          desc: string | null
          id: string
          in_stock: number | null
          name: string
          price: number | null
        }
        Insert: {
          category?: string | null
          desc?: string | null
          id?: string
          in_stock?: number | null
          name: string
          price?: number | null
        }
        Update: {
          category?: string | null
          desc?: string | null
          id?: string
          in_stock?: number | null
          name?: string
          price?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type ProductType = Database['public']['Tables']['PRODUCTS']['Row']