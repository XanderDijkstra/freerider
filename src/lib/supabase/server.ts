import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";
import type { Database } from "./types";

/**
 * Server-side Supabase client wired into Next's cookie jar. Use from
 * Server Components and Route Handlers / Server Actions. Returns null
 * when env vars aren't set so callers can fall back to the demo store.
 */
export async function supabaseServer() {
  const { url, anon, isConfigured } = getSupabaseEnv();
  if (!isConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(url!, anon!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component where cookies can't be mutated.
          // Middleware refreshes the auth cookie elsewhere.
        }
      },
    },
  });
}
