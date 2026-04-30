import { Car } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Placeholder vehicle visual until photo upload is wired up. Uses the
 * vehicle's `photos[0]` value as a hex color.
 */
export function VehicleImage({
  color = "#1F4D2B",
  label,
  className,
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl flex items-center justify-center",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, rgba(0,0,0,0.15) 100%)`,
      }}
      aria-label={label}
    >
      <Car className="h-16 w-16 text-white/80" aria-hidden />
      {label ? (
        <span className="absolute bottom-2 left-3 text-xs font-medium text-white/90">
          {label}
        </span>
      ) : null}
    </div>
  );
}
