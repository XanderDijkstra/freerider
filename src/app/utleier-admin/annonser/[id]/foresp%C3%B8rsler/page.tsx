import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { getListing, getRequestsForListing } from "@/data/store";
import { getVehicleById } from "@/data/vehicles";
import { getUserById } from "@/data/users";
import { formatDate, formatTime } from "@/lib/format";
import {
  approveDriverRequest,
  rejectDriverRequest,
} from "@/lib/auth-actions";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Forespørsler på annonse",
  robots: { index: false },
};

export default async function ListingRequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  const listing = getListing(id);
  if (!listing) notFound();
  if (session?.role === "company" && listing.companyId !== session.companyId) {
    notFound();
  }

  const vehicle = getVehicleById(listing.vehicleId);
  if (!vehicle) notFound();
  const requests = getRequestsForListing(listing.id);

  const pending = requests.filter((r) => r.status === "pending");
  const decided = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Forespørsler
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          {vehicle.make} {vehicle.model} · {listing.fromCity} → {listing.toCity}
        </p>
      </header>

      {requests.length === 0 ? (
        <Card className="p-6 text-sm text-[color:var(--muted)]">
          Ingen forespørsler enda.
        </Card>
      ) : (
        <>
          {pending.length > 0 ? (
            <Section title={`Avventer (${pending.length})`}>
              <Card className="overflow-hidden divide-y divide-[color:var(--border)]">
                {pending.map((r) => {
                  const driver = getUserById(r.driverId);
                  return (
                    <RequestRow
                      key={r.id}
                      requestId={r.id}
                      listingId={listing.id}
                      name={driver?.name ?? "Ukjent sjåfør"}
                      license={driver?.licenseNumber ?? "-"}
                      phone={driver?.phone ?? "-"}
                      pickupAt={`${formatDate(r.preferredPickupAt)} kl. ${formatTime(r.preferredPickupAt)}`}
                      message={r.message}
                      status="pending"
                    />
                  );
                })}
              </Card>
            </Section>
          ) : null}

          {decided.length > 0 ? (
            <Section title={`Behandlet (${decided.length})`}>
              <Card className="overflow-hidden divide-y divide-[color:var(--border)]">
                {decided.map((r) => {
                  const driver = getUserById(r.driverId);
                  return (
                    <RequestRow
                      key={r.id}
                      requestId={r.id}
                      listingId={listing.id}
                      name={driver?.name ?? "Ukjent sjåfør"}
                      license={driver?.licenseNumber ?? "-"}
                      phone={driver?.phone ?? "-"}
                      pickupAt={`${formatDate(r.preferredPickupAt)} kl. ${formatTime(r.preferredPickupAt)}`}
                      message={r.message}
                      status={r.status}
                    />
                  );
                })}
              </Card>
            </Section>
          ) : null}
        </>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function RequestRow({
  requestId,
  listingId,
  name,
  license,
  phone,
  pickupAt,
  message,
  status,
}: {
  requestId: string;
  listingId: string;
  name: string;
  license: string;
  phone: string;
  pickupAt: string;
  message: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
}) {
  const tone =
    status === "approved"
      ? "success"
      : status === "rejected"
        ? "error"
        : status === "cancelled"
          ? "neutral"
          : "warning";
  const label =
    status === "approved"
      ? "Godkjent"
      : status === "rejected"
        ? "Avslått"
        : status === "cancelled"
          ? "Kansellert"
          : "Avventer";

  return (
    <div className="p-5 grid md:grid-cols-[1fr_auto] gap-4 items-start">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          <Badge tone={tone}>{label}</Badge>
        </div>
        <p className="text-sm text-[color:var(--muted)] mt-1">
          Sertifikat: {license} · {phone}
        </p>
        <p className="text-sm mt-2">
          <span className="text-[color:var(--muted)]">Ønsket opphenting:</span>{" "}
          {pickupAt}
        </p>
        {message ? (
          <p className="mt-3 text-sm border-l-2 border-[color:var(--accent)] pl-3 text-[color:var(--muted)]">
            {message}
          </p>
        ) : null}
      </div>
      {status === "pending" ? (
        <div className="flex gap-2">
          <form action={approveDriverRequest}>
            <input type="hidden" name="requestId" value={requestId} />
            <input type="hidden" name="listingId" value={listingId} />
            <Button size="sm" type="submit">
              Godkjenn
            </Button>
          </form>
          <form action={rejectDriverRequest}>
            <input type="hidden" name="requestId" value={requestId} />
            <input type="hidden" name="listingId" value={listingId} />
            <Button size="sm" variant="secondary" type="submit">
              Avslå
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
