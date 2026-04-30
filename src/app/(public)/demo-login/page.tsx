import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Logo } from "@/components/Logo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { demoUsers } from "@/data/users";
import { getCompanyById } from "@/data/companies";
import { loginAsUser } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Demo-innlogging",
  description: "Logg inn som test-bruker for å se de tre rollene i FreeRider.",
  robots: { index: false },
  alternates: { canonical: "/demo-login" },
};

export default function DemoLoginPage() {
  const admin = demoUsers.filter((u) => u.role === "admin");
  const companies = demoUsers.filter((u) => u.role === "company");
  const drivers = demoUsers.filter((u) => u.role === "driver");

  return (
    <Container className="py-8 md:py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: "Demo-innlogging" }]} />
      <div className="mt-3 text-center">
        <Logo />
        <h1 className="mt-4 font-heading text-3xl md:text-4xl font-semibold">
          Demo-innlogging
        </h1>
        <p className="mt-3 text-[color:var(--muted)] max-w-xl mx-auto">
          Plattformen er enda ikke koblet til ekte autentisering. Velg en
          test-bruker under for å se hvordan rollene fungerer.
        </p>
      </div>

      <section className="mt-10 space-y-8">
        <RoleSection
          tone="primary"
          label="Plattform-admin"
          description="Full oversikt - godkjenn utleiere, suspendér brukere, se alle annonser og forespørsler."
        >
          {admin.map((u) => (
            <UserPickRow key={u.id} userId={u.id} title={u.name} subtitle={u.email} />
          ))}
        </RoleSection>

        <RoleSection
          tone="success"
          label="Utleier"
          description="Logg inn som ansvarlig hos en utleier. Du får tilgang til flåte, annonser og forespørsler."
        >
          {companies.map((u) => {
            const c = u.companyId ? getCompanyById(u.companyId) : undefined;
            return (
              <UserPickRow
                key={u.id}
                userId={u.id}
                title={u.name}
                subtitle={`${c?.name ?? "Utleier"} · ${u.email}`}
              />
            );
          })}
        </RoleSection>

        <RoleSection
          tone="eco"
          label="Sjåfør"
          description="Logg inn som sjåfør. Se egne forespørsler, følgde utleiere og varsler."
        >
          {drivers.map((u) => (
            <UserPickRow
              key={u.id}
              userId={u.id}
              title={u.name}
              subtitle={`${u.email} · ${u.licenseNumber ?? ""}`}
            />
          ))}
        </RoleSection>
      </section>

      <p className="mt-10 text-xs text-center text-[color:var(--muted)]">
        Demo-data resettes ved deploy. Mutasjoner (godkjenninger,
        suspenderinger) holdes i minne mens prosessen lever.
      </p>
    </Container>
  );
}

function RoleSection({
  label,
  description,
  tone,
  children,
}: {
  label: string;
  description: string;
  tone: "primary" | "success" | "eco";
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5 md:p-6">
      <div className="flex items-center gap-3">
        <Badge tone={tone}>{label}</Badge>
      </div>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{description}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">{children}</div>
    </Card>
  );
}

function UserPickRow({
  userId,
  title,
  subtitle,
}: {
  userId: string;
  title: string;
  subtitle: string;
}) {
  return (
    <form action={loginAsUser}>
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="w-full text-left p-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--secondary)] transition-colors"
      >
        <p className="font-medium text-[color:var(--foreground)]">{title}</p>
        <p className="text-xs text-[color:var(--muted)] mt-1">{subtitle}</p>
      </button>
    </form>
  );
}
