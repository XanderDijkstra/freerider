import { DashboardShell } from "@/components/DashboardShell";

const NAV = [
  { href: "/admin", label: "Oversikt" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      title="Plattform-admin"
      nav={NAV}
      user={{ name: "Admin", role: "Platform" }}
    >
      {children}
    </DashboardShell>
  );
}
