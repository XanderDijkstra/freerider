import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Vercel cron pings this endpoint daily so the Supabase project stays
 * "active" and never pauses on the free tier (inactivity timer resets
 * on any successful query).
 *
 * Schedule lives in vercel.json. Protected with CRON_SECRET header to
 * prevent unauthenticated traffic from running it.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  // Vercel Cron sends an Authorization header automatically. We also
  // accept a manual ?secret=... for ad-hoc pings.
  const url = new URL(request.url);
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("secret") ??
    "";
  const expected = process.env.CRON_SECRET;

  if (expected && provided !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      mode: "noop",
      reason: "Supabase env not configured; keep-alive skipped.",
    });
  }

  const client = supabaseAdmin();
  if (!client) {
    return NextResponse.json({
      ok: true,
      mode: "noop",
      reason: "Service role key missing; keep-alive skipped.",
    });
  }

  // Trivial read that touches the database without mutating anything.
  const { error, count } = await client
    .from("companies")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: "supabase",
    companies: count ?? 0,
    at: new Date().toISOString(),
  });
}
