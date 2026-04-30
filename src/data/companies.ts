import type { Company } from "./types";

export const companies: Company[] = [
  {
    id: "c-hertz",
    slug: "hertz",
    name: "Hertz Norge",
    description:
      "Hertz har 80 stasjoner i Norge og trenger jevnlig å balansere flåten mellom by og distrikt. Mest aktiv på ruten Oslo–Tromsø og Oslo–Bergen om sommeren.",
    logoColor: "#FFCC00",
    fleetSize: 4200,
    locations: ["Oslo", "Bergen", "Trondhjem", "Stavanger", "Tromsø", "Bodø", "Ålesund"],
    totalRelocations: 312,
    established: 1918,
  },
  {
    id: "c-avis",
    slug: "avis",
    name: "Avis Norge",
    description:
      "Avis har stort behov for å flytte EV-biler mellom by-stasjoner i sommerhalvåret. Tilbyr ofte fri leie med drivstoffkort på lange relokeringer.",
    logoColor: "#D4002A",
    fleetSize: 2900,
    locations: ["Oslo", "Bergen", "Trondhjem", "Kristiansand", "Lillehammer"],
    totalRelocations: 198,
    established: 1946,
  },
  {
    id: "c-budget",
    slug: "budget",
    name: "Budget Norge",
    description:
      "Mindre flåte, men aktive i Sør-Norge. Tar ofte korte relokeringer mellom Oslo og Kristiansand.",
    logoColor: "#FF7A00",
    fleetSize: 1100,
    locations: ["Oslo", "Kristiansand", "Stavanger"],
    totalRelocations: 76,
    established: 1958,
  },
  {
    id: "c-sixt",
    slug: "sixt",
    name: "Sixt Norge",
    description:
      "Sixt har sterk premium- og EV-andel og legger jevnlig ut sjeldne biler (Polestar, Tesla, BMW iX) for relokering.",
    logoColor: "#FF6600",
    fleetSize: 1800,
    locations: ["Oslo", "Bergen", "Trondhjem", "Tromsø"],
    totalRelocations: 142,
    established: 1912,
  },
  {
    id: "c-rentit",
    slug: "rent-it",
    name: "Rent-it",
    description:
      "Norsk regional aktør med fokus på Vestlandet og Nordvestlandet. Mye van og kombi for bobil-pendling.",
    logoColor: "#0066B3",
    fleetSize: 480,
    locations: ["Bergen", "Ålesund", "Molde", "Førde"],
    totalRelocations: 58,
    established: 2007,
  },
  {
    id: "c-arctic",
    slug: "arctic-rental",
    name: "Arctic Rental",
    description:
      "Spesialiserer seg på Nord-Norge. Trenger å flytte biler tilbake sør etter turistsesongen.",
    logoColor: "#005C8A",
    fleetSize: 320,
    locations: ["Tromsø", "Bodø", "Alta", "Kirkenes"],
    totalRelocations: 41,
    established: 2014,
  },
];

export function getCompanyBySlug(slug: string) {
  return companies.find((c) => c.slug === slug);
}

export function getCompanyById(id: string) {
  return companies.find((c) => c.id === id);
}
