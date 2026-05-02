import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import {
  getCompanyStatus,
  getRequestsForCompany,
  listingsForCompany,
  vehiclesForCompany,
  getVehicle,
} from "@/data/store";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";
import { getSession } from "@/lib/session";
import { getCompanyById } from "@/data/companies";

export const metadata: Metadata = {
  title: "Utleier-admin",
  robots: { index: false },
};

export default async function CompanyAdminHome() {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const company = getCompanyById(companyId)!;
  const status = getCompanyStatus(companyId);

  const list = listingsForCompany(companyId);
  const fleet = vehiclesForCompany(companyId);
  const requests = getRequestsForCompany(companyId);
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const completedRequests = requests.filter((r) => r.status === "approved");

  const totalSaved = totalCo2SavedKg(
    list.map((l) => {
      const v = getVehicle(l.vehicleId)!;
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
              ? "Kontoen din er under godkjenning av plattformen. Du kan se alle funksjoner, men annonser blir ikke synlige før admin har godkjent kontoen."
              : "Kontoen er suspendert. Ta kontakt med plattform-admin for å åpne kontoen igjen."}
          </p>
        </Card>
      ) : null}

      <div className="grid md:grid-cols-4 gap-4">
        <Stat label="Biler i flåten" value={String(fleet.length)} />
        <Stat label="Aktive annonser" value={String(list.length)} />
        <Stat
          label="Avventende forespørsler"
          value={String(pendingRequests.length)}
        />
        <Stat
          label="CO₂ spart (akt. annonser)"
          value={formatKg(totalSaved)}
          accent
        />
      </div>

      <section>
        <h2 className="font-heading text-xl font-semibold">Avventer behandling</h2>
        {pendingRequests.length === 0 ? (
          <Card className="mt-4 p-5 text-sm text-[color:var(--muted)]">
            Ingen forespørsler venter på behandling.
          </Card>
        ) : (
          <Card className="mt-4 divide-y divide-[color:var(--border)]">
            {pendingRequests.slice(0, 5).map((r) => {
              const l = list.find((x) => x.id === r.listingId);
              if (!l) return null;
              const v = getVehicle(l.vehicleId);
              return (
                <div
                  key={r.id}
                  className="p-5 flex items-center justify-between flex-wrap gap-3"
                >
                  <div>
                    <p className="font-medium">
                      {v?.make} {v?.model} · {l.fromCity} → {l.toCity}
                    </p>
                    <p className="text-sm text-[color:var(--muted)] mt-1">
                      {requests.filter((x) => x.listingId === l.id && x.status === "pending").length} søkere venter
                    </p>
                  </div>
                  <LinkButton
                    href={`/utleier-admin/annonser/${l.id}/foresp%C3%B8rsler`}
                    variant="secondary"
                    size="sm"
                  >
                    Se forespørsler
                  </LinkButton>
                </div>
              );
            })}
          </Card>
        )}
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold">Siste aktivitet</h2>
        {completedRequests.length === 0 ? (
          <Card className="mt-4 p-5 text-sm text-[color:var(--muted)]">
            Ingen fullførte oppdrag enda.
          </Card>
        ) : (
          <Card className="mt-4 divide-y divide-[color:var(--border)]">
            {completedRequests.slice(0, 5).map((r) => {
              const l = list.find((x) => x.id === r.listingId);
              if (!l) return null;
              const v = getVehicle(l.vehicleId);
              return (
                <div key={r.id} className="p-5 flex items-center justify-between gap-3">
                  <p className="text-sm">
                    Sjåfør godkjent på {v?.make} {v?.model} · {l.fromCity} → {l.toCity}
                  </p>
                </div>
              );
            })}
          </Card>
        )}
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
