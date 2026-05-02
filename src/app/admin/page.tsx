import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { companies } from "@/data/companies";
import { demoUsers } from "@/data/users";
import { getVehicleById } from "@/data/vehicles";
import { allCompanyStatuses, publishedListingsLive } from "@/data/store";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";

export const metadata: Metadata = {
  title: "Plattform-admin",
  robots: { index: false },
};

export default function AdminHome() {
  const list = publishedListingsLive();
  const totalSaved = totalCo2SavedKg(
    list.map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );

  const statuses = allCompanyStatuses();
  const pendingCompanies = statuses.filter((s) => s.status === "pending");
  const approvedCompanies = statuses.filter((s) => s.status === "approved");
  const drivers = demoUsers.filter((u) => u.role === "driver");
  const companyUsers = demoUsers.filter((u) => u.role === "company");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Plattform-oversikt
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Statistikk og snarveier til de viktigste handlingene.
        </p>
      </header>

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Utleiere (godkjent)" value={String(approvedCompanies.length)} />
        <Stat label="Avventer godkjenning" value={String(pendingCompanies.length)} />
        <Stat
          label="Brukere totalt"
          value={String(demoUsers.length)}
          hint={`${drivers.length} sjåfører · ${companyUsers.length} utleier-ansvarlige`}
        />
        <Stat label="CO₂ spart totalt" value={formatKg(totalSaved)} accent />
      </div>

      <section>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-heading text-xl font-semibold">
            Utleiere som venter
          </h2>
          <LinkButton href="/admin/utleiere" variant="secondary" size="sm">
            Administrer alle utleiere
          </LinkButton>
        </div>
        {pendingCompanies.length === 0 ? (
          <Card className="mt-4 p-5 text-sm text-[color:var(--muted)]">
            Ingen utleiere venter på godkjenning.
          </Card>
        ) : (
          <Card className="mt-4 divide-y divide-[color:var(--border)]">
            {pendingCompanies.map(({ id }) => {
              const c = companies.find((x) => x.id === id);
              if (!c) return null;
              return (
                <div
                  key={id}
                  className="p-5 flex items-center justify-between flex-wrap gap-3"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-[color:var(--muted)]">
                      Etablert {c.established} · {c.locations.length} stasjoner
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone="warning">Avventer</Badge>
                    <Link
                      href="/admin/utleiere"
                      className="text-sm text-[color:var(--primary)] hover:underline"
                    >
                      Behandle
                    </Link>
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="font-heading text-lg font-semibold">Brukere</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            Sjåfører og utleier-ansvarlige. Suspendér misbruk eller reaktiver
            kontoer.
          </p>
          <LinkButton href="/admin/brukere" variant="secondary" size="sm" className="mt-4">
            Administrer brukere
          </LinkButton>
        </Card>
        <Card className="p-5">
          <h2 className="font-heading text-lg font-semibold">Annonser</h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {list.length} aktive annonser på plattformen akkurat nå.
            Annonse-moderering kommer i neste fase.
          </p>
          <LinkButton href="/biler" variant="secondary" size="sm" className="mt-4">
            Se annonser
          </LinkButton>
        </Card>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
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
      {hint ? (
        <p className="text-xs text-[color:var(--muted)] mt-1">{hint}</p>
      ) : null}
    </Card>
  );
}
