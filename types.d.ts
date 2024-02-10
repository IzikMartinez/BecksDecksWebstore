export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
            foreignKeyName: "ENTRANTS_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "USERS"
            referencedColumns: ["player_id"]
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
      ORDERS: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          items: Json | null
          last_name: string | null
          order_no: number
          order_total: number | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          items?: Json | null
          last_name?: string | null
          order_no?: number
          order_total?: number | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          items?: Json | null
          last_name?: string | null
          order_no?: number
          order_total?: number | null
          phone?: string | null
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
          player_id: string
          player_lastname: string | null
        }
        Insert: {
          player_firstname?: string | null
          player_id: string
          player_lastname?: string | null
        }
        Update: {
          player_firstname?: string | null
          player_id?: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never


export type ProductType = Database['public']['Tables']['PRODUCTS']['Row']
export type EventType = Database['public']['Tables']['EVENTS']['Row']
export type UserType = Database['public']['Tables']['USERS']['Row']
export type EntrantType = Database['public']['Tables']['ENTRANTS']['Row']
export type OrderType= Database['public']['Tables']['ORDERS']['Row']
export type OrderTypeInsert= Database['public']['Tables']['ORDERS']['Insert']
