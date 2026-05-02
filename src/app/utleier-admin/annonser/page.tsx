import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import {
  getRequestsForListing,
  listingsForCompany,
  getVehicle,
} from "@/data/store";
import { formatDateRange } from "@/lib/format";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Annonser",
  robots: { index: false },
};

export default async function AnnonserPage() {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const list = listingsForCompany(companyId);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Annonser
          </h1>
          <p className="mt-1 text-[color:var(--muted)]">
            {list.length} aktive annonser.
          </p>
        </div>
        <LinkButton href="/utleier-admin/annonser/ny">Ny annonse</LinkButton>
      </header>

      {list.length === 0 ? (
        <Card className="p-8 text-center text-[color:var(--muted)] space-y-3">
          <p>Ingen aktive annonser enda.</p>
          <LinkButton href="/utleier-admin/annonser/ny" variant="secondary">
            Lag første annonse
          </LinkButton>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((l) => {
            const v = getVehicle(l.vehicleId);
            if (!v) return null;
            const requests = getRequestsForListing(l.id);
            const pendingCount = requests.filter(
              (r) => r.status === "pending",
            ).length;
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
                  {pendingCount > 0 ? (
                    <Badge tone="warning">{pendingCount} avventer</Badge>
                  ) : (
                    <Badge tone="success">Aktiv</Badge>
                  )}
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
      )}
    </div>
  );
}
