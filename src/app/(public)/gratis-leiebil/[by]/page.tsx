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
  routesForCity,
  seoCities,
} from "@/data/seoPages";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return seoCities.map((c) => ({ by: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ by: string }>;
}): Promise<Metadata> {
  const { by } = await params;
  const city = getSeoCity(by);
  if (!city) return { title: "By ikke funnet" };
  return {
    title: `Gratis leiebil ${city.name} - kjør gratis til og fra ${city.name}`,
    description: `Slik får du gratis leiebil i ${city.name}. Utleiere trenger biler flyttet til og fra ${city.name} - du kjører gratis. Strekninger, tips og vilkår.`,
    alternates: { canonical: `/gratis-leiebil/${city.slug}` },
  };
}

export default async function GratisLeiebilByPage({
  params,
}: {
  params: Promise<{ by: string }>;
}) {
  const { by } = await params;
  const city = getSeoCity(by);
  if (!city) notFound();
  const routes = routesForCity(city.slug);
  const others = seoCities.filter((c) => c.slug !== city.slug);

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Gratis leiebil", href: "/gratis-leiebil" },
          { label: city.name },
        ]}
      />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-semibold">
          Gratis leiebil {city.name}
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--muted)]">
          {city.intro}
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Når trengs det sjåfører i {city.name}?
        </h2>
        <p>{city.season}</p>
        <p>
          Bilene hentes som regel på en av utleiernes stasjoner i sentrum eller
          på {city.airport}. Hvor du henter og leverer står i hvert oppdrag.
        </p>
      </section>

      {routes.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold">
            Strekninger til og fra {city.name}
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {routes.map((r) => (
              <Link key={r.slug} href={`/kjore-bil-gratis/${r.slug}`}>
                <Card className="p-5 h-full hover:border-[color:var(--primary)]">
                  <p className="font-medium">
                    {cityName(r.from)} – {cityName(r.to)}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    {r.distanceKm} km · {formatHours(r.driveHours)}
                    {r.ferry ? " · ferje" : ""}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 max-w-3xl space-y-3 text-[color:var(--muted)]">
        <h2 className="font-heading text-2xl font-semibold text-[color:var(--foreground)]">
          Slik får du gratis leiebil fra {city.name}
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Registrer deg som sjåfør på FreeRider.no.</li>
          <li>Velg {city.name} som by du vil reise fra eller til.</li>
          <li>Få varsel når en utleier legger ut en bil på strekningen.</li>
          <li>Søk på oppdraget, hent bilen og lever den innen fristen.</li>
        </ol>
        <p>
          Les mer om{" "}
          <Link className="text-[color:var(--primary)] underline" href="/gratis-leiebil">
            hvordan gratis leiebil fungerer
          </Link>{" "}
          og hva du bør sjekke før du kjører.
        </p>
      </section>

      <SignupCta
        title={`Få varsel om gratis leiebil i ${city.name}`}
        body={`Registrer deg, så sier vi fra når det kommer biler som skal til eller fra ${city.name}.`}
      />

      <div className="mt-8">
        <PreferredSourceCard />
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold">Andre byer</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {others.map((c) => (
            <li key={c.slug}>
              <Link className="text-[color:var(--primary)] hover:underline" href={`/gratis-leiebil/${c.slug}`}>
                Gratis leiebil {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Gratis leiebil", url: "/gratis-leiebil" },
            { name: city.name, url: `/gratis-leiebil/${city.slug}` },
          ]),
          articleSchema({
            headline: `Gratis leiebil ${city.name}`,
            description: city.intro,
            url: `/gratis-leiebil/${city.slug}`,
            datePublished: "2026-10-20",
          }),
        ]}
      />
    </Container>
  );
}
