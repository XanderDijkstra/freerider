import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { companies } from "@/data/companies";
import { publishedListings } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";

export const metadata: Metadata = {
  title: "Plattform-admin",
  robots: { index: false },
};

export default function AdminHome() {
  const list = publishedListings();
  const totalSaved = totalCo2SavedKg(
    list.map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Plattform-oversikt
        </h1>
      </header>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Utleiere" value={String(companies.length)} />
        <Stat label="Aktive annonser" value={String(list.length)} />
        <Stat label="Sjåfører" value="248" />
        <Stat label="CO₂ spart totalt" value={formatKg(totalSaved)} accent />
      </div>

      <section>
        <h2 className="font-heading text-xl font-semibold">Utleiere — godkjenningskø</h2>
        <Card className="mt-4 divide-y divide-[color:var(--border)]">
          <Row name="Move&Go AS" status="pending" date="i dag" />
          <Row name="Nordic Cars AS" status="pending" date="i går" />
          <Row name="Bilkompaniet AS" status="approved" date="3 dager siden" />
        </Card>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
        {label}
      </p>
      <p
        className={`mt-1 font-heading text-2xl font-semibold ${accent ? "text-[color:var(--primary)]" : ""}`}
      >
        {value}
      </p>
    </Card>
  );
}

function Row({
  name,
  status,
  date,
}: {
  name: string;
  status: "pending" | "approved";
  date: string;
}) {
  return (
    <div className="p-5 flex items-center justify-between flex-wrap gap-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-[color:var(--muted)]">Søknad {date}</p>
      </div>
      <Badge tone={status === "pending" ? "warning" : "success"}>
        {status === "pending" ? "Avventer" : "Godkjent"}
      </Badge>
    </div>
  );
}
