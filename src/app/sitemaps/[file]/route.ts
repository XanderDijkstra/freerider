import { sitemapGroups, urlsetXml, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return sitemapGroups().map((g) => ({ file: `${g.slug}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const group = sitemapGroups().find((g) => `${g.slug}.xml` === file);
  if (!group) return new Response("Not found", { status: 404 });
  return xmlResponse(urlsetXml(group.entries));
}
