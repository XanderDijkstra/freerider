import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { publishedListings } from "@/data/listings";
import { getVehicleById } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { formatKg } from "@/lib/format";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Klimaeffekt og CO₂-metode",
  description:
    "Slik regner vi CO₂-besparing per relokering. Tall, kilder og sammenligning mot tom retur og fly.",
  alternates: { canonical: "/miljo" },
};

const FAQ = [
  {
    q: "Hvordan regner dere CO₂?",
    a: "Distanse × utslippsfaktor for det aktuelle drivstoffet, sammenlignet med utslippsfaktoren for det baseline-scenarioet du velger (tom retur, staff + fly, transportør).",
  },
  {
    q: "Hvilke kilder bruker dere?",
    a: "Vi tar utgangspunkt i Defra GHG Conversion Factors og IEA-tall for norsk grid mix. Faktorene blir oppdatert minst én gang i året.",
  },
  {
    q: "Hvorfor får elbilen ikke null?",
    a: "Selv en elbil genererer indirekte utslipp via grid mix og produksjon. Vi bruker en well-to-wheel-faktor for norsk strøm.",
  },
  {
    q: "Er tallene validert av tredjepart?",
    a: "Nei, ikke ennå. Vi planlegger en uavhengig revisjon når volumet er stort nok. Inntil da er metoden vår offentlig slik at andre kan etterprøve.",
  },
  {
    q: "Hvorfor prioriterer dere elbiler?",
    a: "Elbil-annonser får ekstra synlighet i markedet, og vi anbefaler utleiere å publisere disse først.",
  },
];

const FACTORS = [
  { label: "Bensin (per km)", value: "0,18 kg CO₂" },
  { label: "Diesel (per km)", value: "0,16 kg CO₂" },
  { label: "Hybrid (per km)", value: "0,11 kg CO₂" },
  { label: "Elbil, norsk grid (per km)", value: "0,025 kg CO₂" },
  { label: "Tom staff-relokering", value: "0,17 kg CO₂/km" },
  { label: "Staff + returflybillett (allokert)", value: "0,27 kg CO₂/km" },
  { label: "Profesjonell transportør", value: "0,22 kg CO₂/km" },
];

export default function MiljoPage() {
  const totalSavedKg = totalCo2SavedKg(
    publishedListings().map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Miljø" }]} />

      <header className="mt-3 max-w-3xl">
        <Badge tone="eco">
          <Leaf className="h-3.5 w-3.5" aria-hidden /> Klimaeffekt
        </Badge>
        <h1 className="mt-3 font-heading text-3xl md:text-5xl font-semibold">
          Vår klimaeffekt
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Vi publiserer metoden vår, ikke bare konklusjonen. Du skal kunne
          etterprøve hvert eneste tonn CO₂ vi sier vi har spart.
        </p>
      </header>

      <section className="mt-10">
        <Card className="p-8 bg-[color:var(--primary)] text-white border-[color:var(--primary)]">
          <p className="text-sm uppercase tracking-wider text-white/70">
            Spart så langt
          </p>
          <p className="mt-2 font-heading text-5xl md:text-6xl font-semibold">
            {formatKg(totalSavedKg)}
          </p>
          <p className="mt-3 text-white/85 max-w-xl">
            Total CO₂ som freerider-modellen har erstattet vs. tom retur. Tallet
            blir oppdatert hver gang et oppdrag er fullført.
          </p>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Metoden vår</h2>
        <p className="mt-3 text-[color:var(--muted)]">
          For hvert oppdrag regner vi:
        </p>
        <pre className="mt-3 p-4 rounded-lg bg-[color:var(--surface)] border border-[color:var(--border)] overflow-auto text-sm">
{`vehicle_kg     = distanse_km * faktor[drivstoff]
baseline_kg    = distanse_km * faktor[baseline]
saved_kg       = max(0, baseline_kg - vehicle_kg)`}
        </pre>
        <p className="mt-3 text-[color:var(--muted)]">
          Default-baseline er &quot;tom retur med ansatt&quot;. Brukeren kan
          slå om til &quot;ansatt + returflight&quot; eller &quot;profesjonell
          transportør&quot; på den enkelte annonsesiden.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">Utslippsfaktorer</h2>
        <Card className="mt-6 divide-y divide-[color:var(--border)]">
          {FACTORS.map((f) => (
            <div
              key={f.label}
              className="flex items-baseline justify-between p-5"
            >
              <span className="text-[color:var(--muted)]">{f.label}</span>
              <span className="font-medium">{f.value}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">
            Vs. tom retur
          </h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Samme bil, men kjørt av en freerider-sjåfør i stedet for en ansatt
            som flyr tilbake. Sparing: ca. 50–80 kg CO₂ per 480 km.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">
            Vs. staff + fly
          </h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Inkluderer returflybilletten med radiative forcing. Sparing typisk
            150–200 kg CO₂ per oppdrag på lengre ruter.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">
            Vs. transportør
          </h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            En 3-bils transportør har lavere utslipp per bil enn én staff-tur,
            men er fortsatt høyere enn en freerider på elbil.
          </p>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Kilder</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-[color:var(--muted)]">
          <li>Defra Greenhouse gas reporting: conversion factors 2024</li>
          <li>IEA - Norway electricity carbon intensity (2024)</li>
          <li>EEA - emissions from passenger transport modes</li>
          <li>Statens vegvesen - kjøretøyregister-statistikk</li>
        </ul>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          Kilder og koeffisienter blir revidert minimum én gang i året, og
          alle endringer dokumenteres i changelog på{" "}
          <Link href="/blogg" className="text-[color:var(--primary)] underline">
            bloggen vår
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlige spørsmål</h2>
        <div className="mt-6">
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <section className="mt-12">
        <Card className="p-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl font-semibold">
              Velg en elbil - størst sparingseffekt.
            </h2>
            <p className="mt-2 text-[color:var(--muted)]">
              Elbiler genererer ca. 1/7 av utslippet til en bensin-SUV per km.
              Filtrer markedet på elbil for maksimal effekt.
            </p>
          </div>
          <div className="flex md:justify-end">
            <LinkButton href="/biler?fuelType=electric">Se elbiler</LinkButton>
          </div>
        </Card>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Miljø", url: "/miljo" },
          ]),
          articleSchema({
            headline: "Vår klimaeffekt og CO₂-metode",
            description:
              "Slik regner FreeRider.no CO₂-besparing per relokering.",
            url: "/miljo",
            datePublished: "2026-01-01",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
