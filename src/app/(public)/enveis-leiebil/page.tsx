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
  title: "Enveis leiebil - slik slipper du enveisgebyret",
  description:
    "Leiebil kun én vei koster ofte ekstra. Her er hvorfor enveisleie er dyrt, og hvordan du kan kjøre en leiebil én vei billig eller helt gratis.",
  alternates: { canonical: "/enveis-leiebil" },
};

const FAQ = [
  {
    q: "Hvorfor er enveis leiebil så dyrt?",
    a: "Når du leverer bilen i en annen by, må utleieren få bilen tilbake. Den kostnaden legges ofte på deg som et enveisgebyr, i tillegg til vanlig leie.",
  },
  {
    q: "Kan jeg leie bil kun én vei uten gebyr?",
    a: "Noen ganger. Hvis utleieren trenger bilen i byen du skal til, kan gebyret være lavt eller borte. Og når de trenger bilen flyttet, kan du ofte kjøre den helt gratis.",
  },
  {
    q: "Hva er forskjellen på enveisleie og relokering?",
    a: "Ved enveisleie er det du som velger rute og dato, og du betaler. Ved relokering er det utleieren som trenger bilen flyttet, og du kjører gratis - men på deres rute og innenfor deres frist.",
  },
];

export default function EnveisLeiebilPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Enveis leiebil" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Enveis leiebil
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Skal du bare én vei, for eksempel fra Oslo til Trondheim? Da kan
          leiebilen bli dyr, fordi utleieren tar betalt for å få bilen tilbake.
          Her er hvordan du kan gjøre det billigere - eller gratis.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Hva er enveisgebyr?
        </h2>
        <p>
          De fleste utleiere tar et ekstra gebyr når du leverer bilen et annet
          sted enn du hentet den. Gebyret skal dekke at noen må kjøre bilen
          tilbake. Hvor stort det er, avhenger av utleier, strekning og sesong.
          Se også{" "}
          <Link className="text-[color:var(--primary)] underline" href="/ordliste/einveisleie">
            enveisleie i ordlisten
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Slik blir enveis leiebil billigere
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[color:var(--foreground)]">Sammenlign utleiere.</strong>{" "}
            Enveisgebyret varierer mye, så sjekk flere før du bestiller.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Kjør motsatt vei av strømmen.</strong>{" "}
            Skal du dit bilene mangler, kan gebyret være lavere.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Vær fleksibel på dato.</strong>{" "}
            Utenfor høysesong er både leie og gebyr ofte lavere.
          </li>
          <li>
            <strong className="text-[color:var(--foreground)]">Kjør en bil som skal flyttes.</strong>{" "}
            Når utleieren selv trenger bilen dit du skal, kan du kjøre den
            gratis. Det kalles{" "}
            <Link className="text-[color:var(--primary)] underline" href="/gratis-leiebil">
              gratis leiebil
            </Link>
            .
          </li>
        </ul>
        <p>
          Se{" "}
          <Link className="text-[color:var(--primary)] underline" href="/kjore-bil-gratis">
            populære strekninger der du kan kjøre gratis
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
        title="Skal du én vei? Kjør gratis i stedet"
        body="Registrer deg som sjåfør, så varsler vi deg når en bil skal samme vei som deg."
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Enveis leiebil", url: "/enveis-leiebil" },
          ]),
          articleSchema({
            headline: "Enveis leiebil - slik slipper du enveisgebyret",
            description: metadata.description as string,
            url: "/enveis-leiebil",
            datePublished: "2026-10-20",
          }),
          faqSchema(FAQ),
        ]}
      />
    </Container>
  );
}
