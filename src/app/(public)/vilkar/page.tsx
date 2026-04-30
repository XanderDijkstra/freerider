import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Vilkår",
  description:
    "Brukervilkår for FreeRider.no - sjåfører, utleiere og plattform.",
  alternates: { canonical: "/vilkar" },
};

export default function VilkarPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Vilkår" }]} />
      <article className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Brukervilkår
        </h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Sist oppdatert: 30. april 2026
        </p>

        <section className="mt-8 space-y-4 text-[color:var(--foreground)]">
          <h2 className="font-heading text-xl font-semibold">1. Plattform</h2>
          <p>
            FreeRider.no er en markedsplass som kobler bilutleiere med
            sjåfører for å flytte biler mellom utleiestasjoner. Vi er ikke en
            part i selve leieavtalen.
          </p>

          <h2 className="font-heading text-xl font-semibold">2. Sjåfør-konto</h2>
          <p>
            Du må være minst 21 år, ha gyldig sertifikat klasse B, og ikke ha
            vesentlige merknader i førerkortregisteret. Vi kan be om dokumentasjon.
          </p>

          <h2 className="font-heading text-xl font-semibold">3. Utleier-konto</h2>
          <p>
            Bare registrerte utleieselskap med gyldig org.nummer kan registrere
            utleier-konto. Vi godkjenner manuelt før første publisering.
          </p>

          <h2 className="font-heading text-xl font-semibold">4. Forsikring</h2>
          <p>
            Bilen er forsikret av utleieren. Sjåføren har samme egenandel som en
            vanlig leiebil-kunde. Brudd på reglene (alder, alkohol, manglende
            sertifikat) kan kansellere forsikringen.
          </p>

          <h2 className="font-heading text-xl font-semibold">5. Avbestilling</h2>
          <p>
            Sjåfør kan kansellere frem til 24 t før opphenting uten gebyr. Etter
            det kan utleieren kreve en liten kompensasjon for dekket kostnader.
          </p>

          <h2 className="font-heading text-xl font-semibold">6. Forsinkelser</h2>
          <p>
            Forsinkelser over 6 t uten kommunikasjon kan gi sperre av kontoen.
            Vesentlige overskridelser kan medføre gebyr.
          </p>

          <h2 className="font-heading text-xl font-semibold">7. Ansvar</h2>
          <p>
            FreeRider er ikke ansvarlig for skader, tap eller forsinkelser som
            oppstår i selve leieforholdet. Vi formidler bare kontakt.
          </p>

          <h2 className="font-heading text-xl font-semibold">8. Lov og verneting</h2>
          <p>
            Norsk rett gjelder. Tvister blir behandlet ved Oslo tingrett.
          </p>
        </section>
      </article>
    </Container>
  );
}
