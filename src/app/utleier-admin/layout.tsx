import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { getSession } from "@/lib/session";
import { getCompanyById } from "@/data/companies";

const NAV = [
  { href: "/utleier-admin", label: "Oversikt" },
  { href: "/utleier-admin/fl%C3%A5te", label: "Flåte" },
  { href: "/utleier-admin/annonser", label: "Annonser" },
  { href: "/utleier-admin/profil", label: "Profil" },
];

export default async function CompanyAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/demo-login?next=/utleier-admin");
  if (session.role !== "company") redirect("/");

  const company = session.companyId ? getCompanyById(session.companyId) : null;

  return (
    <DashboardShell
      title="Utleier-admin"
      nav={NAV}
      user={{
        name: session.name,
        role: company ? company.name : "Utleier",
      }}
    >
      {children}
    </DashboardShell>
  );
}
