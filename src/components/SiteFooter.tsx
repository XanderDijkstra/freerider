import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { PreferredSourceButton } from "./PreferredSourceButton";

const FOOTER_LINKS = [
  {
    title: "Reis gratis",
    items: [
      { href: "/gratis-leiebil", label: "Gratis leiebil" },
      { href: "/kjore-bil-gratis", label: "Kjøre bil gratis" },
      { href: "/enveis-leiebil", label: "Enveis leiebil" },
      { href: "/jobb-flytte-biler", label: "Jobb med å flytte biler" },
    ],
  },
  {
    title: "Marked",
    items: [
      { href: "/biler", label: "Ledige biler" },
      { href: "/utleiere", label: "Utleiere" },
      { href: "/blogg", label: "Blogg" },
      { href: "/ordliste", label: "Ordliste" },
    ],
  },
  {
    title: "Lær mer",
    items: [
      { href: "/hvordan-fungerer-det", label: "Slik fungerer det" },
      { href: "/miljo", label: "Klimaeffekt" },
      { href: "/for-utleiere", label: "For utleiere" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Konto",
    items: [
      { href: "/logg-inn", label: "Logg inn" },
      { href: "/registrer", label: "Registrer deg" },
      { href: "/dashboard", label: "Sjåførpanel" },
      { href: "/utleier-admin", label: "Utleier-admin" },
    ],
  },
  {
    title: "Juridisk",
    items: [
      { href: "/personvern", label: "Personvern" },
      { href: "/vilkar", label: "Vilkår" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <Container className="py-10 md:py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          <div className="md:col-span-2 space-y-3">
            <Logo />
            <p className="text-sm text-[color:var(--muted)] max-w-sm">
              FreeRider.no kobler bilutleiere som trenger biler flyttet med
              sjåfører som vil reise gratis. Lavere kostnad, lavere CO₂.
            </p>
            <p className="text-xs text-[color:var(--muted)]">
              FreeRider.no drives av FX MEDIA AS · Org.nr. 930 724 548
            </p>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-[color:var(--foreground)] mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[color:var(--muted)] hover:text-[color:var(--primary)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-[color:var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[color:var(--muted)]">
          <p>© {new Date().getFullYear()} FX MEDIA AS. Alle rettigheter.</p>
          <div className="flex items-center gap-4">
            <PreferredSourceButton />
            <p>Laget i Norge.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
