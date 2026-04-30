import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { getSession } from "@/lib/session";

const NAV = [
  { href: "/admin", label: "Oversikt" },
  { href: "/admin/utleiere", label: "Utleiere" },
  { href: "/admin/brukere", label: "Brukere" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/demo-login?next=/admin");
  if (session.role !== "admin") redirect("/");

  return (
    <DashboardShell
      title="Plattform-admin"
      nav={NAV}
      user={{ name: session.name, role: "Admin" }}
    >
      {children}
    </DashboardShell>
  );
}
