export const SITE_URL = "https://freerider.no";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type JsonLdNode = Record<string, unknown>;

export function organizationSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreeRider.no",
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    sameAs: [],
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FreeRider.no",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/biler?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.url),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.author ?? "FreeRider redaksjon" },
    publisher: organizationSchema(),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
  };
}

export function definedTermSchema(opts: {
  name: string;
  description: string;
  url: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    inDefinedTermSet: absoluteUrl("/ordliste"),
  };
}

export function vehicleSchema(opts: {
  name: string;
  brand: string;
  model: string;
  modelYear: number;
  fuelType: string;
  vehicleTransmission: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: opts.name,
    brand: { "@type": "Brand", name: opts.brand },
    model: opts.model,
    vehicleModelDate: String(opts.modelYear),
    fuelType: opts.fuelType,
    vehicleTransmission: opts.vehicleTransmission,
  };
}

export function offerSchema(opts: {
  name: string;
  description: string;
  url: string;
  price: number;
  validFrom: string;
  validThrough: string;
  availability?: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    price: opts.price,
    priceCurrency: "NOK",
    validFrom: opts.validFrom,
    validThrough: opts.validThrough,
    availability:
      opts.availability ?? "https://schema.org/InStock",
  };
}
