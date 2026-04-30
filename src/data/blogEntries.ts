import type { BlogEntry } from "./types";

export const blogEntries: BlogEntry[] = [
  {
    slug: "hva-er-bilflytting-og-hvorfor-finnes-det",
    title: "Hva er bilflytting og hvorfor finnes det?",
    description:
      "Bilutleiere ender alltid opp med skjev fordeling i flåten. Bilflytting jevner det ut — billigere og grønnere enn alternativene.",
    publishedAt: "2026-01-12",
    author: "Sigurd Aarseth",
    body: `Bilflytting handler om å flytte en leiebil fra én stasjon der utleieren har for mange biler, til en stasjon der de har for få. Behovet oppstår fordi reisemønsteret er asymmetrisk: turister leier i Oslo og leverer i Bergen, eller motsatt, og fordelingen kommer i ubalanse på dager, uker og måneder.

Tradisjonelt har utleiere løst dette ved å sende en ansatt som kjørte bilen og deretter fløy tilbake. Den modellen har tre store kostnader: lønn, drivstoff og flybillett, samt CO₂-utslipp fra returflyet. På lange ruter blir det dyrt og lite klimavennlig.

FreeRider-modellen kutter mellomleddet. Utleieren legger ut bilen som "freerider", og en privat sjåfør tar bilen mellom A og B. Sjåføren får en gratis biltur, utleieren sparer lønn og fly, og CO₂-utslippet blir vesentlig lavere.

Modellen finnes fra før i andre land — Hertz Freerider i USA, AutoDrop i Australia — men har vært lite samlet på ett marked i Norge. FreeRider.no samler tilbudet fra alle norske utleiere på ett sted.`,
    tags: ["grunnleggende", "bransje"],
  },
  {
    slug: "topp-10-mest-populare-relokeringsruter-i-norge",
    title: "Topp 10 mest populære relokeringsruter i Norge",
    description:
      "Hvilke ruter går oftest som freerider? Vi har analysert 2 000 historiske relokeringer.",
    publishedAt: "2026-02-04",
    author: "Mari Lien",
    body: `Vi har sett på cirka 2 000 historiske relokeringsoppdrag fra de seks største utleierne i Norge, og rangert de vanligste rutene.

1. Oslo → Bergen — den klart vanligste, særlig sommeren juni–august.
2. Oslo → Trondhjem — jevn strøm hele året.
3. Bergen → Oslo — speiler retur etter sommerferien.
4. Oslo → Tromsø — lange oppdrag, ofte med drivstoffkort eller flatt honorar.
5. Trondhjem → Oslo — samme retning som #2 men i motsatt strøm.
6. Stavanger → Oslo — etter konferansesesongen.
7. Bergen → Stavanger — kort, men jevn.
8. Tromsø → Bodø — etter turistsesongen i nord.
9. Oslo → Kristiansand — sommerstrand-effekten.
10. Bodø → Tromsø — vinterturisme.

De tre øverste rutene står for over 40 % av alle relokeringer. Det betyr at sjåfører med fleksibel tid på disse rutene har mye å velge i.`,
    tags: ["analyse", "ruter"],
  },
  {
    slug: "slik-sparer-du-penger-pa-norgesferien",
    title: "Slik sparer du penger på Norgesferien med en gratis leiebil",
    description:
      "En freerider-bil mellom Oslo og Bergen kan dekke hele flyutgiften — og ofte drivstoffet på toppen.",
    publishedAt: "2026-02-22",
    author: "Sigurd Aarseth",
    body: `En flyreise Oslo–Bergen koster typisk 800–1 800 kr én vei. Samme strekning som freerider er gratis, og i mange tilfeller får du drivstoffkort eller dekket bom og ferje.

Slik gjør du:
1. Velg et reisemål som matcher en populær relokeringsrute.
2. Vær fleksibel på opphenting — utleiere publiserer typisk 2–7 dager før.
3. Slå på varsel for ruten du ønsker (f.eks. Oslo → Bergen).
4. Søk så snart annonsen er oppe; populære oppdrag blir tildelt på timer.
5. Lever bilen i tide — sen levering koster utleieren penger og kan gi deg sperre.

Tilleggstips: noen oppdrag har inkludert fergebillett, så du kan ta en omvei via Sognefjorden uten å betale mer.`,
    tags: ["sjåfør", "spar"],
  },
  {
    slug: "klimaeffekten-av-tom-retur",
    title: "Klimaeffekten av tom retur — tall og fakta",
    description:
      "En ansatt som kjører bilen pluss flyr tilbake genererer 2–3 ganger mer CO₂ enn én freerider-sjåfør.",
    publishedAt: "2026-03-08",
    author: "Mari Lien",
    body: `En staff-relokering Oslo–Bergen (480 km) i en bensin-SUV genererer:

- Bilkjøringen: 480 km × 0,17 kg CO₂/km = 82 kg CO₂
- Returflyet for sjåføren: ca. 0,12 kg CO₂ × 480 km × 1,9 (radiative forcing) ≈ 110 kg CO₂

Totalt: ≈ 192 kg CO₂.

Samme relokering med én freerider-sjåfør i en elbil:

- Bilkjøringen: 480 km × 0,025 kg/km = 12 kg CO₂
- Ingen returfly.

Totalt: ≈ 12 kg CO₂.

Sparing per relokering: 180 kg CO₂. Skalerer man modellen til 10 000 oppdrag i året, sparer industrien 1 800 tonn CO₂ — bare på denne typen relokering. Tall og kilder er oppdatert på /miljo.`,
    tags: ["klima", "metode"],
  },
  {
    slug: "hertz-freerider-sixt-avis-sammenlignet",
    title: "Hertz Freerider, Sixt og Avis sammenlignet",
    description:
      "Hvordan skiller utleierne seg på relokering? Drivstoff, ferger, kompensasjon og bilvalg.",
    publishedAt: "2026-03-25",
    author: "Sigurd Aarseth",
    body: `Vi har sammenlignet hvordan de tre største aktørene behandler freerider-oppdrag i Norge:

Hertz: Mest aktiv totalt. Tilbyr ofte drivstoffkort på lange oppdrag. Streng på leveringstid. Best på ruten Oslo → Bergen.

Sixt: Premium-fokusert. Du får oftere en Polestar eller BMW iX som freerider, men minimumsalderen er gjerne 25 år, og forsikringen er premium. Best for erfarne sjåfører.

Avis: God balanse. Stort EV-tilbud om sommeren. Dekker som regel bom og ferje, og har ofte fleksible opphentingsvinduer. Godt valg for nybegynnere.

Budget: Mindre flåte, men de korte rutene Oslo–Kristiansand er gull for sommersjåfører.

Konklusjon: For lange oppdrag med drivstoffkort — velg Hertz eller Avis. For sjeldne premium-biler — velg Sixt. For korte sør-norske turer — velg Budget.`,
    tags: ["sammenligning", "bransje"],
  },
];

export function getBlogEntry(slug: string) {
  return blogEntries.find((b) => b.slug === slug);
}

export function recentBlogEntries(count = 3) {
  return [...blogEntries]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, count);
}
