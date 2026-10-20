import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { SignupCta } from "@/components/SignupCta";
import { PreferredSourceCard } from "@/components/PreferredSourceButton";
import { seoCities } from "@/data/seoPages";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gratis leiebil i Norge - slik får du det",
  description:
    "Ja, du kan få leiebil gratis. Utleiere trenger biler flyttet mellom byene, og du får kjøre gratis. Slik fungerer det, og hva du må vite før du kjører.",
  alternates: { canonical: "/gratis-leiebil" },
};

const FAQ = [
  {
    q: "Er det mulig å få leiebil helt gratis?",
    a: "Ja. Når en utleier har for mange biler i én by og for få i en annen, er det billigere for dem å la deg kjøre bilen gratis enn å sende en ansatt. Du betaler ikke leie, men må levere bilen innen en frist.",
  },
  {
    q: "Hva er haken?",
    a: "Du kan ikke velge rute eller dato fritt. Du må kjøre den strekningen utleieren trenger, innen en bestemt tidsramme og med en kilometergrense. Drivstoff, bom og ferje er ikke alltid dekket.",
  },
  {
    q: "Kan jeg få gratis leiebil retur?",
    a: "Ja, det er nettopp det dette er: bilen skal tilbake dit utleieren trenger den. Du får en gratis tur én vei, og må selv finne transport videre eller hjem.",
  },
  {
    q: "Må jeg betale depositum?",
    a: "Ofte ja. Mange utleiere reserverer et depositum på kredittkortet, slik som ved vanlig leie. Det frigis når bilen er levert uten skader.",
  },
  {
    q: "Hvem kan kjøre?",
    a: "Du trenger gyldig førerkort, og de fleste utleiere har en minstealder. Kravene står i hvert oppdrag.",
  },
];

export default function GratisLeiebilPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Gratis leiebil" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Gratis leiebil i Norge
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Utleiere må hele tiden flytte biler dit kundene er. I stedet for å
          sende en ansatt, lar de deg kjøre bilen - gratis. Du får en biltur,
          de får bilen dit den skal.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Hvorfor gir noen bort leiebil gratis?
        </h2>
        <p>
          Folk leier ofte bil én vei. De henter bilen i Oslo og leverer den i
          Bergen, eller flyr til Tromsø og leverer bilen i Bodø. Etter en stund
          står det for mange biler i én by og for få i en annen.
        </p>
        <p>
          Å sende en ansatt for å kjøre bilen tilbake koster lønn, drivstoff og
          en flybillett hjem. Å la en privat sjåfør kjøre bilen gratis er
          billigere for utleieren - og gir deg en gratis tur. Dette kalles{" "}
          <Link className="text-[color:var(--primary)] underline" href="/ordliste/relokering">
            relokering
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Dette må du vite før du kjører
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[color:var(--foreground)]">Fast rute og frist.</strong>{" "}
            Du henter og leverer på bestemte stasjoner innen en tidsramme.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Kilometergrense.</strong>{" "}
            Du kan ta små omveier, men ikke kjøre fritt rundt.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Kostnader varierer.</strong>{" "}
            Noen oppdrag dekker drivstoff, bom og ferje. Andre gjør det ikke. Sjekk
            alltid vilkårene.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Én vei.</strong>{" "}
            Du må selv komme deg videre fra der du leverer bilen.
          </li>
        </ul>
        <p>
          Planlegger du en tur der du uansett skal én vei? Les også om{" "}
          <Link className="text-[color:var(--primary)] underline" href="/enveis-leiebil">
            enveis leiebil
          </Link>{" "}
          og hvordan du slipper enveisgebyret.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">
          Gratis leiebil fra din by
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seoCities.map((c) => (
            <Link key={c.slug} href={`/gratis-leiebil/${c.slug}`}>
              <Card className="p-5 h-full hover:border-[color:var(--primary)]">
                <p className="font-medium">Gratis leiebil {c.name}</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{c.airport}</p>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Vil du se konkrete strekninger? Se{" "}
          <Link className="text-[color:var(--primary)] underline" href="/kjore-bil-gratis">
            kjør bil gratis mellom byene
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
        title="Få beskjed når det kommer gratis leiebiler"
        body="Registrer deg som sjåfør, så varsler vi deg når utleiere legger ut biler på strekningene du er interessert i."
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Gratis leiebil", url: "/gratis-leiebil" },
          ]),
          articleSchema({
            headline: "Gratis leiebil i Norge",
            description: metadata.description as string,
            url: "/gratis-leiebil",
            datePublished: "2026-10-20",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
