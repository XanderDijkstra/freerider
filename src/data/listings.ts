import type { Listing } from "./types";

const baseDate = new Date("2026-05-01T00:00:00Z");
function offsetDays(days: number, hours = 12) {
  const d = new Date(baseDate);
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(hours, 0, 0, 0);
  return d.toISOString();
}

export const listings: Listing[] = [
  {
    id: "l-001",
    vehicleId: "v-1",
    companyId: "c-hertz",
    fromCity: "Oslo",
    fromAddress: "Gardermoen Lufthavn, 2061 Gardermoen",
    toCity: "Bergen",
    toAddress: "Flesland Lufthavn, 5258 Bergen",
    distanceKm: 480,
    maxKm: 530,
    pickupStart: offsetDays(2, 8),
    pickupEnd: offsetDays(3, 18),
    dropoffDeadline: offsetDays(4, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "standard",
      minAge: 23,
      licenseClass: "B",
      notes: "Bilen skal lades til 80 % før levering.",
    },
    compensation: { kind: "fuelCard" },
    status: "published",
    publishedAt: offsetDays(-1, 9),
  },
  {
    id: "l-002",
    vehicleId: "v-2",
    companyId: "c-hertz",
    fromCity: "Trondheim",
    fromAddress: "Værnes Lufthavn, 7500 Stjørdal",
    toCity: "Oslo",
    toAddress: "Hertz Skøyen, 0278 Oslo",
    distanceKm: 540,
    maxKm: 595,
    pickupStart: offsetDays(4, 8),
    pickupEnd: offsetDays(5, 18),
    dropoffDeadline: offsetDays(6, 20),
    rules: {
      fuel: "returnAsReceived",
      ferry: "notCovered",
      tolls: "covered",
      insurance: "standard",
      minAge: 21,
      licenseClass: "B",
    },
    compensation: { kind: "free" },
    status: "published",
    publishedAt: offsetDays(-1, 12),
  },
  {
    id: "l-003",
    vehicleId: "v-3",
    companyId: "c-avis",
    fromCity: "Oslo",
    fromAddress: "Avis Sentrum, 0150 Oslo",
    toCity: "Tromsø",
    toAddress: "Avis Tromsø Lufthavn, 9012 Tromsø",
    distanceKm: 1620,
    maxKm: 1780,
    pickupStart: offsetDays(1, 8),
    pickupEnd: offsetDays(2, 18),
    dropoffDeadline: offsetDays(5, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "premium",
      minAge: 25,
      licenseClass: "B",
      notes: "Tesla Supercharger-lading dekkjast med medfølgjande kort.",
    },
    compensation: { kind: "tollsAndFerries" },
    status: "published",
    publishedAt: offsetDays(0, 8),
  },
  {
    id: "l-004",
    vehicleId: "v-4",
    companyId: "c-avis",
    fromCity: "Bergen",
    fromAddress: "Avis Flesland, 5258 Bergen",
    toCity: "Stavanger",
    toAddress: "Avis Sola Lufthavn, 4055 Sola",
    distanceKm: 210,
    maxKm: 235,
    pickupStart: offsetDays(3, 8),
    pickupEnd: offsetDays(4, 18),
    dropoffDeadline: offsetDays(5, 20),
    rules: {
      fuel: "returnFull",
      ferry: "covered",
      tolls: "covered",
      insurance: "standard",
      minAge: 21,
      licenseClass: "B",
    },
    compensation: { kind: "free" },
    status: "published",
    publishedAt: offsetDays(-2, 10),
  },
  {
    id: "l-005",
    vehicleId: "v-5",
    companyId: "c-sixt",
    fromCity: "Oslo",
    fromAddress: "Sixt Sentrum, 0151 Oslo",
    toCity: "Trondheim",
    toAddress: "Sixt Værnes, 7500 Stjørdal",
    distanceKm: 495,
    maxKm: 545,
    pickupStart: offsetDays(2, 8),
    pickupEnd: offsetDays(3, 18),
    dropoffDeadline: offsetDays(4, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "premium",
      minAge: 25,
      licenseClass: "B",
    },
    compensation: { kind: "fuelCard" },
    status: "published",
    publishedAt: offsetDays(-1, 14),
  },
  {
    id: "l-006",
    vehicleId: "v-6",
    companyId: "c-sixt",
    fromCity: "Tromsø",
    fromAddress: "Sixt Tromsø, 9012 Tromsø",
    toCity: "Bodø",
    toAddress: "Sixt Bodø, 8001 Bodø",
    distanceKm: 720,
    maxKm: 790,
    pickupStart: offsetDays(5, 9),
    pickupEnd: offsetDays(6, 18),
    dropoffDeadline: offsetDays(7, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "premium",
      minAge: 25,
      licenseClass: "B",
    },
    compensation: { kind: "fuelCard" },
    status: "published",
    publishedAt: offsetDays(0, 11),
  },
  {
    id: "l-007",
    vehicleId: "v-7",
    companyId: "c-budget",
    fromCity: "Oslo",
    fromAddress: "Budget Helsfyr, 0667 Oslo",
    toCity: "Kristiansand",
    toAddress: "Budget Kristiansand, 4612 Kristiansand",
    distanceKm: 320,
    maxKm: 350,
    pickupStart: offsetDays(1, 8),
    pickupEnd: offsetDays(2, 18),
    dropoffDeadline: offsetDays(3, 20),
    rules: {
      fuel: "returnAsReceived",
      ferry: "notCovered",
      tolls: "covered",
      insurance: "standard",
      minAge: 21,
      licenseClass: "B",
    },
    compensation: { kind: "free" },
    status: "published",
    publishedAt: offsetDays(-1, 16),
  },
  {
    id: "l-008",
    vehicleId: "v-8",
    companyId: "c-rentit",
    fromCity: "Bergen",
    fromAddress: "Rent-it Bergen Sentrum, 5008 Bergen",
    toCity: "Ålesund",
    toAddress: "Rent-it Ålesund, 6004 Ålesund",
    distanceKm: 380,
    maxKm: 420,
    pickupStart: offsetDays(3, 9),
    pickupEnd: offsetDays(4, 18),
    dropoffDeadline: offsetDays(5, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "standard",
      minAge: 23,
      licenseClass: "B",
      notes: "Van — passar fint for flytting eller stor familieferie.",
    },
    compensation: { kind: "flatNok", amount: 800 },
    status: "published",
    publishedAt: offsetDays(0, 13),
  },
  {
    id: "l-009",
    vehicleId: "v-9",
    companyId: "c-arctic",
    fromCity: "Bodø",
    fromAddress: "Arctic Bodø, 8001 Bodø",
    toCity: "Tromsø",
    toAddress: "Arctic Tromsø, 9012 Tromsø",
    distanceKm: 560,
    maxKm: 615,
    pickupStart: offsetDays(2, 8),
    pickupEnd: offsetDays(3, 18),
    dropoffDeadline: offsetDays(4, 20),
    rules: {
      fuel: "returnFull",
      ferry: "covered",
      tolls: "covered",
      insurance: "standard",
      minAge: 23,
      licenseClass: "B",
    },
    compensation: { kind: "free" },
    status: "published",
    publishedAt: offsetDays(-1, 8),
  },
  {
    id: "l-010",
    vehicleId: "v-10",
    companyId: "c-hertz",
    fromCity: "Stavanger",
    fromAddress: "Hertz Sola, 4055 Sola",
    toCity: "Oslo",
    toAddress: "Hertz Skøyen, 0278 Oslo",
    distanceKm: 510,
    maxKm: 560,
    pickupStart: offsetDays(2, 8),
    pickupEnd: offsetDays(3, 18),
    dropoffDeadline: offsetDays(4, 20),
    rules: {
      fuel: "companyPays",
      ferry: "covered",
      tolls: "covered",
      insurance: "standard",
      minAge: 23,
      licenseClass: "B",
    },
    compensation: { kind: "fuelCard" },
    status: "published",
    publishedAt: offsetDays(-2, 10),
  },
];

export function getListingById(id: string) {
  return listings.find((l) => l.id === id);
}

export function listingsByCompany(companyId: string) {
  return listings.filter(
    (l) => l.companyId === companyId && l.status === "published",
  );
}

export function publishedListings() {
  return listings.filter((l) => l.status === "published");
}

export function relatedListings(listing: Listing, count = 4) {
  return publishedListings()
    .filter((l) => l.id !== listing.id)
    .sort((a, b) => {
      const aScore =
        (a.companyId === listing.companyId ? 2 : 0) +
        (a.fromCity === listing.fromCity ? 1 : 0) +
        (a.toCity === listing.toCity ? 1 : 0);
      const bScore =
        (b.companyId === listing.companyId ? 2 : 0) +
        (b.fromCity === listing.fromCity ? 1 : 0) +
        (b.toCity === listing.toCity ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, count);
}
