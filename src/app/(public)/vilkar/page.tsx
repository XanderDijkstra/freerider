import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Vilkår",
  description:
    "Brukarvilkår for FreeRider.no — sjåførar, utleigarar og plattform.",
  alternates: { canonical: "/vilkar" },
};

export default function VilkarPage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Vilkår" }]} />
      <article className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Brukarvilkår
        </h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Sist oppdatert: 30. april 2026
        </p>

        <section className="mt-8 space-y-4 text-[color:var(--foreground)]">
          <h2 className="font-heading text-xl font-semibold">1. Plattform</h2>
          <p>
            FreeRider.no er ein marknadsplass som koblar bilutleigarar med
            sjåførar for å flytte bilar mellom utleigestasjonar. Vi er ikkje ein
            part i sjølve leigeavtalen.
          </p>

          <h2 className="font-heading text-xl font-semibold">2. Sjåfør-konto</h2>
          <p>
            Du må vere minst 21 år, ha gyldig sertifikat klasse B, og ikkje ha
            vesentlege merknader i førarkortregisteret. Vi kan be om dokumentasjon.
          </p>

          <h2 className="font-heading text-xl font-semibold">3. Utleigar-konto</h2>
          <p>
            Berre registrerte utleigeselskap med gyldig org.nummer kan registrere
            utleigar-konto. Vi godkjenner manuelt før første publisering.
          </p>

          <h2 className="font-heading text-xl font-semibold">4. Forsikring</h2>
          <p>
            Bilen er forsikra av utleigaren. Sjåføren har same eigendel som ein
            vanleg leigebil-kunde. Brot på reglane (alder, alkohol, manglande
            sertifikat) kan kansellere forsikringa.
          </p>

          <h2 className="font-heading text-xl font-semibold">5. Avbestilling</h2>
          <p>
            Sjåfør kan kansellere fram til 24 t før opphenting utan gebyr. Etter
            det kan utleigaren krevje ein liten kompensasjon for dekka kostnader.
          </p>

          <h2 className="font-heading text-xl font-semibold">6. Forseinkingar</h2>
          <p>
            Forseinkingar over 6 t utan kommunikasjon kan gi sperre av kontoen.
            Vesentlege overskridingar kan medføre gebyr.
          </p>

          <h2 className="font-heading text-xl font-semibold">7. Ansvar</h2>
          <p>
            FreeRider er ikkje ansvarleg for skader, tap eller forseinkingar som
            oppstår i sjølve leigeforholdet. Vi formidlar berre kontakt.
          </p>

          <h2 className="font-heading text-xl font-semibold">8. Lov og verneting</h2>
          <p>
            Norsk rett gjeld. Tvistar blir handsama ved Oslo tingrett.
          </p>
        </section>
      </article>
    </Container>
  );
}
