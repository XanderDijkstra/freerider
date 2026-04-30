import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import {
  blogEntries,
  getBlogEntry,
  recentBlogEntries,
} from "@/data/blogEntries";
import { formatDate } from "@/lib/format";
import {
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export async function generateStaticParams() {
  return blogEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getBlogEntry(slug);
  if (!e) return { title: "Artikkel ikke funnet" };
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/blogg/${e.slug}` },
  };
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getBlogEntry(slug);
  if (!entry) notFound();

  const related = recentBlogEntries(4).filter((e) => e.slug !== entry.slug).slice(0, 3);

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs
        items={[
          { label: "Blogg", href: "/blogg" },
          { label: entry.title },
        ]}
      />

      <article className="mt-3 max-w-3xl mx-auto">
        <header>
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-3 font-heading text-3xl md:text-5xl font-semibold leading-tight">
            {entry.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-[color:var(--muted)] border-l-4 border-[color:var(--accent)] pl-4">
            {entry.description}
          </p>
          <p className="mt-4 text-sm text-[color:var(--muted)]">
            {formatDate(entry.publishedAt)} · {entry.author}
          </p>
        </header>

        <div className="mt-8 space-y-5 text-[color:var(--foreground)] leading-relaxed">
          {entry.body.split(/\n\n+/).map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="mt-12">
          <Card className="p-6 grid md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2">
              <h2 className="font-heading text-xl font-semibold">
                Klar for en gratis biltur?
              </h2>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                Se hva ledige biler som finnes akkurat nå.
              </p>
            </div>
            <div className="flex md:justify-end">
              <LinkButton href="/biler">Se ledige biler</LinkButton>
            </div>
          </Card>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-14 max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-semibold">Les mer</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((e) => (
              <Link
                key={e.slug}
                href={`/blogg/${e.slug}`}
                className="block group"
              >
                <Card className="p-5 h-full group-hover:border-[color:var(--secondary)]">
                  <h3 className="font-medium group-hover:text-[color:var(--primary)]">
                    {e.title}
                  </h3>
                  <p className="text-xs text-[color:var(--muted)] mt-2">
                    {formatDate(e.publishedAt)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Blogg", url: "/blogg" },
            { name: entry.title, url: `/blogg/${entry.slug}` },
          ]),
          articleSchema({
            headline: entry.title,
            description: entry.description,
            url: `/blogg/${entry.slug}`,
            datePublished: entry.publishedAt,
            author: entry.author,
          }),
        ]}
      />
    </Container>
  );
}
