/**
 * Single source of truth for UI copy. Keep keys stable so swapping the
 * dictionary later (English, regional dialects) is a search-and-replace.
 */
export const messages = {
  brand: {
    name: "FreeRider.no",
    tagline: "Kjør gratis. Flytt bilen. Spar planeten.",
  },
  nav: {
    browse: "Se ledige biler",
    companies: "Utleiere",
    howItWorks: "Slik fungerer det",
    forCompanies: "For utleiere",
    environment: "Miljø",
    blog: "Blogg",
    login: "Logg inn",
    register: "Registrer deg",
  },
  cta: {
    browse: "Se ledige biler",
    apply: "Søk om denne bilen",
    loginToApply: "Logg inn for å søke",
    follow: "Følg",
    following: "Følger",
    book: "Bestill",
    saveDraft: "Lagre utkast",
    publish: "Publiser",
    cancel: "Avbryt",
    next: "Neste",
    previous: "Forrige",
    contactSales: "Bestill demo",
  },
  status: {
    pending: "Avventer",
    approved: "Godkjent",
    rejected: "Avslått",
    cancelled: "Kansellert",
    completed: "Fullført",
    available: "Ledig",
    inListing: "På annonse",
    maintenance: "Vedlikehold",
    retired: "Pensjonert",
    draft: "Utkast",
    published: "Publisert",
    closed: "Lukket",
  },
  empty: {
    noListings: "Ingen biler matcher filteret. Prøv å fjerne et filter, eller slå på varsel for denne kombinasjonen.",
    noRequests: "Ingen forespørsler ennå.",
    noFollows: "Du følger ingen utleiere ennå.",
  },
  errors: {
    generic: "Noe gikk galt. Prøv igjen om litt.",
    auth: "Du må logge inn for å gjøre dette.",
    notFound: "Siden finnes ikke.",
  },
} as const;

export type Messages = typeof messages;
