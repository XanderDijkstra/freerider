/**
 * CO2 savings model. The numbers are placeholder defaults so the calculator
 * runs end-to-end. Source documentation lives on /miljo and must be updated
 * before launch.
 */

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";

export type Baseline = "staffDrive" | "staffDriveAndFlight" | "transporter";

// kg CO2 per km of driving for the relocated vehicle itself.
const VEHICLE_EMISSIONS_KG_PER_KM: Record<FuelType, number> = {
  petrol: 0.18,
  diesel: 0.16,
  hybrid: 0.11,
  electric: 0.025, // norwegian grid mix, well-to-wheel placeholder
};

// kg CO2 per km for the avoided baseline alternative.
const BASELINE_EMISSIONS_KG_PER_KM: Record<Baseline, number> = {
  // empty staff drive in a similar vehicle
  staffDrive: 0.17,
  // staff drive + return-flight share allocated to the relocation
  staffDriveAndFlight: 0.27,
  // dedicated car transporter (3-car carrier)
  transporter: 0.22,
};

export interface Co2Input {
  distanceKm: number;
  fuelType: FuelType;
  baseline?: Baseline;
}

export interface Co2Result {
  vehicleKg: number;
  baselineKg: number;
  savedKg: number;
  baseline: Baseline;
}

export function computeCo2Saved(input: Co2Input): Co2Result {
  const baseline = input.baseline ?? "staffDrive";
  const vehicleKg = input.distanceKm * VEHICLE_EMISSIONS_KG_PER_KM[input.fuelType];
  const baselineKg = input.distanceKm * BASELINE_EMISSIONS_KG_PER_KM[baseline];
  const savedKg = Math.max(0, baselineKg - vehicleKg);
  return { vehicleKg, baselineKg, savedKg, baseline };
}

export function totalCo2SavedKg(
  rows: { distanceKm: number; fuelType: FuelType }[],
): number {
  return rows.reduce(
    (sum, r) => sum + computeCo2Saved({ distanceKm: r.distanceKm, fuelType: r.fuelType }).savedKg,
    0,
  );
}

export const baselineLabels: Record<Baseline, string> = {
  staffDrive: "vs. tom retur med ansatt",
  staffDriveAndFlight: "vs. ansatt + returflight",
  transporter: "vs. profesjonell transportør",
};
