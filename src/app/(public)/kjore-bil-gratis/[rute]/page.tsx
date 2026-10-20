import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { SignupCta } from "@/components/SignupCta";
import { PreferredSourceCard } from "@/components/PreferredSourceButton";
import {
  cityName,
  formatHours,
  getSeoCity,
  getSeoRoute,
  seoRoutes,
} from "@/data/seoPages";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return seoRoutes.map((r) => ({ rute: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rute: string }>;
}): Promise<Metadata> {
  const { rute } = await params;
  const route = getSeoRoute(rute);
  if (!route) return { title: "Strekning ikke funnet" };
  const from = cityName(route.from);
  const to = cityName(route.to);
  return {
    title: `Kjøre bil gratis fra ${from} til ${to}`,
    description: `Kjør leiebil gratis fra ${from} til ${to} (${route.distanceKm} km, ${formatHours(route.driveHours)}). Slik finner du ledige biler på strekningen, og hva du bør vite før du kjører.`,
    alternates: { canonical: `/kjore-bil-gratis/${route.slug}` },
  };
}

export default async function RutePage({
  params,
}: {
  params: Promise<{ rute: string }>;
}) {
  const { rute } = await params;
  const route = getSeoRoute(rute);
  if (!route) notFound();
  const from = cityName(route.from);
  const to = cityName(route.to);
  const related = seoRoutes.filter(
    (r) =>
      r.slug !== route.slug &&
      [r.from, r.to].some((c) => c === route.from || c === route.to),
  );

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Kjøre bil gratis", href: "/kjore-bil-gratis" },
          { label: `${from} – ${to}` },
        ]}
      />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Kjøre bil gratis fra {from} til {to}
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          Utleiere trenger jevnlig biler flyttet mellom {from} og {to}, i
          begge retninger. Skal du samme vei, kan du kjøre bilen uten å betale
          leie.
        </p>
      </header>

      <section className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl">
        <Card className="p-5">
          <p className="text-sm text-[color:var(--muted)]">Avstand</p>
          <p className="mt-1 text-xl font-semibold">ca. {route.distanceKm} km</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-[color:var(--muted)]">Kjøretid uten pauser</p>
          <p className="mt-1 text-xl font-semibold">{formatHours(route.driveHours)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-[color:var(--muted)]">Ferje</p>
          <p className="mt-1 text-xl font-semibold">
            {route.ferry ? "Ja, underveis" : "Nei"}
          </p>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Om strekningen
        </h2>
        <p>{route.note}</p>
        <p>
          Kjøretiden er uten pauser. Planlegg inn hvile, og sjekk vær og
          veimeldinger før du kjører. Bompenger kommer i tillegg med mindre
          oppdraget sier at de er dekket
          {route.ferry ? ", og det samme gjelder ferjebilletten" : ""}.
        </p>
      </section>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Slik får du en gratis bil fra {from} til {to}
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Registrer deg som sjåfør på FreeRider.no.</li>
          <li>Legg inn {from} og {to} som byer du reiser mellom.</li>
          <li>Få varsel når en bil skal på strekningen.</li>
          <li>Søk, hent bilen og lever den innen fristen.</li>
        </ol>
        <p>
          Se også{" "}
          {[route.from, route.to]
            .filter((slug) => getSeoCity(slug))
            .map((slug, idx) => (
              <span key={slug}>
                {idx > 0 ? " og " : ""}
                <Link className="text-[color:var(--primary)] underline" href={`/gratis-leiebil/${slug}`}>
                  gratis leiebil {cityName(slug)}
                </Link>
              </span>
            ))}
          .
        </p>
      </section>

      <SignupCta
        title={`Få varsel om biler ${from} – ${to}`}
        body="Registrer deg gratis, så sier vi fra når en utleier trenger en sjåfør på denne strekningen."
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold">Andre strekninger</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((r) => (
              <li key={r.slug}>
                <Link className="text-[color:var(--primary)] hover:underline" href={`/kjore-bil-gratis/${r.slug}`}>
                  {cityName(r.from)} – {cityName(r.to)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Kjøre bil gratis", url: "/kjore-bil-gratis" },
            { name: `${from} – ${to}`, url: `/kjore-bil-gratis/${route.slug}` },
          ]),
          articleSchema({
            headline: `Kjøre bil gratis fra ${from} til ${to}`,
            description: route.note,
            url: `/kjore-bil-gratis/${route.slug}`,
            datePublished: "2026-10-20",
          }),
        ]}
      />
    </Container>
  );
}
