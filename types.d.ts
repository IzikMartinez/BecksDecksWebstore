
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
      ENTRANTS: {
        Row: {
          event_id: string
          player_id: string
        }
        Insert: {
          event_id: string
          player_id: string
        }
        Update: {
          event_id?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ENTRANTS_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "EVENTS"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "ENTRANTS_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "USERS"
            referencedColumns: ["user_id"]
          }
        ]
      }
      EVENTS: {
        Row: {
          event_category: string | null
          event_description: string | null
          event_fee: number | null
          event_id: string
          event_name: string
          event_time: string | null
        }
        Insert: {
          event_category?: string | null
          event_description?: string | null
          event_fee?: number | null
          event_id?: string
          event_name: string
          event_time?: string | null
        }
        Update: {
          event_category?: string | null
          event_description?: string | null
          event_fee?: number | null
          event_id?: string
          event_name?: string
          event_time?: string | null
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
      USERS: {
        Row: {
          player_firstname: string | null
          player_id: string | null
          player_lastname: string | null
        }
        Insert: {
          player_firstname?: string | null
          player_id?: string | null
          player_lastname?: string | null
        }
        Update: {
          player_firstname?: string | null
          player_id?: string | null
          player_lastname?: string | null
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
export type EventType = Database['public']['Tables']['EVENTS']['Row']
export type UserType = Database['public']['Tables']['USERS']['Row']
export type EntrantType = Database['public']['Tables']['ENTRANTS']['Row']
