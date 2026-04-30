import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { ListingCard } from "@/components/ListingCard";
import { publishedListings } from "@/data/listings";
import { formatKg } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sjåførpanel",
  robots: { index: false },
};

export default function DriverDashboard() {
  const upcoming = publishedListings().slice(0, 2);
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Hei, klar for ein tur?
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Sjå dine aktive forespørslar, nye annonsar frå utleigarar du følgjer,
          og total CO₂-besparing du har bidrege med.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Aktive forespørslar
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">2</p>
          <p className="text-xs text-[color:var(--muted)] mt-1">1 godkjent · 1 avventer</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Komande oppdrag
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">1</p>
          <p className="text-xs text-[color:var(--muted)] mt-1">Oslo → Bergen, 3. mai</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            CO₂ spart med deg
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold text-[color:var(--primary)]">
            {formatKg(420)}
          </p>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-heading text-xl font-semibold">Anbefalt for deg</h2>
          <LinkButton href="/biler" variant="secondary" size="sm">
            Sjå alle annonsar
          </LinkButton>
        </div>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {upcoming.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold">Følgde utleigarar</h2>
        <Card className="mt-4 p-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-medium">Hertz Norge</p>
            <p className="text-sm text-[color:var(--muted)]">3 nye annonsar i veka</p>
          </div>
          <Badge tone="success">Følgjer</Badge>
        </Card>
      </section>
    </div>
  );
}
