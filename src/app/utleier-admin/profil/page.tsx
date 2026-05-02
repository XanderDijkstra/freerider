import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { getSession } from "@/lib/session";
import { getCompanyById } from "@/data/companies";
import { getCompanyProfile } from "@/data/store";
import { saveCompanyProfile } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Profil",
  robots: { index: false },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await getSession();
  const companyId = session?.companyId ?? "c-hertz";
  const company = getCompanyById(companyId);
  const profile = getCompanyProfile(companyId);
  const { saved } = await searchParams;

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Profil
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Slik ser FreeRider-siden din ut for sjåfører.
        </p>
      </header>

      {saved === "1" ? (
        <Card className="p-4 bg-[color:var(--success)]/10 border-[color:var(--success)]/30 text-sm">
          Profilen er lagret.
        </Card>
      ) : null}

      <Card className="p-6">
        <form action={saveCompanyProfile} className="space-y-4">
          <Field label="Firmanavn">
            <input
              className={`${inputClass} bg-[color:var(--background)] cursor-not-allowed`}
              defaultValue={company?.name ?? ""}
              disabled
            />
            <p className="text-xs text-[color:var(--muted)] mt-1">
              Firmanavn endres av plattform-admin.
            </p>
          </Field>
          <Field label="Beskrivelse">
            <textarea
              name="description"
              rows={4}
              className={`${inputClass} h-auto py-2`}
              defaultValue={profile?.description ?? company?.description ?? ""}
              required
            />
          </Field>
          <Field label="Kontakt-e-post">
            <input
              type="email"
              name="contactEmail"
              className={inputClass}
              defaultValue={profile?.contactEmail ?? ""}
              required
            />
          </Field>
          <Field label="Telefon">
            <input
              type="tel"
              name="contactPhone"
              className={inputClass}
              defaultValue={profile?.contactPhone ?? ""}
              required
            />
          </Field>
          <Button type="submit">Lagre profil</Button>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}
