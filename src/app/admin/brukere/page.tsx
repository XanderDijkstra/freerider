import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { demoUsers } from "@/data/users";
import { getCompanyById } from "@/data/companies";
import { getUserStatus, type UserStatus } from "@/data/store";
import { reactivateUser, suspendUser } from "@/lib/auth-actions";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Administrer brukere",
  robots: { index: false },
};

const STATUS_TONE: Record<UserStatus, "success" | "error"> = {
  active: "success",
  suspended: "error",
};

const STATUS_LABEL: Record<UserStatus, string> = {
  active: "Aktiv",
  suspended: "Suspendert",
};

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin",
  company: "Utleier-ansvarlig",
  driver: "Sjåfør",
};

export default function AdminBrukerePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Brukere
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Sjåfører, utleier-ansvarlige og admin. Suspendér ved misbruk eller
          reaktiver tidligere suspenderte.
        </p>
      </header>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--background)]">
              <tr className="text-left">
                <Th>Bruker</Th>
                <Th>Rolle</Th>
                <Th>Tilknytning</Th>
                <Th>Opprettet</Th>
                <Th>Status</Th>
                <Th className="text-right pr-5">Handling</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {demoUsers.map((u) => {
                const status = getUserStatus(u.id);
                const company = u.companyId
                  ? getCompanyById(u.companyId)
                  : null;
                return (
                  <tr key={u.id}>
                    <Td>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-[color:var(--muted)]">
                          {u.email} · {u.phone}
                        </p>
                      </div>
                    </Td>
                    <Td>{ROLE_LABEL[u.role] ?? u.role}</Td>
                    <Td>{company ? company.name : u.licenseNumber ?? "-"}</Td>
                    <Td>{formatDate(u.createdAt)}</Td>
                    <Td>
                      <Badge tone={STATUS_TONE[status]}>
                        {STATUS_LABEL[status]}
                      </Badge>
                    </Td>
                    <Td className="text-right pr-5">
                      {u.role === "admin" ? (
                        <span className="text-xs text-[color:var(--muted)]">
                          Beskyttet
                        </span>
                      ) : status === "active" ? (
                        <form action={suspendUser}>
                          <input type="hidden" name="userId" value={u.id} />
                          <Button size="sm" variant="danger" type="submit">
                            Suspender
                          </Button>
                        </form>
                      ) : (
                        <form action={reactivateUser}>
                          <input type="hidden" name="userId" value={u.id} />
                          <Button size="sm" type="submit">
                            Reaktiver
                          </Button>
                        </form>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
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
