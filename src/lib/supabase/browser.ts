"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";
import type { Database } from "./types";

/**
 * Browser Supabase client for Client Components. Returns null when env
 * vars aren't configured.
 */
export function supabaseBrowser() {
  const { url, anon, isConfigured } = getSupabaseEnv();
  if (!isConfigured) return null;
  return createBrowserClient<Database>(url!, anon!);
}
