<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FreeRider.no — codebase orientation

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

## Backend wiring (TODO)

The data layer in `src/data/*` is mock. Swap with Supabase queries when wiring auth.
The CO₂ formula in `src/lib/co2.ts` uses placeholder factors documented on `/miljo`
— update before launch.
