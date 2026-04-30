import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button, LinkButton } from "@/components/Button";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Logg inn",
  description: "Logg inn på FreeRider.no for å søke om relokeringsbil.",
  alternates: { canonical: "/logg-inn" },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default function LoggInnPage() {
  return (
    <Container className="py-12 md:py-16 max-w-md">
      <div className="text-center">
        <Logo />
      </div>
      <Card className="mt-6 p-5 bg-[color:var(--accent)]/30 border-[color:var(--accent)]">
        <p className="text-sm font-medium">Demo-modus</p>
        <p className="mt-1 text-xs text-[color:var(--muted)]">
          Plattformen kjører i demo-modus uten ekte autentisering. Bruk demo-innloggingen
          for å se de tre rollene.
        </p>
        <LinkButton href="/demo-login" variant="primary" size="sm" className="mt-3">
          Gå til demo-innlogging
        </LinkButton>
      </Card>
      <Card className="mt-6 p-6 md:p-8">
        <h1 className="font-heading text-2xl font-semibold text-center">
          Logg inn
        </h1>
        <p className="mt-2 text-sm text-[color:var(--muted)] text-center">
          Vi sender deg en magisk lenke på e-post.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="ola@nordmann.no"
              disabled
            />
          </div>
          <Button className="w-full" size="lg" type="submit" disabled>
            Send magisk lenke
          </Button>
          <p className="text-xs text-center text-[color:var(--muted)]">
            Aktiveres når Supabase Auth er koblet til.
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Ingen konto?{" "}
          <Link
            href="/registrer"
            className="text-[color:var(--primary)] underline"
          >
            Registrer deg
          </Link>
        </p>
      </Card>
    </Container>
  );
}
