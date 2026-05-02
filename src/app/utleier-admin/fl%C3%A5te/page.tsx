import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { vehiclesForCompany } from "@/data/store";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Flåte",
  robots: { index: false },
};

export default async function FlateePage({
  searchParams,
}: {
  searchParams: Promise<{ added?: string }>;
}) {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const myVehicles = vehiclesForCompany(companyId);
  const { added } = await searchParams;

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Flåte
          </h1>
          <p className="mt-1 text-[color:var(--muted)]">
            {myVehicles.length} biler registrert.
          </p>
        </div>
        <LinkButton href="/utleier-admin/fl%C3%A5te/ny">Legg til bil</LinkButton>
      </header>

      {added === "1" ? (
        <Card className="p-4 bg-[color:var(--success)]/10 border-[color:var(--success)]/30 text-sm">
          Bilen er lagt til flåten.
        </Card>
      ) : null}

      {myVehicles.length === 0 ? (
        <Card className="p-8 text-center text-[color:var(--muted)] space-y-3">
          <p>Ingen biler i flåten enda.</p>
          <LinkButton href="/utleier-admin/fl%C3%A5te/ny" variant="secondary">
            Legg til første bil
          </LinkButton>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[color:var(--background)]">
                <tr className="text-left">
                  <Th>Skilt</Th>
                  <Th>Modell</Th>
                  <Th>År</Th>
                  <Th>Drivstoff</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                {myVehicles.map((v) => (
                  <tr key={v.id}>
                    <Td>{v.plate}</Td>
                    <Td>
                      {v.make} {v.model}
                    </Td>
                    <Td>{v.year}</Td>
                    <Td>{labelForFuel(v.fuelType)}</Td>
                    <Td>
                      <Badge tone="success">Ledig</Badge>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[color:var(--muted)]">
      {children}
    </th>
  );
}
function Td({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className ?? ""}`}>{children}</td>;
}

function labelForFuel(fuel: string) {
  return fuel === "electric"
    ? "Elbil"
    : fuel === "hybrid"
      ? "Hybrid"
      : fuel === "diesel"
        ? "Diesel"
        : "Bensin";
}
