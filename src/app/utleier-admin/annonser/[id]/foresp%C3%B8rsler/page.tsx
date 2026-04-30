import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { getListingById } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Forespørsler på annonse",
  robots: { index: false },
};

const APPLICANTS = [
  {
    name: "Ida Karlsen",
    license: "**** **** 1245",
    phone: "+47 412 34 567",
    pickupAt: "3. mai kl. 09:00",
    message: "Skal til Bergen for en konferanse, kan hente tidlig.",
  },
  {
    name: "Henrik Bø",
    license: "**** **** 8821",
    phone: "+47 990 12 002",
    pickupAt: "3. mai kl. 14:00",
    message: "Erfaren med ID.4. Fleksibel på tid.",
  },
  {
    name: "Marit Engen",
    license: "**** **** 4477",
    phone: "+47 916 88 200",
    pickupAt: "4. mai kl. 11:00",
    message: "",
  },
];

export default async function ListingRequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();
  const vehicle = getVehicleById(listing.vehicleId);
  if (!vehicle) notFound();
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

      <Card className="overflow-hidden">
        <div className="divide-y divide-[color:var(--border)]">
          {APPLICANTS.map((a) => (
            <div
              key={a.name}
              className="p-5 grid md:grid-cols-[1fr_auto] gap-4 items-start"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{a.name}</h2>
                  <Badge tone="warning">Avventer</Badge>
                </div>
                <p className="text-sm text-[color:var(--muted)] mt-1">
                  Sertifikat: {a.license} · {a.phone}
                </p>
                <p className="text-sm mt-2">
                  <span className="text-[color:var(--muted)]">Ønsket opphenting:</span>{" "}
                  {a.pickupAt}
                </p>
                {a.message ? (
                  <p className="mt-3 text-sm border-l-2 border-[color:var(--accent)] pl-3 text-[color:var(--muted)]">
                    {a.message}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button size="sm">Godkjenn</Button>
                <Button size="sm" variant="secondary">
                  Avslå
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
