import Link from "next/link";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-20 text-center max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--secondary)]">
            404
          </p>
          <h1 className="mt-2 font-heading text-4xl md:text-5xl font-semibold">
            Siden finnes ikke
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            Lenken er brutt, eller annonsen er fjernet. Prøv fra forsiden eller
            se alle ledige biler.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton href="/">Til forsiden</LinkButton>
            <LinkButton href="/biler" variant="secondary">
              Se ledige biler
            </LinkButton>
          </div>
          <p className="mt-8 text-xs text-[color:var(--muted)]">
            Eller gå til{" "}
            <Link href="/kontakt" className="underline">
              kontakt
            </Link>{" "}
            om noe er galt.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
