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
      cash_flow_notes: {
        Row: {
          created_at: string
          id: number
          transcription: string
        }
        Insert: {
          created_at?: string
          id?: number
          transcription: string
        }
        Update: {
          created_at?: string
          id?: number
          transcription?: string
        }
        Relationships: []
      }
      debtors: {
        Row: {
          amount: number
          created_at: string
          customer_name: string
          due_date: string
          id: number
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          customer_name: string
          due_date: string
          id?: number
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          customer_name?: string
          due_date?: string
          id?: number
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          file_path: string | null
          id: number
          name: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          id?: number
          name?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          file_path?: string | null
          id?: number
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          cost_price: number | null
          created_at: string | null
          id: number
          name: string | null
          quantity: number | null
          selling_price: number | null
        }
        Insert: {
          cost_price?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          quantity?: number | null
          selling_price?: number | null
        }
        Update: {
          cost_price?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          quantity?: number | null
          selling_price?: number | null
        }
        Relationships: []
      }
      microloans: {
        Row: {
          amount_range: string
          contact_info: string | null
          created_at: string | null
          id: number
          name: string
          provider: string
          requirements: string | null
        }
        Insert: {
          amount_range: string
          contact_info?: string | null
          created_at?: string | null
          id?: number
          name: string
          provider: string
          requirements?: string | null
        }
        Update: {
          amount_range?: string
          contact_info?: string | null
          created_at?: string | null
          id?: number
          name?: string
          provider?: string
          requirements?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          business_name: string | null
          created_at: string
          id: string
          owner_name: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          created_at?: string
          id: string
          owner_name?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          created_at?: string
          id?: string
          owner_name?: string | null
          phone?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
