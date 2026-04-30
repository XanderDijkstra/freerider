import Link from "next/link";
import type { Company } from "@/data/types";
import { Card } from "./Card";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/utleier/${company.slug}`} className="block group">
      <Card className="p-5 h-full flex flex-col gap-3 group-hover:border-[color:var(--secondary)] transition-colors">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-semibold"
            style={{ background: company.logoColor }}
            aria-hidden
          >
            {company.name.slice(0, 1)}
          </div>
          <div>
            <h3 className="font-medium text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
              {company.name}
            </h3>
            <p className="text-xs text-[color:var(--muted)]">
              {company.fleetSize.toLocaleString("nb-NO")} biler ·{" "}
              {company.locations.length} stasjoner
            </p>
          </div>
        </div>
        <p className="text-sm text-[color:var(--muted)] line-clamp-3">
          {company.description}
        </p>
      </Card>
    </Link>
  );
}
