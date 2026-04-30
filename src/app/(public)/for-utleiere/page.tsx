import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bilflytting for utleiere — spar opptil 70 %",
  description:
    "Reduser kostnaden ved relokering. Publiser ledige biler på FreeRider.no og få sjåfører som flyttar bilen for deg. Lågare kostnad, lågare CO₂.",
  alternates: { canonical: "/for-utleiere" },
};

const FAQ = [
  {
    q: "Kor mykje kostar plattforma?",
    a: "Starter er gratis i MVP-fasen. Pro og Enterprise blir tilgjengeleg seinare i 2026 med fleire funksjonar (bulk-import, API, prioriterte annonsar).",
  },
  {
    q: "Korleis blir vår konto godkjent?",
    a: "Vi sjekkar org.nummeret i Brønnøysundregisteret og bekreftar via fysisk adresse. Tek 1–2 yrkesdagar.",
  },
  {
    q: "Kva om sjåføren ikkje møter opp?",
    a: "Annonsen blir reaktivert automatisk. Vi blokkerer sjåførar som hyppig ikkje møter opp.",
  },
  {
    q: "Korleis fungerer forsikring?",
    a: "Bilen er forsikra av dykk på vanleg vis. Vi krev at sjåføren har gyldig sertifikat og at han/ho oppfyller annonsens alderskrav.",
  },
  {
    q: "Kan vi koble eksisterande system mot FreeRider?",
    a: "API kjem i Phase 2. I dag legg de inn flåten manuelt eller via CSV-import (kjem i Q3 2026).",
  },
];

const PROBLEMS = [
  {
    title: "Lønn og fly",
    body: "Ein staff-relokering Oslo–Bergen kostar 2 400 kr i lønn pluss ~1 500 kr i returflybillett. På 1 000 oppdrag i året er det 3,9 mill kr.",
  },
  {
    title: "Mistar dagar i flåten",
    body: "Bilen som blir relokert står ofte stille i påvente av at staff kjem fram, og staff er låst i nokre timar undervegs. Det stel utleigedagar.",
  },
  {
    title: "CO₂ og rapportering",
    body: "Større kundar krev no Scope 3-rapportering på leverandørane. Ein staff-relokering med returfly genererer ca. 200 kg CO₂ per oppdrag.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Gratis",
    detail: "i MVP-fasen",
    features: [
      "Inntil 10 aktive annonsar",
      "Manuelle annonseopprettelser",
      "E-post-varsling til sjåførar",
    ],
    cta: "Start gratis",
  },
  {
    name: "Pro",
    price: "Snart",
    detail: "kjem 2026",
    features: [
      "Ubegrenset annonsar",
      "CSV-import av flåte",
      "SMS-varsling til sjåførar",
      "Prioritert plassering i marknad",
    ],
    cta: "Få beskjed",
  },
  {
    name: "Enterprise",
    price: "Snart",
    detail: "kjem 2026",
    features: [
      "API-integrasjon mot fleet management",
      "SLA og dedikert kontaktperson",
      "White-label varslar",
      "CO₂-rapportering for Scope 3",
    ],
    cta: "Bestill demo",
  },
];

export default function ForUtleierePage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "For utleiere" }]} />
      <header className="mt-3 max-w-3xl">
        <Badge tone="eco">For bilutleiarar</Badge>
        <h1 className="mt-3 font-heading text-3xl md:text-5xl font-semibold">
          Spar opptil 70 % på bilflytting.
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Erstatt staff-relokeringar med freerider-sjåførar. Lågare kostnad,
          ingen returflybillett, raskare omløp i flåten — og full kontroll over
          kven som tek bilen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/kontakt" size="lg">
            Bestill demo
          </LinkButton>
          <LinkButton href="/registrer?role=company" size="lg" variant="secondary">
            Lag konto sjølv
          </LinkButton>
        </div>
      </header>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Problemet</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {PROBLEMS.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Slik løyser vi det</h2>
          <p className="mt-3 text-[color:var(--muted)]">
            FreeRider er ein open marknad. Du legg ut bilen, definerer reglane,
            og vel ein sjåfør frå dei som søkjer. Ingen lønn, ingen flybillett,
            ingen returkøyring.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Plug-and-play — ingen integrasjon nødvendig for å starte.",
              "Du behaldar full kontroll: vel sjåfør, vel reglar, vel kompensasjon.",
              "Innebygd CO₂-rapport per oppdrag for Scope 3-rapporteringa.",
              "Forsikring og ansvar går som ein vanleg leige.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-[color:var(--success)] mt-0.5 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <ROICalculator />
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Pris</h2>
        <p className="mt-2 text-[color:var(--muted)] max-w-2xl">
          MVP-perioden er gratis. Vi kjem til å introdusere betalte tier seinare i
          2026 for funksjonar utover det grunnleggjande.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {PRICING.map((p, idx) => (
            <Card key={p.name} className={`p-6 ${idx === 1 ? "border-[color:var(--primary)]" : ""}`}>
              <h3 className="font-heading text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 font-heading text-3xl font-semibold text-[color:var(--primary)]">
                {p.price}
              </p>
              <p className="text-xs text-[color:var(--muted)] mt-1">{p.detail}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5 shrink-0" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <LinkButton
                href="/kontakt"
                variant={idx === 1 ? "primary" : "secondary"}
                className="w-full mt-6"
              >
                {p.cta}
              </LinkButton>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlege spørsmål</h2>
        <div className="mt-6">
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <section className="mt-14">
        <Card className="p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">
              30 minuttars demo. Null forplikting.
            </h2>
            <p className="mt-2 text-[color:var(--muted)]">
              Vi viser deg admin-panelet, går gjennom CO₂-modellen, og viser
              kostnadsmodellering for di flåte.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <LinkButton href="/kontakt">Bestill demo</LinkButton>
          </div>
        </Card>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Heim", url: "/" },
            { name: "For utleiere", url: "/for-utleiere" },
          ]),
          faqSchema(FAQ),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "FreeRider for utleiere",
            url: absoluteUrl("/for-utleiere"),
            provider: { "@type": "Organization", name: "FreeRider.no" },
            serviceType: "Bilflytting / fleet relocation",
            areaServed: "Norge",
          },
        ]}
      />
    </Container>
  );
}

function ROICalculator() {
  return (
    <Card className="p-6 bg-[color:var(--accent)]/30 border-[color:var(--accent)]">
      <h3 className="font-heading text-lg font-semibold">Eksempel: 100 oppdrag/mnd</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Snittdistanse" value="450 km" />
        <Row label="Staff-kostnad i dag" value="3 900 kr / oppdrag" />
        <Row label="Med FreeRider" value="1 200 kr / oppdrag" />
        <Row
          label="Estimert månadleg sparing"
          value="270 000 kr"
          highlight
        />
        <Row label="CO₂-reduksjon per år" value="216 tonn" />
      </dl>
      <p className="mt-3 text-xs text-[color:var(--muted)]">
        Eksempelet er illustrerande. Ein detaljert ROI-modell går vi gjennom i
        demoen basert på din flåte.
      </p>
    </Card>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[color:var(--border)] pb-2 last:border-b-0">
      <dt className="text-[color:var(--muted)]">{label}</dt>
      <dd
        className={`font-medium ${highlight ? "text-[color:var(--primary)] text-lg" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
