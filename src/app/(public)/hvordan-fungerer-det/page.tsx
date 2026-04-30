import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Slik fungerer FreeRider.no",
  description:
    "Lær hvordan du finner, søker på og kjører en gratis relokeringsbil. Forsikring, drivstoff, ferger — alt forklart.",
  alternates: { canonical: "/hvordan-fungerer-det" },
};

const FAQ = [
  {
    q: "Hvordan finner jeg en relokeringsbil?",
    a: "Gå til Ledige biler, filtrer på rute eller dato, og søk på de oppdragene som passer deg.",
  },
  {
    q: "Hvor lang tid tar det å bli godkjent?",
    a: "Utleiere svarer typisk innen 6 timer. Populære oppdrag blir tildelt på minutter.",
  },
  {
    q: "Hva med drivstoff og lading?",
    a: "Det varierer per oppdrag. Annonsen sier alltid om utleieren dekker drivstoff og lading, eller om du leverer som mottatt.",
  },
  {
    q: "Hva med ferger og bompenger?",
    a: "Annonsen sier eksplisitt hva som er dekket. Mange lange oppdrag dekker både ferje og bom — det står i 'Regler for turen'.",
  },
  {
    q: "Hvilken forsikring gjelder?",
    a: "Bilen er forsikret av utleieren under hele turen. Du følger samme vilkår som en vanlig leiebil-kunde.",
  },
  {
    q: "Hva om bilen får skade?",
    a: "Meld umiddelbart til utleieren og lag en politirapport om nødvendig. Egenandel gjelder som på vanlig leie.",
  },
  {
    q: "Hva med alder og sertifikat?",
    a: "Vanlig minimumsalder er 21–23 år. Premium-biler krever ofte 25 år. Annonsen viser kravene.",
  },
  {
    q: "Hva om jeg ikke rekker leveringen?",
    a: "Si fra så snart som mulig. Mindre forsinkelser er greit. Store overskridelser kan gi gebyr eller sperre.",
  },
  {
    q: "Koster det meg noe?",
    a: "Som utgangspunkt nei. Mange oppdrag er helt gratis, andre dekker drivstoff og bom, og noen gir flatt honorar.",
  },
  {
    q: "Kan jeg ta med passasjerer?",
    a: "Ja, med mindre annonsen sier noe annet. Passasjerer er dekket av forsikringen på lik linje med deg.",
  },
];

const DRIVER_STEPS = [
  {
    title: "Lag konto",
    body: "Registrer deg som sjåfør med navn, telefon og førerkortnummer. Sjåfør-kontoen blir auto-godkjent etter e-post-bekreftelse.",
  },
  {
    title: "Søk i markedet",
    body: "Filtrer på fra-by, til-by, dato og biltype. Du ser CO₂-besparing per oppdrag.",
  },
  {
    title: "Søk om bilen",
    body: "Klikk 'Søk om denne bilen', velg ønsket opphentingstidspunkt og send inn. Du får svar via e-post og SMS.",
  },
  {
    title: "Hent og kjør",
    body: "Møt opp på stasjonen til avtalt tid med førerkort og betalingskort (kun for depositum). Sjekk inn med stasjonen, kjør strekningen, og hold deg innenfor kilometergrensen.",
  },
  {
    title: "Lever bilen",
    body: "Lever til avtalt stasjon før fristen. Stasjonen sjekker bilen og bekrefter — du er ferdig.",
  },
];

const COMPANY_STEPS = [
  {
    title: "Søk om utleier-konto",
    body: "Registrer firma med org.nummer. Vi godkjenner kontoen manuelt for å sikre kvalitet.",
  },
  {
    title: "Legg inn flåten",
    body: "Registrer de bilene du vil kunne relokere — med foto, spesifikasjoner og tilstand.",
  },
  {
    title: "Publiser annonse",
    body: "Velg bil, sett rute og dato, definer regler (drivstoff, ferje, kompensasjon) og publiser.",
  },
  {
    title: "Godkjenn sjåfør",
    body: "Se søkere, velg den som passer best, og marker oppdraget som tildelt. Vi varsler alle.",
  },
];

export default function HvordanFungererDet() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Slik fungerer det" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Slik fungerer FreeRider.no
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Bilutleiere har konstant skjev flåtefordeling. FreeRider matcher
          bilene som må flyttes med sjåfører som vil reise gratis. Alle vinner.
        </p>
      </header>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Hvorfor finnes relokering?</h2>
        <p className="mt-3 text-[color:var(--muted)]">
          Reisemønsteret er asymmetrisk. Folk leier ofte én vei — f.eks. Oslo–Bergen i
          august, Bergen–Oslo i september. Bilene hoper seg opp i én ende, og må flyttes
          tilbake. Tradisjonelt har det vært en dyr og klimaforverrende operasjon med
          ansatte som kjører og flyr tilbake. Vi kutter mellomleddet.
        </p>
        <p className="mt-3 text-[color:var(--muted)]">
          Se{" "}
          <Link className="text-[color:var(--primary)] underline" href="/ordliste/relokering">
            relokering
          </Link>
          ,{" "}
          <Link className="text-[color:var(--primary)] underline" href="/ordliste/einveisleie">
            einveisleie
          </Link>{" "}
          og{" "}
          <Link className="text-[color:var(--primary)] underline" href="/ordliste/flatebalansering">
            flåtebalansering
          </Link>{" "}
          i ordlisten for en dypere forklaring.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">For deg som sjåfør</h2>
        <ol className="mt-6 grid md:grid-cols-2 gap-4">
          {DRIVER_STEPS.map((step, idx) => (
            <Card key={step.title} className="p-5">
              <div className="text-xs font-semibold tracking-wider text-[color:var(--secondary)]">
                STEG {idx + 1}
              </div>
              <h3 className="mt-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{step.body}</p>
            </Card>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">For utleiere</h2>
        <ol className="mt-6 grid md:grid-cols-2 gap-4">
          {COMPANY_STEPS.map((step, idx) => (
            <Card key={step.title} className="p-5">
              <div className="text-xs font-semibold tracking-wider text-[color:var(--secondary)]">
                STEG {idx + 1}
              </div>
              <h3 className="mt-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{step.body}</p>
            </Card>
          ))}
        </ol>
        <div className="mt-6">
          <LinkButton href="/for-utleiere" variant="secondary">
            Les mer for utleiere
          </LinkButton>
        </div>
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Forsikring og ansvar</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Bilen er forsikret av utleieren. Du får samme vilkår som en vanlig
            leiebil-kunde — inkludert egenandel ved skade.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Hva om turen ikke går?</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Si fra så tidlig som mulig. Vi finner en ny sjåfør, eller utleieren
            tar bilen tilbake. Du får ikke gebyr for å si fra i god tid.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Når passer det ikke?</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Dersom du må stoppe lenge, skal langt ut av rute, eller ikke rekker
            fristen — da er en vanlig leiebil bedre. Vi er ærlige om det.
          </p>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlige spørsmål</h2>
        <div className="mt-6">
          <FAQAccordion items={FAQ} />
        </div>
      </section>

      <section className="mt-12">
        <Card className="p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold">
              Klar for første tur?
            </h2>
            <p className="mt-2 text-[color:var(--muted)]">
              Filtrer på ruten du vil reise. Du finner trolig en bil i dag.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <LinkButton href="/biler">Se ledige biler</LinkButton>
          </div>
        </Card>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Slik fungerer det", url: "/hvordan-fungerer-det" },
          ]),
          articleSchema({
            headline: "Slik fungerer FreeRider.no",
            description:
              "Lær hvordan du finner, søker på og kjører en gratis relokeringsbil.",
            url: "/hvordan-fungerer-det",
            datePublished: "2026-01-01",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
