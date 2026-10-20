import { indexXml, sitemapGroups, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

// /sitemap.xml is the index; the URLs live in the per-template children under /sitemaps/.
export function GET() {
  return xmlResponse(indexXml(sitemapGroups()));
}
