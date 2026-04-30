import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import {
  glossaryEntries,
  getGlossaryEntry,
} from "@/data/glossaryEntries";
import {
  breadcrumbSchema,
  definedTermSchema,
} from "@/lib/seo";

export async function generateStaticParams() {
  return glossaryEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getGlossaryEntry(slug);
  if (!e) return { title: "Term ikke funnen" };
  return {
    title: `${e.term} — ordliste`,
    description: e.short,
    alternates: { canonical: `/ordliste/${e.slug}` },
  };
}

export default async function GlossaryTerm({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();
  const related = entry.related
    .map((s) => getGlossaryEntry(s))
    .filter(Boolean);

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Ordliste", href: "/ordliste" },
          { label: entry.term },
        ]}
      />
      <article className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          {entry.term}
        </h1>
        <p className="mt-3 text-base md:text-lg text-[color:var(--muted)] border-l-4 border-[color:var(--accent)] pl-4">
          {entry.short}
        </p>

        <div className="mt-8 space-y-4">
          {entry.body.split(/\n\n+/).map((para, idx) => (
            <p key={idx} className="text-[color:var(--foreground)]">
              {para}
            </p>
          ))}
        </div>

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold">Relaterte termer</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {related.map((r) =>
                r ? (
                  <Link
                    key={r.slug}
                    href={`/ordliste/${r.slug}`}
                    className="block group"
                  >
                    <Card className="p-4 group-hover:border-[color:var(--secondary)]">
                      <h3 className="font-medium group-hover:text-[color:var(--primary)]">
                        {r.term}
                      </h3>
                      <p className="text-sm text-[color:var(--muted)] mt-1">
                        {r.short}
                      </p>
                    </Card>
                  </Link>
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        <Card className="mt-12 p-6 grid md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <h2 className="font-heading text-lg font-semibold">
              Se hvordan det fungerer i praksis
            </h2>
            <p className="text-sm text-[color:var(--muted)] mt-1">
              Få kontekst på de aktuelle annonsene i markedet.
            </p>
          </div>
          <div className="flex md:justify-end">
            <LinkButton href="/biler" variant="secondary">
              Se ledige biler
            </LinkButton>
          </div>
        </Card>
      </article>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Ordliste", url: "/ordliste" },
            { name: entry.term, url: `/ordliste/${entry.slug}` },
          ]),
          definedTermSchema({
            name: entry.term,
            description: entry.short,
            url: `/ordliste/${entry.slug}`,
          }),
        ]}
      />
    </Container>
  );
}
