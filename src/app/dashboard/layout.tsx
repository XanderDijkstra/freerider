import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { getSession } from "@/lib/session";

const NAV = [
  { href: "/dashboard", label: "Oversikt" },
  { href: "/dashboard/foresp%C3%B8rsler", label: "Forespørsler" },
  { href: "/dashboard/varsler", label: "Varsel" },
];

export default async function DriverDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/demo-login?next=/dashboard");
  if (session.role !== "driver") redirect("/");

  return (
    <DashboardShell
      title="Sjåførpanel"
      nav={NAV}
      user={{ name: session.name, role: "Sjåfør" }}
    >
      {children}
    </DashboardShell>
  );
}
