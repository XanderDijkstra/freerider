import Link from "next/link";
import { ArrowRight, Calendar, Gauge } from "lucide-react";
import type { Listing } from "@/data/types";
import { getVehicleById } from "@/data/vehicles";
import { getCompanyById } from "@/data/companies";
import { computeCo2Saved } from "@/lib/co2";
import { formatDateRange, formatKm } from "@/lib/format";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { EcoBadge } from "./EcoBadge";
import { VehicleImage } from "./VehicleImage";

export function ListingCard({ listing }: { listing: Listing }) {
  const vehicle = getVehicleById(listing.vehicleId);
  const company = getCompanyById(listing.companyId);
  if (!vehicle || !company) return null;

  const co2 = computeCo2Saved({
    distanceKm: listing.distanceKm,
    fuelType: vehicle.fuelType,
  });

  const compensationLabel = (() => {
    switch (listing.compensation.kind) {
      case "free":
        return "Gratis";
      case "fuelCard":
        return "+ Drivstoffkort";
      case "tollsAndFerries":
        return "+ Bom og ferje";
      case "flatNok":
        return `+ ${listing.compensation.amount} kr`;
    }
  })();

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <Link href={`/biler/${listing.id}`} className="block">
        <VehicleImage
          color={vehicle.photos[0]}
          label={`${vehicle.make} ${vehicle.model}`}
          className="aspect-[16/10]"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/biler/${listing.id}`}
              className="font-medium text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
            >
              {vehicle.make} {vehicle.model}
            </Link>
            <p className="text-xs text-[color:var(--muted)]">
              {vehicle.year} · {labelForFuel(vehicle.fuelType)}
            </p>
          </div>
          <Badge tone="neutral">{compensationLabel}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{listing.fromCity}</span>
          <ArrowRight className="h-4 w-4 text-[color:var(--muted)]" aria-hidden />
          <span className="font-medium">{listing.toCity}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[color:var(--muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDateRange(listing.pickupStart, listing.pickupEnd)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" aria-hidden />
            {formatKm(listing.distanceKm)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[color:var(--border)]">
          <Link
            href={`/utleier/${company.slug}`}
            className="text-xs text-[color:var(--muted)] hover:text-[color:var(--primary)]"
          >
            {company.name}
          </Link>
          <EcoBadge kgSaved={co2.savedKg} />
        </div>
      </div>
    </Card>
  );
}

function labelForFuel(fuel: string): string {
  switch (fuel) {
    case "electric":
      return "Elbil";
    case "hybrid":
      return "Hybrid";
    case "diesel":
      return "Diesel";
    case "petrol":
      return "Bensin";
    default:
      return fuel;
  }
}
