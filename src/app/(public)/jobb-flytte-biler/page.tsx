import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { SignupCta } from "@/components/SignupCta";
import { PreferredSourceCard } from "@/components/PreferredSourceButton";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jobb med å flytte biler - hva finnes, og hva betyr det?",
  description:
    "Vil du flytte biler som jobb eller ekstrajobb? Her er forskjellen på betalt bilflytting og gratis relokering, og hvordan du kommer i gang.",
  alternates: { canonical: "/jobb-flytte-biler" },
};

const FAQ = [
  {
    q: "Får jeg lønn for å flytte biler via FreeRider?",
    a: "Nei, som regel ikke. Du kjører en leiebil gratis til en by du uansett skal til. Enkelte oppdrag kan dekke drivstoff, bom og ferje, eller gi et lite honorar, men det er ikke en jobb.",
  },
  {
    q: "Hvem ansetter folk til å flytte biler?",
    a: "Bilutleiere, bilforhandlere og transportfirmaer ansetter ofte sjåfører, gjerne på timebasis eller som tilkallingsvakt. Se etter stillinger som bilflytter, sjåfør eller bilklargjører.",
  },
  {
    q: "Hva trenger jeg for å flytte biler?",
    a: "Gyldig førerkort klasse B er nok for vanlige personbiler. Mange krever noen års kjøreerfaring og en minstealder.",
  },
];

export default function JobbFlytteBilerPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Jobb med å flytte biler" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Jobb med å flytte biler
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Det finnes to måter å flytte biler på: som betalt jobb, eller som
          sjåfør som kjører gratis fordi du uansett skal samme vei. Her er
          forskjellen.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Betalt bilflytting
        </h2>
        <p>
          Bilutleiere, bilforhandlere og transportfirmaer trenger folk som
          flytter biler mellom stasjoner, verksteder og kunder. Det er ofte
          deltid eller tilkalling, og passer for pensjonister, studenter og
          andre som vil ha en fleksibel ekstrajobb. Søk etter stillinger som
          bilflytter, sjåfør eller bilklargjører.
        </p>
      </section>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Gratis relokering
        </h2>
        <p>
          På FreeRider.no får du ikke lønn. Du får kjøre en leiebil gratis fra
          én by til en annen, når utleieren trenger bilen der. Det passer når
          du uansett skal reise, og vil spare togbillett, flybillett eller
          leie.
        </p>
        <p>
          Les mer om{" "}
          <Link className="text-[color:var(--primary)] underline" href="/gratis-leiebil">
            gratis leiebil
          </Link>{" "}
          eller se{" "}
          <Link className="text-[color:var(--primary)] underline" href="/kjore-bil-gratis">
            strekninger der du kan kjøre gratis
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlige spørsmål</h2>
        <div className="mt-4">
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <SignupCta
        title="Vil du kjøre gratis neste gang du reiser?"
        body="Registrer deg som sjåfør, så sier vi fra når en bil skal samme vei som deg."
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Jobb med å flytte biler", url: "/jobb-flytte-biler" },
          ]),
          articleSchema({
            headline: "Jobb med å flytte biler",
            description: metadata.description as string,
            url: "/jobb-flytte-biler",
            datePublished: "2026-10-20",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
