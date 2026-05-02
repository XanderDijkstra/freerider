import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Kontakt FreeRider.no",
  description:
    "Send oss en melding. For utleiere tilbyr vi 30-min demo. Sjåfører får svar innen 24 t.",
  alternates: { canonical: "/kontakt" },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <Container className="py-6 md:py-10">
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <header className="mt-3 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">
          Kontakt
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">
          Skriv hva du lurer på, så svarer vi. Sjåførsupport innen 24 t.
          Utleier-forespørsler innen én yrkesdag.
        </p>
      </header>

      {sent === "1" ? (
        <Card className="mt-6 p-4 bg-[color:var(--success)]/10 border-[color:var(--success)]/30 text-sm">
          Takk! Vi har mottatt meldingen din og svarer så snart vi kan.
        </Card>
      ) : null}

      <div className="mt-8 grid md:grid-cols-[1fr_320px] gap-8">
        <Card className="p-6">
          <form className="space-y-4" action="/kontakt" method="get">
            <input type="hidden" name="sent" value="1" />
            <Field label="Navn" htmlFor="name">
              <input id="name" name="name" className={inputClass} required />
            </Field>
            <Field label="E-post" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                className={inputClass}
                required
              />
            </Field>
            <Field label="Jeg er" htmlFor="role">
              <select id="role" name="role" className={inputClass}>
                <option value="driver">Sjåfør</option>
                <option value="company">Utleier</option>
                <option value="press">Presse</option>
                <option value="other">Annet</option>
              </select>
            </Field>
            <Field label="Melding" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${inputClass} h-auto py-2`}
                required
              />
            </Field>
            <Button type="submit">Send melding</Button>
            <p className="text-xs text-[color:var(--muted)]">
              Skjemaet blir koblet til Resend i produksjon. I demo-modus
              registreres ingen meldinger.
            </p>
          </form>
        </Card>
        <Card className="p-6 self-start">
          <h2 className="font-medium">FreeRider AS</h2>
          <address className="mt-2 not-italic text-sm text-[color:var(--muted)] space-y-1">
            <p>Storgata 1</p>
            <p>0155 Oslo</p>
            <p>Org.nr 000 000 000</p>
          </address>
          <div className="mt-4 text-sm">
            <p>
              <a
                href="mailto:hei@freerider.no"
                className="text-[color:var(--primary)] hover:underline"
              >
                hei@freerider.no
              </a>
            </p>
            <p className="text-[color:var(--muted)] mt-1">+47 21 00 00 00</p>
          </div>
        </Card>
      </div>
    </Container>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
