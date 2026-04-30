import type { GlossaryEntry } from "./types";

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "relokering",
    term: "Relokering",
    short: "Flytting av leiebil mellom utleiestasjoner.",
    body: `Relokering er prosessen med å flytte en leiebil fra én stasjon til en annen, vanligvis fordi flåten er ute av balanse. Behovet kommer av asymmetrisk reise: kunder leier én vei uten å returnere bilen.

Relokering er den viktigste use casen for FreeRider-modellen.`,
    related: ["einveisleie", "flatebalansering", "freerider"],
  },
  {
    slug: "einveisleie",
    term: "Einveisleie",
    short: "Bilutleie der bilen blir levert på en annen stasjon enn der den ble hentet.",
    body: `Einveisleie er en kontraktstype der utleieren tillater at kunden leverer bilen på en annen stasjon. Det skaper fleksibilitet for kunden, men flåtebalanse-problemer for utleieren - siden bilen ikke automatisk kommer tilbake til startstasjonen.

Drop-off-gebyr blir ofte lagt på for å motivere bilen tilbake samme vei, eller for å dekke den senere relokeringskostnaden.`,
    related: ["relokering", "drop-off-gebyr", "flatebalansering"],
  },
  {
    slug: "flatebalansering",
    term: "Flåtebalansering",
    short: "Strategi for å holde leiebilflåten geografisk balansert.",
    body: `Flåtebalansering er det operasjonelle arbeidet utleiere gjør for å sikre at det er biler tilgjengelig der etterspørselen er. Det inkluderer prising, drop-off-gebyr, relokering og logistikk-planlegging.

På FreeRider.no er flåtebalansering hovedgrunnen til at oppdrag finnes.`,
    related: ["relokering", "einveisleie", "drop-off-gebyr"],
  },
  {
    slug: "drop-off-gebyr",
    term: "Drop-off-gebyr",
    short: "Tilleggsgebyr ved levering av bil på annen stasjon enn opphenting.",
    body: `Drop-off-gebyret er en tilleggspris som utleieren tar for einveisleie. Størrelsen varierer med distanse og hvor populær retningen er.

Når drop-off-gebyret er høyt nok, blir det ofte billigere for utleieren å publisere bilen som freerider og la en privat sjåfør gjøre jobben.`,
    related: ["einveisleie", "freerider", "flatebalansering"],
  },
  {
    slug: "freerider",
    term: "Freerider",
    short: "Sjåfør som flytter en leiebil for utleieren mot fri eller billig leie.",
    body: `En freerider er en privat sjåfør som tar på seg å flytte en leiebil mellom to stasjoner. I bytte får sjåføren bruke bilen gratis (eller med kompensasjon).

Modellen er en vinn-vinn: utleieren sparer logistikk-kostnad, sjåføren sparer reisekostnad, og CO₂-utslippet går ned vesentlig.`,
    related: ["relokering", "leiebil", "ev-rabatt"],
  },
  {
    slug: "leiebil",
    term: "Leiebil",
    short: "Bil leid for kortere periode, vanligvis fra utleieselskap.",
    body: `En leiebil er en bil leid ut for kortere periode (timer til uker) fra et kommersielt utleieselskap. Skiller seg fra langtidsleie og leasing.

Bilene på FreeRider.no er alle del av kommersielle leiebilflåter.`,
    related: ["einveisleie", "freerider"],
  },
  {
    slug: "ev-rabatt",
    term: "EV-rabatt",
    short: "Lavere pris eller prioritet for elbiler i relokering.",
    body: `Mange utleiere legger ekstra fokus på å relokere elbiler, siden de har høyere verdi per dag og lavere CO₂-utslipp. På FreeRider.no får elbil-oppdrag ofte ekstra synlighet eller drivstoffkort/lade-kort som kompensasjon.`,
    related: ["freerider", "relokering"],
  },
  {
    slug: "kilometergrense",
    term: "Kilometergrense",
    short: "Maksimalt antall km tillatt på relokeringsoppdraget.",
    body: `Alle relokeringer har en øvre kilometergrense - typisk distanse pluss 10–15 % buffer for omvei. Kjører du forbi grensen, kan utleieren kreve en per-km-sats for hver ekstra kilometer.

Sjekk alltid kilometergrensen før du tar en omvei.`,
    related: ["relokering", "freerider"],
  },
];

export function getGlossaryEntry(slug: string) {
  return glossaryEntries.find((g) => g.slug === slug);
}
