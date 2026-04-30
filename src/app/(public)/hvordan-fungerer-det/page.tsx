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
    "Lær korleis du finn, søkjer på og køyrer ein gratis relokeringsbil. Forsikring, drivstoff, ferjer — alt forklart.",
  alternates: { canonical: "/hvordan-fungerer-det" },
};

const FAQ = [
  {
    q: "Korleis finn eg ein relokeringsbil?",
    a: "Gå til Ledige biler, filtrer på rute eller dato, og søk på dei oppdraga som passar deg.",
  },
  {
    q: "Kor lang tid tek det å bli godkjent?",
    a: "Utleiarar svarar typisk innan 6 timar. Populære oppdrag blir tildelt på minutt.",
  },
  {
    q: "Kva med drivstoff og lading?",
    a: "Det varierer per oppdrag. Annonsen seier alltid om utleigaren dekker drivstoff/lading, eller om du leverer som motteke.",
  },
  {
    q: "Kva med ferjer og bompengar?",
    a: "Annonsen seier eksplisitt kva som er dekka. Mange lange oppdrag dekkjer både ferje og bom — det står i 'Reglar for turen'.",
  },
  {
    q: "Kva forsikring gjeld?",
    a: "Bilen er forsikra av utleigaren under heile turen. Du følgjer same vilkår som ein vanleg leigebil-kunde.",
  },
  {
    q: "Kva om bilen får skade?",
    a: "Meld umiddelbart til utleigaren og lag ein politirapport om naudsynt. Eigendel gjeld som på vanleg leige.",
  },
  {
    q: "Kva med alder og sertifikat?",
    a: "Vanleg minimumsalder er 21–23 år. Premium-bilar krev ofte 25 år. Annonsen viser krava.",
  },
  {
    q: "Kva om eg ikkje rekk leveringa?",
    a: "Sei frå så snart som mogleg. Mindre forseinkingar er greie. Store overskridingar kan gi gebyr eller sperre.",
  },
  {
    q: "Kostar det meg noko?",
    a: "Som utgangspunkt nei. Mange oppdrag er heilt gratis, andre dekkjer drivstoff og bom, og nokre gir flatt honorar.",
  },
  {
    q: "Kan eg ta med passasjerar?",
    a: "Ja, med mindre annonsen seier noko anna. Passasjerar er dekka av forsikringa på lik linje med deg.",
  },
];

const DRIVER_STEPS = [
  {
    title: "Lag konto",
    body: "Registrer deg som sjåfør med namn, telefon og førarkortnummer. Sjåfør-konto blir auto-godkjent etter e-post-stadfesting.",
  },
  {
    title: "Søk i marknaden",
    body: "Filtrer på frå-by, til-by, dato og biltype. Du ser CO₂-besparing per oppdrag.",
  },
  {
    title: "Søk om bilen",
    body: "Klikk 'Søk om denne bilen', vel ønska opphentings­tidspunkt og send inn. Du får svar via e-post og SMS.",
  },
  {
    title: "Hent og kjør",
    body: "Møt opp på stasjonen til avtalt tid med førarkort og betalingskort (kun for deposit). Sjekk inn med stasjonen, kjør strekninga, og ver innanfor kilometergrensa.",
  },
  {
    title: "Lever bilen",
    body: "Lever til avtalt stasjon før fristen. Stasjonen sjekkar bilen og bekreftar — du er ferdig.",
  },
];

const COMPANY_STEPS = [
  {
    title: "Søk om utleigar-konto",
    body: "Registrer firma med org.nummer. Vi godkjenner kontoen manuelt for å sikre kvalitet.",
  },
  {
    title: "Legg inn flåten",
    body: "Registrer dei bilane du vil kunne relokere — med foto, spesifikasjonar og tilstand.",
  },
  {
    title: "Publiser annonse",
    body: "Vel bil, sett rute og dato, definer reglar (drivstoff, ferje, kompensasjon) og publiser.",
  },
  {
    title: "Godkjenn sjåfør",
    body: "Sjå søkjarar, vel den som passar best, og marker oppdraget som tildelt. Vi varsler alle.",
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
          Bilutleiarar har konstant skeiv flåtefordeling. FreeRider matchar dei
          bilane som må flyttast med sjåførar som vil reise gratis. Alle vinn.
        </p>
      </header>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Kvifor finst relokering?</h2>
        <p className="mt-3 text-[color:var(--muted)]">
          Reisemønsteret er asymmetrisk. Folk leiger ofte éin veg — t.d. Oslo-Bergen i
          august, Bergen-Oslo i september. Bilane hopar seg opp i éin ende, og må flyttast
          tilbake. Tradisjonelt har det vore ein dyr, klimaversinkande operasjon med
          tilsette som køyrer og flyg attende. Vi kuttar mellomlekka.
        </p>
        <p className="mt-3 text-[color:var(--muted)]">
          Sjå{" "}
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
          i ordlista for ei djupare forklaring.
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
        <h2 className="font-heading text-2xl font-semibold">For utleigarar</h2>
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
            Les meir for utleigarar
          </LinkButton>
        </div>
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Forsikring og ansvar</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Bilen er forsikra av utleigaren. Du får same vilkår som ein vanleg
            leigebil-kunde — inkludert eigendel ved skade.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Kva om turen ikkje går?</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Sei frå så tidleg som mogleg. Vi finn ein ny sjåfør, eller utleigaren
            tek bilen tilbake. Du får ikkje gebyr for å seie frå i god tid.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-heading text-lg font-semibold">Når passar det ikkje?</h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Dersom du må stoppe lenge, skal langt ut av rute, eller ikkje rekk
            fristen — då er ein vanleg leigebil betre. Vi er ærlege om det.
          </p>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold">Vanlege spørsmål</h2>
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
              Filtrer på ruta du vil reise. Du finn truleg ein bil i dag.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <LinkButton href="/biler">Sjå ledige biler</LinkButton>
          </div>
        </Card>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Heim", url: "/" },
            { name: "Slik fungerer det", url: "/hvordan-fungerer-det" },
          ]),
          articleSchema({
            headline: "Slik fungerer FreeRider.no",
            description:
              "Lær korleis du finn, søkjer på og køyrer ein gratis relokeringsbil.",
            url: "/hvordan-fungerer-det",
            datePublished: "2026-01-01",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
