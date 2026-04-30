import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { vehicles } from "@/data/vehicles";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Flåte",
  robots: { index: false },
};

export default async function FlateePage() {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const myVehicles = vehicles.filter((v) => v.companyId === companyId);
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Flåte
          </h1>
          <p className="mt-1 text-[color:var(--muted)]">
            {myVehicles.length} biler registrerte.
          </p>
        </div>
        <LinkButton href="/utleier-admin/fl%C3%A5te/ny">Legg til bil</LinkButton>
      </header>

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
                <Th></Th>
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
                  <Td className="text-right">
                    <button
                      type="button"
                      className="text-[color:var(--primary)] hover:underline text-sm"
                    >
                      Endre
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
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
