import { DashboardShell } from "@/components/DashboardShell";

const NAV = [
  { href: "/dashboard", label: "Oversikt" },
  { href: "/dashboard/forespørsler", label: "Forespørsler" },
  { href: "/dashboard/varsler", label: "Varsel" },
];

export default function DriverDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      title="Sjåførpanel"
      nav={NAV}
      user={{ name: "Demo Sjåfør", role: "Driver" }}
    >
      {children}
    </DashboardShell>
  );
}
