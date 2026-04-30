import type { BlogEntry } from "./types";

export const blogEntries: BlogEntry[] = [
  {
    slug: "hva-er-bilflytting-og-hvorfor-finnes-det",
    title: "Hva er bilflytting og hvorfor finnes det?",
    description:
      "Bilutleiere ender alltid opp med skjev fordeling i flåten. Bilflytting jamnar det ut — billegare og grønare enn alternativa.",
    publishedAt: "2026-01-12",
    author: "Sigurd Aarseth",
    body: `Bilflytting handlar om å flytte ein leigebil frå ein stasjon der utleiaren har for mange bilar, til ein stasjon der dei har for få. Behovet oppstår fordi reisemønsteret er asymmetrisk: turistar leiger Oslo og leverer Bergen, eller vice versa, og fordelinga går i ubalanse på dagar, veker og månader.

Tradisjonelt løyste utleiarar dette ved å sende ein tilsett som køyrde bilen, og deretter fly tilbake. Den modellen har tre store kostnader: lønn, drivstoff/billett, og CO₂-utslepp frå returflyet. På lange ruter blir det dyrt og lite klimavennleg.

FreeRider-modellen kuttar mellomlekka. Utleiaren legg ut bilen som "freerider", og ein privat sjåfør tek bilen mellom A og B. Sjåføren får gratis biltur, utleiaren sparar lønn og fly, og CO₂-utsleppet blir vesentleg lågare.

Modellen finst frå før i andre land — Hertz Freerider i USA, AutoDrop i Australia — men har vore lite samla på éin marknad i Noreg. FreeRider.no samlar tilbodet frå alle norske utleiere på éin stad.`,
    tags: ["grunnleggjande", "bransje"],
  },
  {
    slug: "topp-10-mest-populare-relokeringsruter-i-norge",
    title: "Topp 10 mest populære relokeringsruter i Noreg",
    description:
      "Kva ruter går oftast som freerider? Vi har analysert 2 000 historiske relokeringar.",
    publishedAt: "2026-02-04",
    author: "Mari Lien",
    body: `Vi har sett på ca. 2 000 historiske relokeringsoppdrag frå dei seks største utleiarane i Noreg, og rangert dei vanlegaste rutene.

1. Oslo → Bergen — den klart vanlegaste, særleg sommaren juni–august.
2. Oslo → Trondheim — jamn straum heile året.
3. Bergen → Oslo — speglar retur etter sommarferien.
4. Oslo → Tromsø — lange oppdrag, ofte med drivstoffkort eller flatt honorar.
5. Trondheim → Oslo — same retning som #2 men i motsett straum.
6. Stavanger → Oslo — etter konferansesesongen.
7. Bergen → Stavanger — kort men jamn.
8. Tromsø → Bodø — etter turistsesongen i nord.
9. Oslo → Kristiansand — sommarstrand-effekten.
10. Bodø → Tromsø — vinterturisme.

Dei tre øvste rutene står for over 40 % av alle relokeringar. Det betyr at sjåfør med fleksibel tid på desse rutene har mykje å velje i.`,
    tags: ["analyse", "ruter"],
  },
  {
    slug: "slik-sparer-du-penger-pa-norgesferien",
    title: "Slik sparar du pengar på Norgesferien med ein gratis leigebil",
    description:
      "Ein freerider-bil mellom Oslo og Bergen kan dekke heile flyutgifta — og ofte drivstoffet på toppen.",
    publishedAt: "2026-02-22",
    author: "Sigurd Aarseth",
    body: `Ein flyreise Oslo–Bergen kostar typisk 800–1 800 kr ein veg. Same strekning som freerider er gratis, og i mange tilfelle får du drivstoffkort eller dekka bom og ferje.

Slik gjer du:
1. Vel reisemål som matchar ein populær relokeringsrute.
2. Ver fleksibel på opphenting — utleiarar publiserer typisk 2–7 dagar før.
3. Slå på varsel for ruta du ønskjer (t.d. Oslo → Bergen).
4. Søk så snart annonsen er oppe; populære oppdrag blir tildelt på timar.
5. Lever bilen i tide — sein levering kostar utleiaren pengar og kan gi deg sperre.

Tilleggstips: ein del oppdrag har inkludert ferjebillett, så du kan ta ein omveg via Sognefjorden utan å betale meir.`,
    tags: ["sjåfør", "spar"],
  },
  {
    slug: "klimaeffekten-av-tom-retur",
    title: "Klimaeffekten av tom retur — tal og fakta",
    description:
      "Ein tilsett som køyrer bilen + flyg attende generer 2–3 gonger meir CO₂ enn éin freerider-sjåfør.",
    publishedAt: "2026-03-08",
    author: "Mari Lien",
    body: `Ein staff-relokering Oslo–Bergen (480 km) i bensin-SUV genererer:

- Bilkøyringa: 480 km × 0,17 kg CO₂/km = 82 kg CO₂
- Returflyet for sjåføren: ca. 0,12 kg CO₂ × 480 km × 1,9 (radiative forcing) ≈ 110 kg CO₂

Total: ≈ 192 kg CO₂.

Same relokering med éin freerider-sjåfør i ein elbil:

- Bilkøyringa: 480 km × 0,025 kg/km = 12 kg CO₂
- Ingen returfly.

Total: ≈ 12 kg CO₂.

Sparing per relokering: 180 kg CO₂. Skalar ein modellen til 10 000 oppdrag i året, sparar industrien 1 800 tonn CO₂ — på berre denne typen relokering. Tal og kjelder er oppdaterte på /miljo.`,
    tags: ["klima", "metode"],
  },
  {
    slug: "hertz-freerider-sixt-avis-sammenliknet",
    title: "Hertz Freerider, Sixt og Avis samanlikna",
    description:
      "Korleis skil utleiarane seg på relokering? Drivstoff, ferjer, kompensasjon og bilval.",
    publishedAt: "2026-03-25",
    author: "Sigurd Aarseth",
    body: `Vi har samanlikna korleis dei tre største aktørane behandlar freerider-oppdrag i Noreg:

Hertz: Mest aktiv totalt. Tilbyr ofte drivstoffkort på lange oppdrag. Streng på leveringstid. Best på rute Oslo → Bergen.

Sixt: Premium-fokusert. Du får oftare ein Polestar eller BMW iX som freerider, men minimumsalder er gjerne 25 år, og forsikringa er premium. Best for erfarne sjåførar.

Avis: God balanse. Stort EV-tilbod om sommaren. Dekkjer som regel bom og ferje, og har ofte fleksible opphentings­vindauge. God instegsval.

Budget: Mindre flåte, men dei korte rutene Oslo–Kristiansand er gull for sommarsjåførar.

Konklusjon: For lange oppdrag med drivstoffkort — vel Hertz eller Avis. For sjeldne premium-bilar — vel Sixt. For korte sør-norske turar — vel Budget.`,
    tags: ["samanlikning", "bransje"],
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
