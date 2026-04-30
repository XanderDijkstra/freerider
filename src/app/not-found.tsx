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
            Sida finst ikkje
          </h1>
          <p className="mt-4 text-[color:var(--muted)]">
            Lenka er broten, eller annonsen er fjerna. Prøv frå framsida eller
            sjå alle ledige biler.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton href="/">Til framsida</LinkButton>
            <LinkButton href="/biler" variant="secondary">
              Sjå ledige biler
            </LinkButton>
          </div>
          <p className="mt-8 text-xs text-[color:var(--muted)]">
            Eller gå til{" "}
            <Link href="/kontakt" className="underline">
              kontakt
            </Link>{" "}
            om noko er galt.
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
