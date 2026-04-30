import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { listingsByCompany } from "@/data/listings";
import { getVehicleById, vehicles } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";
import { getSession } from "@/lib/session";
import { getCompanyById } from "@/data/companies";
import { getCompanyStatus } from "@/data/store";

export const metadata: Metadata = {
  title: "Utleier-admin",
  robots: { index: false },
};

export default async function CompanyAdminHome() {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const company = getCompanyById(companyId)!;
  const status = getCompanyStatus(companyId);

  const list = listingsByCompany(companyId);
  const fleet = vehicles.filter((v) => v.companyId === companyId);
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
            {company.name}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-[color:var(--muted)]">
            <span>Status:</span>
            <Badge
              tone={
                status === "approved"
                  ? "success"
                  : status === "pending"
                    ? "warning"
                    : "error"
              }
            >
              {status === "approved"
                ? "Godkjent"
                : status === "pending"
                  ? "Avventer godkjenning"
                  : "Suspendert"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <LinkButton href="/utleier-admin/annonser/ny" variant="primary" size="sm">
            Ny annonse
          </LinkButton>
          <LinkButton
            href="/utleier-admin/fl%C3%A5te/ny"
            variant="secondary"
            size="sm"
          >
            Legg til bil
          </LinkButton>
        </div>
      </header>

      {status !== "approved" ? (
        <Card className="p-5 bg-[color:var(--warning)]/10 border-[color:var(--warning)]/30">
          <p className="text-sm">
            {status === "pending"
              ? "Kontoen din er under godkjenning av plattformen. Du kan se alle funksjoner, men kan ikke publisere annonser før admin har godkjent kontoen."
              : "Kontoen er suspendert. Ta kontakt med plattform-admin for å åpne kontoen igjen."}
          </p>
        </Card>
      ) : null}

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Biler i flåten" value={String(fleet.length)} />
        <Stat label="Aktive annonser" value={String(list.length)} />
        <Stat label="Avventende forespørsler" value="3" />
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
            title="Ny forespørsel på Trondhjem → Oslo"
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
