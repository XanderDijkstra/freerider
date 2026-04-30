import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { listings } from "@/data/listings";
import { companies } from "@/data/companies";
import { blogEntries } from "@/data/blogEntries";
import { glossaryEntries } from "@/data/glossaryEntries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/biler",
    "/utleiere",
    "/hvordan-fungerer-det",
    "/for-utleiere",
    "/miljo",
    "/blogg",
    "/ordliste",
    "/kontakt",
    "/personvern",
    "/vilkar",
    "/logg-inn",
    "/registrer",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const listingRoutes: MetadataRoute.Sitemap = listings
    .filter((l) => l.status === "published")
    .map((l) => ({
      url: `${SITE_URL}/biler/${l.id}`,
      lastModified: new Date(l.publishedAt),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  const companyRoutes: MetadataRoute.Sitemap = companies.map((c) => ({
    url: `${SITE_URL}/utleier/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogEntries.map((e) => ({
    url: `${SITE_URL}/blogg/${e.slug}`,
    lastModified: new Date(e.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryEntries.map((e) => ({
    url: `${SITE_URL}/ordliste/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...listingRoutes,
    ...companyRoutes,
    ...blogRoutes,
    ...glossaryRoutes,
  ];
}
