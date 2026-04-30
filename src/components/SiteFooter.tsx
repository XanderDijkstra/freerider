import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

const FOOTER_LINKS = [
  {
    title: "Marknad",
    items: [
      { href: "/biler", label: "Ledige biler" },
      { href: "/utleiere", label: "Utleiere" },
      { href: "/blogg", label: "Blogg" },
      { href: "/ordliste", label: "Ordliste" },
    ],
  },
  {
    title: "Lær meir",
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
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-3">
            <Logo />
            <p className="text-sm text-[color:var(--muted)] max-w-sm">
              FreeRider.no koblar bilutleiere som treng biler flytta med
              sjåfører som vil reise gratis. Lågare kostnad, lågare CO₂.
            </p>
            <p className="text-xs text-[color:var(--muted)]">
              FreeRider AS · Org.nr. 000 000 000 · Oslo, Noreg
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
          <p>© {new Date().getFullYear()} FreeRider AS. Alle rettar.</p>
          <p>Laga i Noreg.</p>
        </div>
      </Container>
    </footer>
  );
}
