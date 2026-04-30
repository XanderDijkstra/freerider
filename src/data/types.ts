import type { FuelType } from "@/lib/co2";

export type VehicleType = "sedan" | "suv" | "van" | "wagon" | "compact";
export type Transmission = "manual" | "automatic";

export type ListingStatus =
  | "draft"
  | "published"
  | "closed"
  | "completed"
  | "expired";

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoColor: string;
  fleetSize: number;
  locations: string[];
  totalRelocations: number;
  established: number;
}

export interface Vehicle {
  id: string;
  companyId: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  luggage: number;
  features: string[];
  evRangeKm?: number;
  photos: string[];
}

export type FuelPolicy = "returnFull" | "returnAsReceived" | "companyPays";
export type FerryPolicy = "covered" | "notCovered" | "partial";
export type Compensation =
  | { kind: "free" }
  | { kind: "fuelCard" }
  | { kind: "flatNok"; amount: number }
  | { kind: "tollsAndFerries" };

export interface Listing {
  id: string;
  vehicleId: string;
  companyId: string;
  fromCity: string;
  fromAddress: string;
  toCity: string;
  toAddress: string;
  distanceKm: number;
  maxKm: number;
  pickupStart: string; // ISO
  pickupEnd: string; // ISO
  dropoffDeadline: string; // ISO
  rules: {
    fuel: FuelPolicy;
    ferry: FerryPolicy;
    tolls: "covered" | "notCovered";
    insurance: "standard" | "premium";
    minAge: number;
    licenseClass: string;
    notes?: string;
  };
  compensation: Compensation;
  status: ListingStatus;
  publishedAt: string;
}

export interface BlogEntry {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  body: string; // simple paragraphs separated by \n\n
  tags: string[];
}

export interface GlossaryEntry {
  slug: string;
  term: string;
  short: string;
  body: string;
  related: string[]; // slugs
}
