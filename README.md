# FreeRider.no

Norsk marknad for bilflytting. Bilutleigarar publiserer biler som må flyttast
mellom stasjonar; private sjåførar tek bilen for ein gratis (eller billeg)
biltur. Lågare kostnad for utleigar, gratis tur for sjåfør, lågare CO₂ for alle.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind v4 + shadcn-style components
- **Fonts:** Inter (UI) + Fraunces (headings)
- **Backend:** Supabase (planned — data layer is currently mock)
- **Hosting:** Vercel
- **Notifications:** Resend (email) + Twilio (SMS) — planned

## Lokalt oppsett

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Skript

```bash
npm run dev         # dev server
npm run build       # produksjonsbygg
npm run start       # start prod-server
npm run typecheck   # tsc --noEmit
```

## Mappestruktur

Sjå [`AGENTS.md`](./AGENTS.md) for full oversikt over kodestrukturen og
konvensjonar.

## Status

MVP-skjelett: alle ruter scaffolda, design-system på plass, mock data layer.
Klart for backend-integrasjon (Supabase auth, RLS, edge functions).
