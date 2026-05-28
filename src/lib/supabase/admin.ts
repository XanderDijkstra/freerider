import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";
import type { Database } from "./types";

/**
 * Service-role Supabase client. NEVER expose to the browser - only
 * use inside server actions / route handlers that need to bypass RLS
 * (admin promotions, cron jobs, scheduled invalidations).
 */
export function supabaseAdmin() {
  const { url, serviceRole, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !serviceRole) return null;
  return createClient<Database>(url!, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
