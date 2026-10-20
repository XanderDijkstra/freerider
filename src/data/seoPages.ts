// Content for the keyword landing pages (/gratis-leiebil, /kjore-bil-gratis).
// Distances and drive times are from OSRM (OpenStreetMap routing), rounded,
// without breaks. Ferry flags are only set where the main route has a ferry.

export interface SeoCity {
  slug: string;
  name: string;
  airport: string;
  intro: string;
  season: string;
}

export interface SeoRoute {
  slug: string;
  from: string; // city slug
  to: string; // city slug
  distanceKm: number;
  driveHours: number;
  ferry: boolean;
  note: string;
}

export const seoCities: SeoCity[] = [
  {
    slug: "oslo",
    name: "Oslo",
    airport: "Oslo lufthavn Gardermoen",
    intro:
      "Oslo er utgangspunktet for flest leiebilturer i Norge. Mange leier bil i Oslo og leverer den i Bergen, Trondheim eller Stavanger - og da må noen kjøre bilen tilbake.",
    season:
      "Om våren og forsommeren trenger utleiere ofte biler ut av Oslo til turistbyene på Vestlandet og i Nord-Norge. Om høsten går strømmen motsatt vei.",
  },
  {
    slug: "bergen",
    name: "Bergen",
    airport: "Bergen lufthavn Flesland",
    intro:
      "Bergen er porten til fjordene, og mange turister leverer leiebilen her etter en tur langs Vestlandet. Det gir et overskudd av biler som må flyttes videre.",
    season:
      "Etter sommersesongen står det ofte for mange biler i Bergen. Da trenger utleiere sjåfører østover mot Oslo og sørover mot Stavanger.",
  },
  {
    slug: "trondheim",
    name: "Trondheim",
    airport: "Trondheim lufthavn Værnes",
    intro:
      "Trondheim ligger midt i landet og er et knutepunkt for turer både sørover mot Oslo og nordover mot Bodø og Lofoten.",
    season:
      "Om sommeren går mange enveisturer nordover fra Trondheim. Bilene må senere tilbake sørover, ofte over flere dager.",
  },
  {
    slug: "stavanger",
    name: "Stavanger",
    airport: "Stavanger lufthavn Sola",
    intro:
      "Stavanger har mye næringslivstrafikk og turister på vei til Preikestolen og Lysefjorden. Mange leier bil herfra og leverer i Bergen eller Oslo.",
    season:
      "Bilene samler seg ofte i Bergen og Oslo, så utleiere trenger sjåfører tilbake til Stavanger - særlig før helger og ferier.",
  },
  {
    slug: "kristiansand",
    name: "Kristiansand",
    airport: "Kristiansand lufthavn Kjevik",
    intro:
      "Kristiansand og Sørlandet fylles opp av sommergjester. Mange kjører hit fra Oslo og tar fly eller tog hjem igjen.",
    season:
      "I juli og august hoper bilene seg opp på Sørlandet, og utleiere trenger sjåfører tilbake mot Oslo når sesongen er over.",
  },
  {
    slug: "tromso",
    name: "Tromsø",
    airport: "Tromsø lufthavn Langnes",
    intro:
      "Tromsø har turister både sommer og vinter - midnattssol, nordlys og hvalsafari. Mange kjører enveis mellom Tromsø, Lofoten og Bodø.",
    season:
      "Nord-Norge har to sesonger. Bilene må flyttes mellom Tromsø og Bodø i begge retninger, og noen ganger helt sørover når sesongen er over.",
  },
  {
    slug: "bodo",
    name: "Bodø",
    airport: "Bodø lufthavn",
    intro:
      "Bodø er porten til Lofoten. Mange leier bil her, tar ferja til Lofoten og leverer bilen et annet sted i Nord-Norge.",
    season:
      "Om sommeren må bilene ofte flyttes mellom Bodø, Tromsø og Trondheim for å dekke etterspørselen der turistene lander.",
  },
  {
    slug: "alesund",
    name: "Ålesund",
    airport: "Ålesund lufthavn Vigra",
    intro:
      "Ålesund er utgangspunkt for Geirangerfjorden og Atlanterhavsvegen. Mange kjører rundtur, men en del leverer bilen i Bergen eller Trondheim.",
    season:
      "Utleiere på Nordvestlandet trenger ofte biler tilbake til Ålesund fra Bergen og Trondheim etter sommerturene.",
  },
];

export const seoRoutes: SeoRoute[] = [
  {
    slug: "oslo-bergen",
    from: "oslo",
    to: "bergen",
    distanceKm: 460,
    driveHours: 8,
    ferry: false,
    note: "Velg mellom E16 over Filefjell eller Rv7 over Hardangervidda. Fjellovergangene kan stenge ved uvær om vinteren.",
  },
  {
    slug: "oslo-trondheim",
    from: "oslo",
    to: "trondheim",
    distanceKm: 490,
    driveHours: 7.5,
    ferry: false,
    note: "E6 gjennom Gudbrandsdalen og over Dovrefjell. Den mest kjørte langturen i Norge.",
  },
  {
    slug: "oslo-stavanger",
    from: "oslo",
    to: "stavanger",
    distanceKm: 440,
    driveHours: 7.5,
    ferry: false,
    note: "Du kan kjøre langs kysten på E18 og E39, eller gjennom innlandet. Kystveien er lengre, men holder seg unna fjellet.",
  },
  {
    slug: "oslo-kristiansand",
    from: "oslo",
    to: "kristiansand",
    distanceKm: 320,
    driveHours: 4.5,
    ferry: false,
    note: "E18 langs kysten - en av de enkleste langturene, med motorvei store deler av strekningen.",
  },
  {
    slug: "oslo-lillehammer",
    from: "oslo",
    to: "lillehammer",
    distanceKm: 180,
    driveHours: 2.5,
    ferry: false,
    note: "E6 forbi Gardermoen og langs Mjøsa. En kort tur som passer godt for førstegangssjåfører.",
  },
  {
    slug: "bergen-stavanger",
    from: "bergen",
    to: "stavanger",
    distanceKm: 290,
    driveHours: 5.5,
    ferry: true,
    note: "E39 langs kysten med ferjestrekninger underveis. Sjekk om oppdraget dekker ferjebilletten.",
  },
  {
    slug: "bergen-alesund",
    from: "bergen",
    to: "alesund",
    distanceKm: 430,
    driveHours: 8.5,
    ferry: true,
    note: "E39 nordover gjennom fjordlandskapet med flere ferjer. Planlegg god tid.",
  },
  {
    slug: "trondheim-alesund",
    from: "trondheim",
    to: "alesund",
    distanceKm: 410,
    driveHours: 7,
    ferry: true,
    note: "E39 vestover via Molde, med ferje underveis.",
  },
  {
    slug: "trondheim-bodo",
    from: "trondheim",
    to: "bodo",
    distanceKm: 700,
    driveHours: 11,
    ferry: false,
    note: "E6 nordover over Saltfjellet og polarsirkelen. Ofte fordelt over to dager.",
  },
  {
    slug: "bodo-tromso",
    from: "bodo",
    to: "tromso",
    distanceKm: 540,
    driveHours: 9,
    ferry: true,
    note: "E6 nordover med ferje over Tysfjorden. En av de vakreste kjøreturene i landet.",
  },
];

const extraNames: Record<string, string> = { lillehammer: "Lillehammer" };

export function cityName(slug: string): string {
  return seoCities.find((c) => c.slug === slug)?.name ?? extraNames[slug] ?? slug;
}

export function getSeoCity(slug: string) {
  return seoCities.find((c) => c.slug === slug);
}

export function getSeoRoute(slug: string) {
  return seoRoutes.find((r) => r.slug === slug);
}

export function routesForCity(slug: string) {
  return seoRoutes.filter((r) => r.from === slug || r.to === slug);
}

export function formatHours(h: number): string {
  const whole = Math.floor(h);
  return h % 1 === 0 ? `ca. ${whole} timer` : `ca. ${whole},5 timer`;
}
