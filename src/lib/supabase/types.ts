/**
 * Hand-written Database type matching supabase/migrations/0001_initial_schema.sql.
 * Regenerate later with `supabase gen types typescript --linked > src/lib/supabase/types.ts`
 * once you have `supabase link`-ed the project.
 */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "admin" | "company" | "driver";
          name: string;
          email: string;
          phone: string | null;
          license_number: string | null;
          status: "active" | "suspended";
          created_at: string;
        };
        Insert: {
          id: string;
          role: "admin" | "company" | "driver";
          name: string;
          email: string;
          phone?: string | null;
          license_number?: string | null;
          status?: "active" | "suspended";
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      companies: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          logo_color: string | null;
          fleet_size: number | null;
          locations: string[] | null;
          total_relocations: number | null;
          established: number | null;
          contact_email: string | null;
          contact_phone: string | null;
          status: "pending" | "approved" | "suspended";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["companies"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["companies"]["Insert"]>;
        Relationships: [];
      };
      company_members: {
        Row: {
          company_id: string;
          profile_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          company_id: string;
          profile_id: string;
          role?: string;
        };
        Update: Partial<Database["public"]["Tables"]["company_members"]["Insert"]>;
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          company_id: string;
          plate: string;
          make: string;
          model: string;
          year: number;
          type: "sedan" | "suv" | "van" | "wagon" | "compact";
          fuel_type: "petrol" | "diesel" | "hybrid" | "electric";
          transmission: "manual" | "automatic";
          seats: number;
          luggage: number | null;
          features: string[] | null;
          ev_range_km: number | null;
          photos: string[] | null;
          status: "available" | "in-listing" | "maintenance" | "retired";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["vehicles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
        Relationships: [];
      };
      listings: {
        Row: {
          id: string;
          vehicle_id: string;
          company_id: string;
          from_city: string;
          from_address: string | null;
          to_city: string;
          to_address: string | null;
          distance_km: number;
          max_km: number;
          pickup_start: string;
          pickup_end: string;
          dropoff_deadline: string;
          rules: Record<string, unknown>;
          compensation: Record<string, unknown>;
          status: "draft" | "published" | "closed" | "completed" | "expired";
          published_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["listings"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["listings"]["Insert"]>;
        Relationships: [];
      };
      requests: {
        Row: {
          id: string;
          listing_id: string;
          driver_id: string;
          status: "pending" | "approved" | "rejected" | "cancelled";
          message: string | null;
          preferred_pickup_at: string;
          created_at: string;
          decided_at: string | null;
        };
        Insert: {
          id?: string;
          listing_id: string;
          driver_id: string;
          status?: "pending" | "approved" | "rejected" | "cancelled";
          message?: string | null;
          preferred_pickup_at: string;
          decided_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["requests"]["Insert"]>;
        Relationships: [];
      };
      follows: {
        Row: {
          driver_id: string;
          company_id: string;
          created_at: string;
        };
        Insert: {
          driver_id: string;
          company_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["follows"]["Insert"]>;
        Relationships: [];
      };
      favorite_locations: {
        Row: {
          driver_id: string;
          city: string;
          created_at: string;
        };
        Insert: {
          driver_id: string;
          city: string;
        };
        Update: Partial<Database["public"]["Tables"]["favorite_locations"]["Insert"]>;
        Relationships: [];
      };
      notification_prefs: {
        Row: {
          user_id: string;
          pref_key: string;
          email: boolean;
          sms: boolean;
        };
        Insert: {
          user_id: string;
          pref_key: string;
          email?: boolean;
          sms?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["notification_prefs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      is_company_member: { Args: { _company_id: string }; Returns: boolean };
      is_driver: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
