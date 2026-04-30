import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Profil",
  robots: { index: false },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default function ProfilPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Profil
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Slik ser FreeRider-sida di ut for sjåførar.
        </p>
      </header>
      <Card className="p-6">
        <form className="space-y-4">
          <Field label="Firmanamn">
            <input className={inputClass} defaultValue="Hertz Norge" />
          </Field>
          <Field label="Beskriving">
            <textarea rows={4} className={`${inputClass} h-auto py-2`} defaultValue="Hertz har 80 stasjoner i Noreg ..." />
          </Field>
          <Field label="Kontakt-e-post">
            <input type="email" className={inputClass} defaultValue="kontakt@hertz.no" />
          </Field>
          <Field label="Telefon">
            <input className={inputClass} defaultValue="+47 21 00 00 00" />
          </Field>
          <Button>Lagre profil</Button>
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
