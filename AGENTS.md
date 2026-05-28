<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Branching policy - push to `main`

Owner directive: **all changes go to `main`**. Vercel's production branch is
`main`, so anything else won't deploy. Do not push to feature branches unless
the user explicitly asks for a PR-style review flow on a specific change.

# FreeRider.no - codebase orientation

Norwegian marketplace where rental companies (Hertz, Avis, Sixt, Budget …) post
relocation listings and private drivers claim them. Three roles: driver,
company, admin.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn-style components
- Mock data layer in `src/data/*` (swap with Supabase later)
- Inter (UI) + Fraunces (headings)
- Norwegian-only UI (`nb-NO`); copy in `src/lib/messages.ts`

## Layout

```
src/
  app/
    layout.tsx               # root: fonts, ScrollToTop, metadata
    (public)/                # marketing + marketplace, wraps SiteHeader/SiteFooter
      page.tsx               # home /
      biler/                 # /biler browse, /biler/[id] detail
      utleier/[slug]/        # company profile
      utleiere/              # company directory
      hvordan-fungerer-det/  # how-it-works pillar
      for-utleiere/          # B2B sales pillar
      miljo/                 # CO2 methodology pillar
      blogg/                 # blog index + [slug]
      ordliste/              # glossary index + [slug]
      kontakt/, personvern/, vilkar/, logg-inn/, registrer/
    dashboard/               # driver-only, own DashboardShell
    utleier-admin/           # company-only
    admin/                   # platform-only
    sitemap.ts, robots.ts, not-found.tsx
  components/                # shared UI (Card, Button, ListingCard, …)
  data/                      # mock data: companies, vehicles, listings, blog, glossary
  lib/                       # cn, format, co2, seo, messages
```

## Routing rules

- Static and SEO routes register before catch-alls.
- `(public)` route group wraps marketing + marketplace; dashboards have their
  own layouts and aren't wrapped by SiteHeader.
- `ScrollToTop` is mounted exactly once in `app/layout.tsx`.

## Conventions

- Server Components by default; mark `"use client"` only when needed.
- Mobile-first, single-column default. Cards `p-5 md:p-6`, sections `py-12 md:py-16`.
- Run `npm run typecheck` before committing.
- `npm run build` to verify static generation works (57 routes prerender today).

## Supabase wiring

Schema, RLS, seed and client wrappers are all in the repo. The app runs in
"demo mode" using `src/data/store.ts` (in-memory) until env vars are set;
once present, the data layer routes through Supabase.

### One-time setup for a new Supabase project

1. Create a project at supabase.com (any region; `eu-north-1` for Norway).
2. SQL Editor -> paste and run, in order:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_rls_policies.sql`
   - `supabase/seed.sql`
   (Or via CLI: `supabase link --project-ref <ref> && supabase db push`.)
3. Project Settings -> API: copy `URL`, `anon` key, `service_role` key.
4. Vercel project -> Settings -> Environment Variables. Add for
   Production + Preview:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET` (output of `openssl rand -base64 32`)
5. Redeploy. The next push to main hits Supabase.

### Keep-alive (free tier)

Supabase pauses free-tier projects after 7 days of zero activity.
`vercel.json` has a daily cron at 09:00 UTC that hits `/api/keep-alive`,
which runs a trivial `select count(*) from companies` to reset the timer.
The route is no-op when env vars aren't set, so it's safe to keep on
through the demo-only phase.

### Files involved

```
supabase/
  migrations/0001_initial_schema.sql   # tables, triggers, helpers
  migrations/0002_rls_policies.sql     # RLS on every public table
  seed.sql                             # the same demo data as src/data/*
src/lib/supabase/
  env.ts                               # isSupabaseConfigured()
  server.ts                            # supabaseServer() - SSR client
  browser.ts                           # supabaseBrowser() - client-side
  admin.ts                             # supabaseAdmin() - service-role
  types.ts                             # Database TS type
src/app/api/keep-alive/route.ts        # daily ping
.env.local.example                     # template for env vars
```

### Data layer state

`src/data/store.ts` is currently the in-memory implementation. The next
step is to make every function async and dispatch via `isSupabaseConfigured()`
to Supabase queries when env is present. That refactor lives in a separate
PR / commit so the schema can be reviewed first.

The CO2 formula in `src/lib/co2.ts` uses placeholder factors documented on
`/miljo` - update before launch.
