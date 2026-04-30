import Link from "next/link";
import { Container } from "./Container";
import { LinkButton } from "./Button";
import { Logo } from "./Logo";
import { messages } from "@/lib/messages";

const NAV = [
  { href: "/biler", label: messages.nav.browse },
  { href: "/utleiere", label: messages.nav.companies },
  { href: "/hvordan-fungerer-det", label: messages.nav.howItWorks },
  { href: "/for-utleiere", label: messages.nav.forCompanies },
  { href: "/miljo", label: messages.nav.environment },
  { href: "/blogg", label: messages.nav.blog },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[color:var(--background)]/85 backdrop-blur border-b border-[color:var(--border)]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="FreeRider heim">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-[color:var(--foreground)] hover:text-[color:var(--primary)] rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/logg-inn" variant="ghost" size="sm" className="hidden sm:inline-flex">
            {messages.nav.login}
          </LinkButton>
          <LinkButton href="/registrer" variant="primary" size="sm">
            {messages.nav.register}
          </LinkButton>
        </div>
      </Container>
    </header>
  );
}
