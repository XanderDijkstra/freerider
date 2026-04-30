import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
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
      <Card className="mt-6 p-6 md:p-8">
        <h1 className="font-heading text-2xl font-semibold text-center">
          Logg inn
        </h1>
        <p className="mt-2 text-sm text-[color:var(--muted)] text-center">
          Vi sender deg ein magisk lenke på e-post.
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
            />
          </div>
          <Button className="w-full" size="lg" type="submit">
            Send magisk lenke
          </Button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[color:var(--border)]" />
          <span className="text-xs text-[color:var(--muted)]">eller</span>
          <div className="flex-1 h-px bg-[color:var(--border)]" />
        </div>
        <Button variant="secondary" className="w-full" type="button">
          Fortsett med Google
        </Button>
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
