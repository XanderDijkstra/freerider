import { blogEntries } from "@/data/blogEntries";
import { glossaryEntries } from "@/data/glossaryEntries";
import { seoCities, seoRoutes } from "@/data/seoPages";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap split into one child file per page template, listed by the /sitemap.xml index.
 * Each child is submitted separately in Search Console so the Page Indexing report can be
 * filtered per template. Example listings (/biler/[id]) and companies (/utleier/[slug])
 * are noindex while the data is mock, so they are left out.
 */

type ChangeFreq = "daily" | "weekly" | "monthly";
export type SitemapEntry = { url: string; priority: number; lastModified?: string; changeFrequency?: ChangeFreq };
export type SitemapGroup = { slug: string; entries: SitemapEntry[] };

const LAUNCH = "2026-10-20";

const latest = (dates: (string | undefined)[]) => dates.filter((d): d is string => !!d).sort().at(-1);

const u = (path: string, priority: number, lastModified?: string, changeFrequency?: ChangeFreq): SitemapEntry => ({
  url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  priority,
  ...(lastModified ? { lastModified } : {}),
  ...(changeFrequency ? { changeFrequency } : {}),
});

export function sitemapGroups(): SitemapGroup[] {
  const groups: SitemapGroup[] = [
    {
      // Home, keyword pillars, section indexes and static pages.
      slug: "sider",
      entries: [
        u("/", 1, LAUNCH, "weekly"),
        u("/gratis-leiebil", 0.9, LAUNCH, "weekly"),
        u("/kjore-bil-gratis", 0.9, LAUNCH, "weekly"),
        u("/enveis-leiebil", 0.8, LAUNCH),
        u("/jobb-flytte-biler", 0.7, LAUNCH),
        u("/biler", 0.7, undefined, "daily"),
        u("/utleiere", 0.5),
        u("/hvordan-fungerer-det", 0.7),
        u("/for-utleiere", 0.6),
        u("/miljo", 0.5),
        u("/blogg", 0.5, latest(blogEntries.map((e) => e.publishedAt))),
        u("/ordliste", 0.4),
        u("/kontakt", 0.3),
        u("/personvern", 0.2),
        u("/vilkar", 0.2),
      ],
    },
    { slug: "gratis-leiebil", entries: seoCities.map((c) => u(`/gratis-leiebil/${c.slug}`, 0.8, LAUNCH, "weekly")) },
    { slug: "kjore-bil-gratis", entries: seoRoutes.map((r) => u(`/kjore-bil-gratis/${r.slug}`, 0.8, LAUNCH, "weekly")) },
    { slug: "blogg", entries: blogEntries.map((e) => u(`/blogg/${e.slug}`, 0.6, e.publishedAt, "monthly")) },
    { slug: "ordliste", entries: glossaryEntries.map((e) => u(`/ordliste/${e.slug}`, 0.4)) },
  ];

  // Every URL must live in exactly one child; a duplicate fails the build.
  const seen = new Set<string>();
  for (const g of groups) {
    for (const e of g.entries) {
      if (seen.has(e.url)) throw new Error(`Sitemap: ${e.url} is listed in more than one child`);
      seen.add(e.url);
    }
  }
  return groups;
}

export const childSitemapUrl = (slug: string) => `${SITE_URL}/sitemaps/${slug}.xml`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function urlsetXml(entries: SitemapEntry[]): string {
  const urls = entries.map((e) =>
    [
      "<url>",
      `<loc>${esc(e.url)}</loc>`,
      e.lastModified ? `<lastmod>${e.lastModified}</lastmod>` : "",
      e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : "",
      `<priority>${e.priority}</priority>`,
      "</url>",
    ].filter(Boolean).join("\n"),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function indexXml(groups: SitemapGroup[]): string {
  const items = groups.map((g) => {
    const lastmod = latest(g.entries.map((e) => e.lastModified));
    return `<sitemap>\n<loc>${esc(childSitemapUrl(g.slug))}</loc>${lastmod ? `\n<lastmod>${lastmod}</lastmod>` : ""}\n</sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</sitemapindex>\n`;
}

export const xmlResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
