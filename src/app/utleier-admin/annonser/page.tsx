import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { listingsByCompany } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { formatDateRange } from "@/lib/format";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Annonser",
  robots: { index: false },
};

export default async function AnnonserPage() {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const list = listingsByCompany(companyId);
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Annonser
          </h1>
          <p className="mt-1 text-[color:var(--muted)]">
            Aktive, utkast og tidligere oppdrag.
          </p>
        </div>
        <LinkButton href="/utleier-admin/annonser/ny">Ny annonse</LinkButton>
      </header>

      <div className="flex gap-2 text-sm">
        {["Aktive", "Utkast", "Avventer", "Fullført", "Lukket"].map((tab, idx) => (
          <button
            key={tab}
            type="button"
            className={`px-3 py-1.5 rounded-md ${idx === 0 ? "bg-[color:var(--primary)] text-white" : "bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--muted)]"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((l) => {
          const v = getVehicleById(l.vehicleId);
          if (!v) return null;
          return (
            <Card
              key={l.id}
              className="p-5 flex items-center justify-between flex-wrap gap-3"
            >
              <div>
                <p className="font-medium">
                  {v.make} {v.model} · {l.fromCity} → {l.toCity}
                </p>
                <p className="text-sm text-[color:var(--muted)]">
                  {formatDateRange(l.pickupStart, l.pickupEnd)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="success">Aktiv</Badge>
                <Link
                  href={`/utleier-admin/annonser/${l.id}/foresp%C3%B8rsler`}
                  className="text-sm text-[color:var(--primary)] hover:underline"
                >
                  Se forespørsler
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
