import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ListingCard } from "@/components/ListingCard";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { SortDropdown } from "./SortDropdown";
import { publishedListings } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import type { FuelType } from "@/lib/co2";

export const metadata: Metadata = {
  title: "Ledige biler for relokering i Norge",
  description:
    "Søk i alle ledige relokeringsbiler fra norske bilutleiere. Filtrer på rute, datoer og biltype. Kjør gratis i dag.",
  alternates: { canonical: "/biler" },
};

interface SearchParams {
  from?: string;
  to?: string;
  fuelType?: string;
  type?: string;
  q?: string;
  sort?: string;
}

export default async function BilerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const all = publishedListings();

  let results = all.filter((l) => {
    if (params.from && l.fromCity.toLowerCase() !== params.from.toLowerCase()) {
      return false;
    }
    if (params.to && l.toCity.toLowerCase() !== params.to.toLowerCase()) {
      return false;
    }
    const v = getVehicleById(l.vehicleId);
    if (!v) return false;
    if (params.fuelType && v.fuelType !== (params.fuelType as FuelType)) {
      return false;
    }
    if (params.type && v.type !== params.type) {
      return false;
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      const haystack = `${v.make} ${v.model} ${l.fromCity} ${l.toCity}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (params.sort === "distance") {
    results = [...results].sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (params.sort === "co2") {
    results = [...results].sort((a, b) => b.distanceKm - a.distanceKm);
  } else {
    results = [...results].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  const fromCities = Array.from(new Set(all.map((l) => l.fromCity))).sort();
  const toCities = Array.from(new Set(all.map((l) => l.toCity))).sort();

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Ledige biler" }]} />
      <header className="mt-3 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold">
            Ledige biler
          </h1>
          <p className="mt-2 text-[color:var(--muted)]">
            {results.length} {results.length === 1 ? "treff" : "treff"} ·
            oppdatert kontinuerlig
          </p>
        </div>
        <SortDropdown current={params.sort} params={params} />
      </header>

      <div className="mt-8 grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-20 self-start">
          <FiltersPanel
            params={params}
            fromCities={fromCities}
            toCities={toCities}
          />
        </aside>

        <div>
          {results.length === 0 ? (
            <Card className="p-10 text-center">
              <p className="text-[color:var(--muted)]">
                Ingen biler matcher filteret. Prøv å fjerne et filter, eller slå
                på varsel for denne kombinasjonen.
              </p>
              <div className="mt-4">
                <LinkButton href="/biler" variant="secondary">
                  Nullstill filter
                </LinkButton>
              </div>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Ledige biler", url: "/biler" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Ledige biler for relokering",
            url: absoluteUrl("/biler"),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: results.length,
              itemListElement: results.map((l, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: absoluteUrl(`/biler/${l.id}`),
              })),
            },
          },
        ]}
      />
    </Container>
  );
}

function FiltersPanel({
  params,
  fromCities,
  toCities,
}: {
  params: SearchParams;
  fromCities: string[];
  toCities: string[];
}) {
  return (
    <Card className="p-5">
      <h2 className="font-medium mb-4">Filter</h2>
      <form action="/biler" method="get" className="space-y-4">
        <Field label="Søk">
          <input
            type="text"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="f.eks. Tesla, Bergen"
            className={inputClass}
          />
        </Field>
        <Field label="Fra">
          <select name="from" defaultValue={params.from ?? ""} className={inputClass}>
            <option value="">Alle byer</option>
            {fromCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Til">
          <select name="to" defaultValue={params.to ?? ""} className={inputClass}>
            <option value="">Alle byer</option>
            {toCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Drivstoff">
          <select
            name="fuelType"
            defaultValue={params.fuelType ?? ""}
            className={inputClass}
          >
            <option value="">Alle</option>
            <option value="electric">Elbil</option>
            <option value="hybrid">Hybrid</option>
            <option value="petrol">Bensin</option>
            <option value="diesel">Diesel</option>
          </select>
        </Field>
        <Field label="Biltype">
          <select name="type" defaultValue={params.type ?? ""} className={inputClass}>
            <option value="">Alle</option>
            <option value="compact">Liten</option>
            <option value="sedan">Sedan</option>
            <option value="wagon">Stasjonsvogn</option>
            <option value="suv">SUV</option>
            <option value="van">Van</option>
          </select>
        </Field>
        {params.sort ? (
          <input type="hidden" name="sort" value={params.sort} />
        ) : null}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center h-10 rounded-lg bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-medium hover:bg-[color:var(--secondary)]"
        >
          Bruk filter
        </button>
        <Link
          href="/biler"
          className="block text-center text-sm text-[color:var(--muted)] hover:text-[color:var(--primary)]"
        >
          Nullstill
        </Link>
      </form>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-[color:var(--muted)] mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "block w-full h-10 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

