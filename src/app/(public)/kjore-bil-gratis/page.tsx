import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { SignupCta } from "@/components/SignupCta";
import { PreferredSourceCard } from "@/components/PreferredSourceButton";
import { cityName, formatHours, seoRoutes } from "@/data/seoPages";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kjøre bil gratis mellom byene i Norge",
  description:
    "Kjør bil gratis fra Oslo til Bergen, Trondheim, Stavanger og flere byer. Utleiere trenger sjåfører til å flytte biler - slik fungerer det.",
  alternates: { canonical: "/kjore-bil-gratis" },
};

const FAQ = [
  {
    q: "Hvordan kan jeg kjøre bil gratis fra Oslo til Bergen?",
    a: "Når en utleier trenger en bil flyttet fra Oslo til Bergen, kan du kjøre den uten å betale leie. Registrer deg og få varsel når strekningen blir ledig.",
  },
  {
    q: "Får jeg betalt for å kjøre?",
    a: "Som regel ikke. Du får en gratis tur, og noen ganger dekket drivstoff, bom eller ferje. Enkelte oppdrag kan gi et lite honorar, men det er unntaket.",
  },
  {
    q: "Kan jeg ta med venner eller familie?",
    a: "Det er ofte lov, men det avgjøres av utleieren. Sjekk vilkårene i oppdraget.",
  },
  {
    q: "Hvor lang tid har jeg på meg?",
    a: "Det varierer. Korte strekninger har ofte en frist på ett døgn, lange strekninger gjerne to til tre dager.",
  },
];

export default function KjoreBilGratisPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Kjøre bil gratis" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Kjøre bil gratis mellom byene
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Skal du likevel fra Oslo til Bergen, eller fra Bodø til Tromsø? Da
          kan du kanskje kjøre en leiebil som skal samme vei - uten å betale
          leie.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Slik fungerer det
        </h2>
        <p>
          Bilutleiere har ofte for mange biler i én by og for få i en annen.
          Når en bil må flyttes, kan en privat sjåfør kjøre den. Du betaler ikke
          leie, og utleieren slipper å sende en ansatt. Les mer om{" "}
          <Link className="text-[color:var(--primary)] underline" href="/gratis-leiebil">
            gratis leiebil
          </Link>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">Populære strekninger</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seoRoutes.map((r) => (
            <Link key={r.slug} href={`/kjore-bil-gratis/${r.slug}`}>
              <Card className="p-5 h-full hover:border-[color:var(--primary)]">
                <p className="font-medium">
                  Kjør bil gratis {cityName(r.from)} – {cityName(r.to)}
                </p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  {r.distanceKm} km · {formatHours(r.driveHours)}
                  {r.ferry ? " · ferje" : ""}
                </p>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Avstand og kjøretid er omtrentlige, uten pauser, basert på
          OpenStreetMap.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlige spørsmål</h2>
        <div className="mt-4">
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <SignupCta
        title="Få varsel om strekningen din"
        body="Registrer deg som sjåfør og velg byene du reiser mellom. Vi sier fra når en bil skal samme vei."
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Kjøre bil gratis", url: "/kjore-bil-gratis" },
          ]),
          articleSchema({
            headline: "Kjøre bil gratis mellom byene i Norge",
            description: metadata.description as string,
            url: "/kjore-bil-gratis",
            datePublished: "2026-10-20",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
