import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { ListingCard } from "@/components/ListingCard";
import { JsonLd } from "@/components/JsonLd";
import { companies, getCompanyBySlug } from "@/data/companies";
import { listingsByCompany } from "@/data/listings";
import {
  absoluteUrl,
  breadcrumbSchema,
} from "@/lib/seo";
import { totalCo2SavedKg } from "@/lib/co2";
import { getVehicleById } from "@/data/vehicles";
import { formatKg } from "@/lib/format";

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompanyBySlug(slug);
  if (!c) return { title: "Utleier ikke funne" };
  return {
    title: `${c.name} — ledige relokeringsbilar`,
    description: `Se alle ledige biler fra ${c.name} på FreeRider.nå. Følg utleier og få varsel om nye biler.`,
    alternates: { canonical: `/utleier/${c.slug}` },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const list = listingsByCompany(company.id);
  const totalSaved = totalCo2SavedKg(
    list.map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Utleiere", href: "/utleiere" },
          { label: company.name },
        ]}
      />

      <header className="mt-3 grid md:grid-cols-[auto_1fr_auto] items-start gap-6">
        <div
          className="h-20 w-20 rounded-2xl flex items-center justify-center text-white text-3xl font-semibold"
          style={{ background: company.logoColor }}
          aria-hidden
        >
          {company.name.slice(0, 1)}
        </div>
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">
            {company.name}
          </h1>
          <p className="mt-2 text-[color:var(--muted)] max-w-2xl">
            {company.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{company.fleetSize.toLocaleString("nb-NO")} biler</Badge>
            <Badge>{company.locations.length} stasjoner</Badge>
            <Badge>Siden {company.established}</Badge>
            <Badge tone="eco">{company.totalRelocations} relokeringer utført</Badge>
          </div>
        </div>
        <LinkButton href="/logg-inn" variant="secondary">
          Følg {company.name}
        </LinkButton>
      </header>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Aktive annonser
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">
            {list.length}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            CO₂ spart i ledige annonser
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold text-[color:var(--primary)]">
            {formatKg(totalSaved)}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Stasjonar
          </p>
          <p className="mt-1 text-sm text-[color:var(--foreground)]">
            {company.locations.join(", ")}
          </p>
        </Card>
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="font-heading text-2xl font-semibold">Ledige biler</h2>
          <Link
            href={`/biler?from=&to=`}
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--primary)]"
          >
            Alle utleiere
          </Link>
        </div>
        {list.length === 0 ? (
          <Card className="mt-6 p-8 text-center text-[color:var(--muted)]">
            Ingen aktive annonser akkurat nå. Følg {company.name} for varsel når
            nye annonser blir publiserte.
          </Card>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Utleiere", url: "/utleiere" },
            { name: company.name, url: `/utleier/${company.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            url: absoluteUrl(`/utleier/${company.slug}`),
            description: company.description,
            foundingDate: String(company.established),
            areaServed: company.locations,
          },
        ]}
      />
    </Container>
  );
}
