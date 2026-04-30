import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  Fuel,
  Gauge,
  MapPin,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { EcoBadge } from "@/components/EcoBadge";
import { VehicleImage } from "@/components/VehicleImage";
import { ListingCard } from "@/components/ListingCard";
import { JsonLd } from "@/components/JsonLd";
import {
  getListingById,
  listings,
  relatedListings,
} from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { getCompanyById } from "@/data/companies";
import { computeCo2Saved } from "@/lib/co2";
import {
  formatDate,
  formatDateRange,
  formatKg,
  formatKm,
  formatTime,
} from "@/lib/format";
import {
  breadcrumbSchema,
  offerSchema,
  vehicleSchema,
} from "@/lib/seo";

export async function generateStaticParams() {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return { title: "Bil ikke funnet" };
  const vehicle = getVehicleById(listing.vehicleId);
  if (!vehicle) return { title: "Bil ikke funnet" };
  const co2 = computeCo2Saved({
    distanceKm: listing.distanceKm,
    fuelType: vehicle.fuelType,
  });
  return {
    title: `${vehicle.make} ${vehicle.model} ${listing.fromCity} → ${listing.toCity}`,
    description: `Flytt ${vehicle.make} ${vehicle.model} fra ${listing.fromCity} til ${listing.toCity} ${formatDate(listing.pickupStart)}. ${formatKm(listing.distanceKm)}. ${formatKg(co2.savedKg)} CO₂ spart. Søk nå.`,
    alternates: { canonical: `/biler/${listing.id}` },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();
  const vehicle = getVehicleById(listing.vehicleId);
  const company = getCompanyById(listing.companyId);
  if (!vehicle || !company) notFound();

  const co2 = computeCo2Saved({
    distanceKm: listing.distanceKm,
    fuelType: vehicle.fuelType,
  });

  const related = relatedListings(listing, 4);

  const compensationLabel = (() => {
    switch (listing.compensation.kind) {
      case "free":
        return "Gratis biltur";
      case "fuelCard":
        return "Drivstoffkort inkludert";
      case "tollsAndFerries":
        return "Bom og ferje dekket";
      case "flatNok":
        return `${listing.compensation.amount} kr i kompensasjon`;
    }
  })();

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Ledige biler", href: "/biler" },
          { label: `${vehicle.make} ${vehicle.model}` },
        ]}
      />

      <header className="mt-3 grid lg:grid-cols-2 gap-6">
        <div>
          <Badge tone="eco">{labelForFuel(vehicle.fuelType)}</Badge>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-semibold">
            {vehicle.make} {vehicle.model} fra {listing.fromCity} til{" "}
            {listing.toCity}
          </h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Publisert av{" "}
            <Link
              href={`/utleier/${company.slug}`}
              className="text-[color:var(--primary)] hover:underline"
            >
              {company.name}
            </Link>{" "}
            · {formatDate(listing.publishedAt)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <EcoBadge kgSaved={co2.savedKg} />
            <Badge>
              <Gauge className="h-3.5 w-3.5" aria-hidden /> {formatKm(listing.distanceKm)}
            </Badge>
            <Badge>
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatDateRange(listing.pickupStart, listing.pickupEnd)}
            </Badge>
            <Badge tone="success">{compensationLabel}</Badge>
          </div>
        </div>
        <VehicleImage
          color={vehicle.photos[0]}
          label={`${vehicle.make} ${vehicle.model}`}
          className="aspect-[16/10]"
        />
      </header>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-8">
          <Section title="Rute og tid">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                  Hentested
                </p>
                <p className="mt-1 font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[color:var(--secondary)]" aria-hidden />
                  {listing.fromCity}
                </p>
                <p className="text-sm text-[color:var(--muted)]">
                  {listing.fromAddress}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
                  Leveringssted
                </p>
                <p className="mt-1 font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[color:var(--secondary)]" aria-hidden />
                  {listing.toCity}
                </p>
                <p className="text-sm text-[color:var(--muted)]">
                  {listing.toAddress}
                </p>
              </div>
            </div>
            <RouteVisual from={listing.fromCity} to={listing.toCity} />
            <div className="grid sm:grid-cols-3 gap-4 text-sm mt-4">
              <Stat
                icon={<Clock className="h-4 w-4" aria-hidden />}
                label="Opphenting"
                value={`${formatDate(listing.pickupStart)} kl. ${formatTime(listing.pickupStart)}`}
                hint={`frem til ${formatDate(listing.pickupEnd)} kl. ${formatTime(listing.pickupEnd)}`}
              />
              <Stat
                icon={<Calendar className="h-4 w-4" aria-hidden />}
                label="Leveringsfrist"
                value={`${formatDate(listing.dropoffDeadline)} kl. ${formatTime(listing.dropoffDeadline)}`}
              />
              <Stat
                icon={<Gauge className="h-4 w-4" aria-hidden />}
                label="Distanse / max"
                value={`${formatKm(listing.distanceKm)} / ${formatKm(listing.maxKm)}`}
              />
            </div>
          </Section>

          <Section title="Klimaeffekt">
            <Card className="p-5 bg-[color:var(--accent)]/30 border-[color:var(--accent)]">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center">
                  <Leaf />
                </div>
                <div>
                  <p className="font-heading text-2xl font-semibold text-[color:var(--primary)]">
                    {formatKg(co2.savedKg)} CO₂ spart
                  </p>
                  <p className="text-sm text-[color:var(--muted)] mt-1">
                    vs. tom retur i tilsvarande bil ({formatKg(co2.baselineKg)}).
                    Oppdraget selv slepp ut ca. {formatKg(co2.vehicleKg)}.{" "}
                    <Link href="/miljo" className="text-[color:var(--primary)] underline">
                      Se metoden
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="Bilen">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Spec icon={<Car className="h-4 w-4" />} label="Modell" value={`${vehicle.make} ${vehicle.model}`} />
              <Spec icon={<Calendar className="h-4 w-4" />} label="Årsmodell" value={String(vehicle.year)} />
              <Spec icon={<Fuel className="h-4 w-4" />} label="Drivstoff" value={labelForFuel(vehicle.fuelType)} />
              <Spec icon={<Settings className="h-4 w-4" />} label="Girkasse" value={vehicle.transmission === "automatic" ? "Automat" : "Manuell"} />
              <Spec icon={<Users className="h-4 w-4" />} label="Sete" value={`${vehicle.seats} sete`} />
              <Spec icon={<Gauge className="h-4 w-4" />} label="Bagasje" value={`${vehicle.luggage} L`} />
              {vehicle.evRangeKm ? (
                <Spec icon={<Fuel className="h-4 w-4" />} label="Rekkjevidde" value={formatKm(vehicle.evRangeKm)} />
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {vehicle.features.map((f) => (
                <Badge key={f}>{f}</Badge>
              ))}
            </div>
          </Section>

          <Section title="Regler for turen">
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              <Rule
                icon={<Fuel className="h-4 w-4" />}
                label="Drivstoff"
                value={fuelPolicyLabel(listing.rules.fuel)}
              />
              <Rule
                icon={<MapPin className="h-4 w-4" />}
                label="Ferje"
                value={ferryPolicyLabel(listing.rules.ferry)}
              />
              <Rule
                icon={<CreditCard className="h-4 w-4" />}
                label="Bompengar"
                value={listing.rules.tolls === "covered" ? "Dekket" : "Ikkje dekket"}
              />
              <Rule
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Forsikring"
                value={listing.rules.insurance === "premium" ? "Premium" : "Standard"}
              />
              <Rule
                icon={<Users className="h-4 w-4" />}
                label="Minimumsalder"
                value={`${listing.rules.minAge} år`}
              />
              <Rule
                icon={<Car className="h-4 w-4" />}
                label="Sertifikat"
                value={`Klasse ${listing.rules.licenseClass}`}
              />
            </ul>
            {listing.rules.notes ? (
              <p className="mt-4 text-sm text-[color:var(--muted)] border-l-4 border-[color:var(--accent)] pl-4">
                {listing.rules.notes}
              </p>
            ) : null}
          </Section>

          <Section title="Utleieren">
            <Card className="p-5 flex items-start gap-4">
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                style={{ background: company.logoColor }}
                aria-hidden
              >
                {company.name.slice(0, 1)}
              </div>
              <div className="flex-1">
                <Link
                  href={`/utleier/${company.slug}`}
                  className="font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
                >
                  {company.name}
                </Link>
                <p className="text-sm text-[color:var(--muted)] mt-1">
                  {company.fleetSize.toLocaleString("nb-NO")} biler ·{" "}
                  {company.locations.length} stasjoner · siden{" "}
                  {company.established}
                </p>
                <Link
                  href={`/utleier/${company.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-[color:var(--primary)] hover:underline"
                >
                  Se alle biler fra {company.name}{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Card>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-20 self-start space-y-4">
          <Card className="p-5">
            <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
              Kompensasjon
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold text-[color:var(--primary)]">
              {compensationLabel}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
                Full forsikring under hele turen
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
                Gratis kansellering inntil 24 t før
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
                Ingen skjulte gebyr
              </li>
            </ul>
            <LinkButton
              href={`/logg-inn?next=/biler/${listing.id}`}
              size="lg"
              className="w-full mt-5"
            >
              Søk om denne bilen
            </LinkButton>
            <p className="mt-2 text-xs text-[color:var(--muted)] text-center">
              Krever konto. Tar 1 minutt å registrere.
            </p>
          </Card>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold mb-6">
            Lignande biler
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      ) : null}

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Ledige biler", url: "/biler" },
            {
              name: `${vehicle.make} ${vehicle.model}`,
              url: `/biler/${listing.id}`,
            },
          ]),
          vehicleSchema({
            name: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            brand: vehicle.make,
            model: vehicle.model,
            modelYear: vehicle.year,
            fuelType: labelForFuel(vehicle.fuelType),
            vehicleTransmission: vehicle.transmission,
          }),
          offerSchema({
            name: `${vehicle.make} ${vehicle.model} ${listing.fromCity}-${listing.toCity}`,
            description: `Relokering ${listing.fromCity} til ${listing.toCity}, ${formatKm(listing.distanceKm)}.`,
            url: `/biler/${listing.id}`,
            price: 0,
            validFrom: listing.pickupStart,
            validThrough: listing.pickupEnd,
          }),
        ]}
      />
    </Container>
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
      <h2 className="font-heading text-xl font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]">
      <span className="text-[color:var(--secondary)] mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-[color:var(--muted)]">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
      <p className="text-xs uppercase tracking-wide text-[color:var(--muted)] flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="font-medium mt-1">{value}</p>
      {hint ? <p className="text-xs text-[color:var(--muted)] mt-0.5">{hint}</p> : null}
    </div>
  );
}

function Rule({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3 p-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]">
      <span className="text-[color:var(--secondary)]">{icon}</span>
      <div>
        <p className="text-xs text-[color:var(--muted)]">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </li>
  );
}

function RouteVisual({ from, to }: { from: string; to: string }) {
  return (
    <div className="mt-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--accent)]/20 p-6 flex items-center justify-between">
      <RoutePin label={from} />
      <div className="flex-1 mx-4 relative">
        <div className="h-0.5 bg-[color:var(--secondary)]/50 w-full" />
        <div
          className="absolute inset-y-0 left-0 h-0.5 bg-[color:var(--secondary)]"
          style={{ width: "60%" }}
        />
        <ArrowRight className="absolute right-0 -top-2 h-5 w-5 text-[color:var(--secondary)]" aria-hidden />
      </div>
      <RoutePin label={to} />
    </div>
  );
}

function RoutePin({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-8 w-8 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center">
        <MapPin className="h-4 w-4" aria-hidden />
      </div>
      <p className="mt-2 text-sm font-medium">{label}</p>
    </div>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 7-3 9-3 0 4-1 8-3 11s-3 6-6 6Z" />
      <path d="M2 22 12 12" />
    </svg>
  );
}

function labelForFuel(fuel: string): string {
  switch (fuel) {
    case "electric":
      return "Elbil";
    case "hybrid":
      return "Hybrid";
    case "diesel":
      return "Diesel";
    case "petrol":
      return "Bensin";
    default:
      return fuel;
  }
}

function fuelPolicyLabel(p: string): string {
  switch (p) {
    case "returnFull":
      return "Lever med full tank";
    case "returnAsReceived":
      return "Lever som mottatt";
    case "companyPays":
      return "Utleieren dekker";
    default:
      return p;
  }
}

function ferryPolicyLabel(p: string): string {
  switch (p) {
    case "covered":
      return "Dekket av utleier";
    case "notCovered":
      return "Du betaler selv";
    case "partial":
      return "Delvis dekket";
    default:
      return p;
  }
}
