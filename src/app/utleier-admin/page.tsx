import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { listingsByCompany } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";

export const metadata: Metadata = {
  title: "Utleier-admin",
  robots: { index: false },
};

export default function CompanyAdminHome() {
  const list = listingsByCompany("c-hertz");
  const totalSaved = totalCo2SavedKg(
    list.map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );
  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Oversikt
          </h1>
          <p className="mt-1 text-[color:var(--muted)]">
            Status på flåten og de aktive annonsene dine.
          </p>
        </div>
        <div className="flex gap-2">
          <LinkButton href="/utleier-admin/annonser/ny" variant="primary" size="sm">
            Ny annonse
          </LinkButton>
          <LinkButton href="/utleier-admin/fl%C3%A5te/ny" variant="secondary" size="sm">
            Legg til bil
          </LinkButton>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Aktive annonser" value={String(list.length)} />
        <Stat label="Avventande forespørsler" value="6" />
        <Stat label="Fullført denne mnd" value="14" />
        <Stat
          label="CO₂ spart denne mnd"
          value={formatKg(totalSaved)}
          accent
        />
      </div>

      <section>
        <h2 className="font-heading text-xl font-semibold">Siste aktivitet</h2>
        <Card className="mt-4 divide-y divide-[color:var(--border)]">
          <ActivityRow
            icon="✓"
            title="Ida Karlsen ble godkjent på Oslo → Bergen"
            time="for 2 timer siden"
          />
          <ActivityRow
            icon="•"
            title="Ny forespurnad på Trondhjem → Oslo"
            time="for 4 timer siden"
          />
          <ActivityRow
            icon="✓"
            title="Henrik Bø leverte Stavanger → Oslo"
            time="i går"
          />
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

function ActivityRow({
  icon,
  title,
  time,
}: {
  icon: string;
  title: string;
  time: string;
}) {
  return (
    <div className="p-5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="h-7 w-7 rounded-full bg-[color:var(--accent)] text-[color:var(--primary)] flex items-center justify-center text-sm font-medium">
          {icon}
        </span>
        <p>{title}</p>
      </div>
      <p className="text-sm text-[color:var(--muted)]">{time}</p>
    </div>
  );
}
