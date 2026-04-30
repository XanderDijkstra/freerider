import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyCard } from "@/components/CompanyCard";
import { JsonLd } from "@/components/JsonLd";
import { companies } from "@/data/companies";
import { breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Utleiere på FreeRider.no",
  description:
    "Se alle bilutleiere som tilbyr relokeringsbiler på FreeRider.no. Hertz, Avis, Sixt, Budget og flere.",
  alternates: { canonical: "/utleiere" },
};

export default function UtleierePage() {
  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Utleiere" }]} />
      <header className="mt-3">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Utleiere
        </h1>
        <p className="mt-3 text-[color:var(--muted)] max-w-2xl">
          Hele bransjen samlet på ett sted. Følg en utleier for å få varsel når
          de legger ut nye biler i regionen din.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Hjem", url: "/" },
            { name: "Utleiere", url: "/utleiere" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Utleiere på FreeRider.no",
            url: absoluteUrl("/utleiere"),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: companies.length,
              itemListElement: companies.map((c, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: absoluteUrl(`/utleier/${c.slug}`),
                name: c.name,
              })),
            },
          },
        ]}
      />
    </Container>
  );
}
