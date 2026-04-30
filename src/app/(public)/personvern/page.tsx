import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Slik handterer FreeRider.no personopplysningar. GDPR-følgjande retningslinjer.",
  alternates: { canonical: "/personvern" },
};

export default function PersonvernPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Personvern" }]} />
      <article className="mt-3 max-w-3xl prose-content">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Personvern
        </h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Sist oppdatert: 30. april 2026
        </p>

        <section className="mt-8 space-y-4 text-[color:var(--foreground)]">
          <h2 className="font-heading text-xl font-semibold">Behandlingsansvarlig</h2>
          <p>
            FreeRider AS, Storgata 1, 0155 Oslo, org.nr 000 000 000, er behandlingsansvarlig
            for personopplysningene vi samler inn på FreeRider.nå.
          </p>

          <h2 className="font-heading text-xl font-semibold">Hva vi samler inn</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Konto-data: navn, e-post, telefon, førerkortnummer.</li>
            <li>Bruksdata: oppdrag du søker på, utleiere du følger, varsel-preferanser.</li>
            <li>Tekniske data: IP-adresse, nettlesar, plattform — for tryggleik og diagnose.</li>
          </ul>

          <h2 className="font-heading text-xl font-semibold">Hvordan vi bruker data</h2>
          <p>
            Vi bruker dataene til å levere tjenesten, formidle oppdrag, sende varsel,
            og oppfylle juridiske krav (forsikring, KYC for utleiere). Vi sel aldri data
            til tredjepart.
          </p>

          <h2 className="font-heading text-xl font-semibold">Dine rettar</h2>
          <p>
            Du kan be om innsyn, retting, sletting eller dataportabilitet. Ta kontakt på
            personvern@freerider.nå.
          </p>

          <h2 className="font-heading text-xl font-semibold">Cookies</h2>
          <p>
            Vi bruker bare nødvendige cookies som standard. Analytiske cookies krever
            samtykke (banner ved første besøk).
          </p>
        </section>
      </article>
    </Container>
  );
}
