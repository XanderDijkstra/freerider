import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { getRequestsForDriver, getListing } from "@/data/store";
import { getVehicleById } from "@/data/vehicles";
import { getCompanyById } from "@/data/companies";
import { formatDate, formatDateRange, formatTime } from "@/lib/format";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Mine forespørsler",
  robots: { index: false },
};

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "neutral"> = {
  approved: "success",
  pending: "warning",
  rejected: "error",
  cancelled: "neutral",
};

const STATUS_LABEL: Record<string, string> = {
  approved: "Godkjent",
  pending: "Avventer",
  rejected: "Avslått",
  cancelled: "Kansellert",
};

export default async function MineForesporselrPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const session = await getSession();
  const userId = session?.userId ?? "";
  const requests = getRequestsForDriver(userId);
  const { sent } = await searchParams;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Mine forespørsler
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Status på de oppdragene du har søkt på.
        </p>
      </header>

      {sent === "1" ? (
        <Card className="p-4 bg-[color:var(--success)]/10 border-[color:var(--success)]/30 text-sm">
          Søknaden din er sendt. Du får svar via e-post og SMS når utleier har
          tatt en avgjørelse.
        </Card>
      ) : null}

      {requests.length === 0 ? (
        <Card className="p-8 text-center text-[color:var(--muted)] space-y-3">
          <p>Du har ingen forespørsler enda.</p>
          <LinkButton href="/biler" variant="secondary" size="sm">
            Se ledige biler
          </LinkButton>
        </Card>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => {
            const listing = getListing(r.listingId);
            if (!listing) return null;
            const v = getVehicleById(listing.vehicleId);
            const c = getCompanyById(listing.companyId);
            return (
              <Card
                key={r.id}
                className="p-5 grid md:grid-cols-[1fr_auto] gap-3 items-start"
              >
                <div>
                  <p className="font-medium">
                    {v?.make} {v?.model} · {listing.fromCity} → {listing.toCity}
                  </p>
                  <p className="text-sm text-[color:var(--muted)] mt-1">
                    {c?.name} ·{" "}
                    {formatDateRange(listing.pickupStart, listing.pickupEnd)}
                  </p>
                  <p className="text-xs text-[color:var(--muted)] mt-2">
                    Søknad sendt {formatDate(r.createdAt)} · ønsket opphenting{" "}
                    {formatDate(r.preferredPickupAt)} kl.{" "}
                    {formatTime(r.preferredPickupAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</Badge>
                  <LinkButton
                    href={`/biler/${listing.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Se annonse
                  </LinkButton>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
