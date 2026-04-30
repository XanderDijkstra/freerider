import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

export interface NavItem {
  href: string;
  label: string;
}

export function DashboardShell({
  title,
  nav,
  user,
  children,
}: {
  title: string;
  nav: NavItem[];
  user: { name: string; role: string };
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--border)] bg-[color:var(--surface)]">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Til offentlig side">
            <Logo />
          </Link>
          <div className="text-sm text-[color:var(--muted)] hidden sm:block">
            {title}
          </div>
          <div className="text-sm text-[color:var(--muted)]">
            {user.name} · <span className="text-xs">{user.role}</span>
          </div>
        </Container>
      </header>
      <Container className="py-6 md:py-10 grid lg:grid-cols-[220px_1fr] gap-8 flex-1">
        <aside className="lg:sticky lg:top-6 self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-md text-sm text-[color:var(--foreground)] hover:bg-[color:var(--accent)]/40 hover:text-[color:var(--primary)] whitespace-nowrap"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}
