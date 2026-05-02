import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { companies } from "@/data/companies";
import { listingsForCompany } from "@/data/store";
import { allCompanyStatuses, type CompanyStatus } from "@/data/store";
import {
  approveCompany,
  reopenCompany,
  suspendCompany,
} from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Administrer utleiere",
  robots: { index: false },
};

const STATUS_TONE: Record<CompanyStatus, "success" | "warning" | "error"> = {
  approved: "success",
  pending: "warning",
  suspended: "error",
};

const STATUS_LABEL: Record<CompanyStatus, string> = {
  approved: "Godkjent",
  pending: "Avventer",
  suspended: "Suspendert",
};

export default function AdminUtleierePage() {
  const statuses = allCompanyStatuses();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Utleiere
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Godkjenn nye utleiere, suspendér ved brudd, eller reaktiver tidligere
          suspenderte kontoer.
        </p>
      </header>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--background)]">
              <tr className="text-left">
                <Th>Utleier</Th>
                <Th>Status</Th>
                <Th>Flåte</Th>
                <Th>Aktive annonser</Th>
                <Th>Etablert</Th>
                <Th className="text-right pr-5">Handlinger</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {companies.map((c) => {
                const status = statuses.find((s) => s.id === c.id)!.status;
                const activeListings = listingsForCompany(c.id).length;
                return (
                  <tr key={c.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-9 w-9 rounded-lg flex items-center justify-center text-white text-sm font-semibold shrink-0"
                          style={{ background: c.logoColor }}
                          aria-hidden
                        >
                          {c.name.slice(0, 1)}
                        </div>
                        <div>
                          <Link
                            href={`/utleier/${c.slug}`}
                            className="font-medium hover:text-[color:var(--primary)]"
                          >
                            {c.name}
                          </Link>
                          <p className="text-xs text-[color:var(--muted)]">
                            {c.locations.slice(0, 3).join(", ")}
                            {c.locations.length > 3 ? "…" : ""}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <Badge tone={STATUS_TONE[status]}>
                        {STATUS_LABEL[status]}
                      </Badge>
                    </Td>
                    <Td>{c.fleetSize.toLocaleString("nb-NO")}</Td>
                    <Td>{activeListings}</Td>
                    <Td>{c.established}</Td>
                    <Td className="text-right pr-5">
                      <ActionButtons companyId={c.id} status={status} />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-[color:var(--muted)]">
        Demo-mutasjoner holdes i minne. De resettes når serveren restarter.
      </p>
    </div>
  );
}

function ActionButtons({
  companyId,
  status,
}: {
  companyId: string;
  status: CompanyStatus;
}) {
  return (
    <div className="flex justify-end gap-2">
      {status === "pending" ? (
        <>
          <form action={approveCompany}>
            <input type="hidden" name="companyId" value={companyId} />
            <Button size="sm" type="submit">
              Godkjenn
            </Button>
          </form>
          <form action={suspendCompany}>
            <input type="hidden" name="companyId" value={companyId} />
            <Button size="sm" variant="secondary" type="submit">
              Avslå
            </Button>
          </form>
        </>
      ) : status === "approved" ? (
        <form action={suspendCompany}>
          <input type="hidden" name="companyId" value={companyId} />
          <Button size="sm" variant="danger" type="submit">
            Suspender
          </Button>
        </form>
      ) : (
        <form action={reopenCompany}>
          <input type="hidden" name="companyId" value={companyId} />
          <Button size="sm" type="submit">
            Reaktiver
          </Button>
        </form>
      )}
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-medium uppercase tracking-wide text-[color:var(--muted)] ${className ?? ""}`}
    >
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
