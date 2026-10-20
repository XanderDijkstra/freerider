import { Card } from "./Card";
import { LinkButton } from "./Button";

export function SignupCta({ title, body }: { title: string; body: string }) {
  return (
    <Card className="mt-12 p-6 md:p-8">
      <h2 className="font-heading text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-[color:var(--muted)]">{body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <LinkButton href="/registrer">Registrer deg gratis</LinkButton>
        <LinkButton href="/hvordan-fungerer-det" variant="outline">
          Slik fungerer det
        </LinkButton>
      </div>
    </Card>
  );
}
