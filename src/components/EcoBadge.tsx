import { Leaf } from "lucide-react";
import { Badge } from "./Badge";
import { formatKg } from "@/lib/format";

export function EcoBadge({ kgSaved }: { kgSaved: number }) {
  return (
    <Badge tone="eco">
      <Leaf className="h-3.5 w-3.5" aria-hidden />
      {formatKg(kgSaved)} CO₂ spart
    </Badge>
  );
}
