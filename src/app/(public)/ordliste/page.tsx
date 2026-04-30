import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { glossaryEntries } from "@/data/glossaryEntries";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ordliste — bilflytting og leiebil-termer",
  description:
    "Forklaringer av sentrale termer i bilflytting: relokering, einveisleie, flåtebalansering og flere.",
  alternates: { canonical: "/ordliste" },
};

export default function OrdlistePage() {
  const sorted = [...glossaryEntries].sort((a, b) =>
    a.term.localeCompare(b.term, "nb"),
  );
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Ordliste" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Ordliste
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">
          Sentrale termer i bilflytting og leiebil — forklart kort og presist.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((entry) => (
          <Link
            key={entry.slug}
            href={`/ordliste/${entry.slug}`}
            className="block group"
          >
            <Card className="p-5 h-full group-hover:border-[color:var(--secondary)]">
              <h2 className="font-heading text-lg font-semibold group-hover:text-[color:var(--primary)]">
                {entry.term}
              </h2>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {entry.short}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Ordliste", url: "/ordliste" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "FreeRider ordliste",
            url: absoluteUrl("/ordliste"),
            hasDefinedTerm: sorted.map((e) => ({
              "@type": "DefinedTerm",
              name: e.term,
              url: absoluteUrl(`/ordliste/${e.slug}`),
            })),
          },
        ]}
      />
    </Container>
  );
}
