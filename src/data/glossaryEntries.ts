import type { GlossaryEntry } from "./types";

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "relokering",
    term: "Relokering",
    short: "Flytting av leigebil mellom utleiestasjonar.",
    body: `Relokering er prosessen med å flytte ein leigebil frå ein stasjon til ein annan, vanlegvis fordi flåten er ute av balanse. Behovet kjem av asymmetrisk reise: kundar leiger éin veg utan å returnere bilen.

Relokering er den viktigaste use casen for FreeRider-modellen.`,
    related: ["einveisleie", "flatebalansering", "freerider"],
  },
  {
    slug: "einveisleie",
    term: "Einveisleie",
    short: "Bilutleige der bilen blir levert på ein annan stasjon enn der han vart henta.",
    body: `Einveisleie er ein kontraktstype der utleigaren tillèt at kunden leverer bilen på ein anna stasjon. Det skapar fleksibilitet for kunden, men flåtebalanse-problem for utleigaren — sidan bilen ikkje automatisk kjem tilbake til startstasjonen.

Drop-off-gebyr blir ofte lagt på for å motivere bilen tilbake same veg, eller for å dekkje den seinare relokeringskostnaden.`,
    related: ["relokering", "drop-off-gebyr", "flatebalansering"],
  },
  {
    slug: "flatebalansering",
    term: "Flåtebalansering",
    short: "Strategi for å halde leigebilflåten geografisk balansert.",
    body: `Flåtebalansering er det operasjonelle arbeidet utleigarar gjer for å sikre at det er bilar tilgjengeleg der etterspurnaden er. Det inkluderer prising, drop-off-gebyr, relokering og logistikk-planlegging.

På FreeRider.no er flåtebalansering hovudgrunnen til at oppdrag finst.`,
    related: ["relokering", "einveisleie", "drop-off-gebyr"],
  },
  {
    slug: "drop-off-gebyr",
    term: "Drop-off-gebyr",
    short: "Tilleggsgebyr ved levering av bil på anna stasjon enn opphenting.",
    body: `Drop-off-gebyret er ein tilleggspris som utleigaren tek for einveisleie. Storleiken varierer med distanse og kor populær retning er.

Når drop-off-gebyret er høgt nok, blir det ofte billegare for utleigaren å publisere bilen som freerider og la ein privat sjåfør gjere jobben.`,
    related: ["einveisleie", "freerider", "flatebalansering"],
  },
  {
    slug: "freerider",
    term: "Freerider",
    short: "Sjåfør som flyttar ein leigebil for utleigaren mot fri eller billeg leige.",
    body: `Ein freerider er ein privat sjåfør som tek på seg å flytte ein leigebil mellom to stasjonar. I bytte får sjåføren bruke bilen gratis (eller med kompensasjon).

Modellen er ein vinn-vinn: utleiaren sparar logistikk-kostnad, sjåføren sparar reisekostnad, og CO₂-utsleppet går ned vesentleg.`,
    related: ["relokering", "leiebil", "ev-rabatt"],
  },
  {
    slug: "leiebil",
    term: "Leiebil",
    short: "Bil leigd for kortare periode, vanlegvis frå utleigeselskap.",
    body: `Ein leiebil er ein bil leigd ut for kortare periode (timar til veker) frå eit kommersielt utleigeselskap. Skil seg frå langtidsleige og leasing.

Bilane på FreeRider.no er alle del av kommersielle leigebilflåtar.`,
    related: ["einveisleie", "freerider"],
  },
  {
    slug: "ev-rabatt",
    term: "EV-rabatt",
    short: "Lågare pris eller prioritet for elbilar i relokering.",
    body: `Mange utleigarar legg ekstra fokus på å relokere elbilar, sidan dei har høgare verdi per dag og lågare CO₂-utslepp. På FreeRider.no får elbil-oppdrag ofte ekstra synlegheit eller drivstoffkort/lade-kort som kompensasjon.`,
    related: ["freerider", "relokering"],
  },
  {
    slug: "kilometergrense",
    term: "Kilometergrense",
    short: "Maksimalt antal km tillate på relokeringsoppdraget.",
    body: `Alle relokeringar har ein øvre kilometergrense — typisk distanse + 10–15 % buffer for omveg. Køyrer du forbi grensa, kan utleigaren krevje ein per-km-sats for kvar ekstra kilometer.

Sjekk alltid kilometergrensa før du tek ein omveg.`,
    related: ["relokering", "freerider"],
  },
];

export function getGlossaryEntry(slug: string) {
  return glossaryEntries.find((g) => g.slug === slug);
}
