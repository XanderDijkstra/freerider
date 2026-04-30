import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { JsonLd } from "@/components/JsonLd";
import { blogEntries } from "@/data/blogEntries";
import { formatDate } from "@/lib/format";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blogg om bilflytting og leiebil i Noreg",
  description:
    "Guidar, ruter, samanlikningar og bransje-innsikt om bilflytting og leigebil i Noreg.",
  alternates: { canonical: "/blogg" },
};

export default function BloggIndex() {
  const sorted = [...blogEntries].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Blogg" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Blogg
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">
          Vi skriv om ruter, klimaeffekt og kva som skjer i bilutleige-bransjen.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((entry) => (
          <Link
            key={entry.slug}
            href={`/blogg/${entry.slug}`}
            className="block group"
          >
            <Card className="p-5 h-full flex flex-col gap-3 group-hover:border-[color:var(--secondary)]">
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <h2 className="font-heading text-lg font-semibold group-hover:text-[color:var(--primary)]">
                {entry.title}
              </h2>
              <p className="text-sm text-[color:var(--muted)] line-clamp-3">
                {entry.description}
              </p>
              <p className="text-xs text-[color:var(--muted)] mt-auto">
                {formatDate(entry.publishedAt)} · {entry.author}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Heim", url: "/" },
            { name: "Blogg", url: "/blogg" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "FreeRider blogg",
            url: absoluteUrl("/blogg"),
            blogPost: sorted.map((e) => ({
              "@type": "BlogPosting",
              headline: e.title,
              datePublished: e.publishedAt,
              url: absoluteUrl(`/blogg/${e.slug}`),
            })),
          },
        ]}
      />
    </Container>
  );
}
