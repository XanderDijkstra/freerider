import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { publishedListings } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { formatDateRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Mine forespørslar",
  robots: { index: false },
};

const REQUESTS = [
  { id: "r-1", listingId: "l-001", status: "approved" as const },
  { id: "r-2", listingId: "l-005", status: "pending" as const },
  { id: "r-3", listingId: "l-002", status: "rejected" as const },
];

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};

const STATUS_LABEL: Record<string, string> = {
  approved: "Godkjent",
  pending: "Avventer",
  rejected: "Avslått",
};

export default function MineForesporselrPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Mine forespørslar
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Status på dei oppdraga du har søkt på.
        </p>
      </header>
      <div className="space-y-3">
        {REQUESTS.map((r) => {
          const listing = publishedListings().find((l) => l.id === r.listingId);
          if (!listing) return null;
          const v = getVehicleById(listing.vehicleId);
          return (
            <Card key={r.id} className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-medium">
                  {v?.make} {v?.model} · {listing.fromCity} → {listing.toCity}
                </p>
                <p className="text-sm text-[color:var(--muted)]">
                  {formatDateRange(listing.pickupStart, listing.pickupEnd)}
                </p>
              </div>
              <Badge tone={STATUS_TONE[r.status]}>{STATUS_LABEL[r.status]}</Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
