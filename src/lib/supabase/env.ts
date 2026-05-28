/**
 * Single source of truth for whether Supabase is wired up.
 *
 * When the env vars below are present the data layer routes through
 * Supabase; otherwise it falls back to the in-memory demo store in
 * src/data/store.ts.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isConfigured = Boolean(url && anon);
  return { url, anon, serviceRole, isConfigured };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv().isConfigured;
}
