import { DashboardShell } from "@/components/DashboardShell";

const NAV = [
  { href: "/utleier-admin", label: "Oversikt" },
  { href: "/utleier-admin/fl%C3%A5te", label: "Flåte" },
  { href: "/utleier-admin/annonser", label: "Annonsar" },
  { href: "/utleier-admin/profil", label: "Profil" },
];

export default function CompanyAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      title="Utleigar-admin"
      nav={NAV}
      user={{ name: "Hertz Norge", role: "Company" }}
    >
      {children}
    </DashboardShell>
  );
}
