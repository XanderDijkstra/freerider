import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Registrer deg",
  description:
    "Registrer en konto på FreeRider.no - som sjåfør eller bilutleier.",
  alternates: { canonical: "/registrer" },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default async function RegistrerPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const isCompany = role === "company";
  return (
    <Container className="py-12 md:py-16 max-w-xl">
      <div className="text-center">
        <Logo />
      </div>
      <Card className="mt-6 p-6 md:p-8">
        <h1 className="font-heading text-2xl font-semibold text-center">
          Registrer deg
        </h1>
        <p className="mt-2 text-sm text-[color:var(--muted)] text-center">
          {isCompany
            ? "Utleier-konto. Vi godkjenner manuelt før første publisering."
            : "Sjåfør-konto. Aktivert med én gang via e-post."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 p-1 bg-[color:var(--background)] rounded-lg">
          <Link
            href="/registrer"
            className={`text-center text-sm py-2 rounded-md ${!isCompany ? "bg-[color:var(--primary)] text-white" : "text-[color:var(--muted)]"}`}
          >
            Sjåfør
          </Link>
          <Link
            href="/registrer?role=company"
            className={`text-center text-sm py-2 rounded-md ${isCompany ? "bg-[color:var(--primary)] text-white" : "text-[color:var(--muted)]"}`}
          >
            Utleier
          </Link>
        </div>

        <form className="mt-6 space-y-4">
          {isCompany ? (
            <>
              <Field label="Firmanavn" htmlFor="company">
                <input id="company" name="company" required className={inputClass} />
              </Field>
              <Field label="Org.nummer" htmlFor="org">
                <input id="org" name="org" required className={inputClass} />
              </Field>
            </>
          ) : (
            <>
              <Field label="Fullt navn" htmlFor="name">
                <input id="name" name="name" required className={inputClass} />
              </Field>
              <Field label="Førerkortnummer" htmlFor="license">
                <input id="license" name="license" required className={inputClass} />
              </Field>
            </>
          )}
          <Field label="E-post" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Telefon (+47…)" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={inputClass}
            />
          </Field>
          <label className="flex items-start gap-2 text-sm text-[color:var(--muted)]">
            <input type="checkbox" required className="mt-1" />
            <span>
              Jeg godtar{" "}
              <Link href="/vilkar" className="text-[color:var(--primary)] underline">
                vilkårene
              </Link>{" "}
              og{" "}
              <Link href="/personvern" className="text-[color:var(--primary)] underline">
                personvern
              </Link>
              .
            </span>
          </label>
          <Button className="w-full" size="lg" type="submit">
            Lag konto
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Allerede konto?{" "}
          <Link href="/logg-inn" className="text-[color:var(--primary)] underline">
            Logg inn
          </Link>
        </p>
      </Card>
    </Container>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
