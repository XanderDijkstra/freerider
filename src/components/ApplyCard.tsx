import { CheckCircle2 } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button, LinkButton } from "./Button";
import { applyForListing } from "@/lib/auth-actions";
import { getSession } from "@/lib/session";
import { getRequestsForListing } from "@/data/store";
import type { Listing } from "@/data/types";
import { formatDate, formatTime } from "@/lib/format";

const inputClass =
  "block w-full h-10 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export async function ApplyCard({
  listing,
  compensationLabel,
}: {
  listing: Listing;
  compensationLabel: string;
}) {
  const session = await getSession();
  const requests = getRequestsForListing(listing.id);
  const myRequest = session
    ? requests.find((r) => r.driverId === session.userId)
    : undefined;

  const isAlreadyTaken = requests.some((r) => r.status === "approved");

  return (
    <Card className="p-5">
      <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
        Kompensasjon
      </p>
      <p className="mt-1 font-heading text-2xl font-semibold text-[color:var(--primary)]">
        {compensationLabel}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex gap-2 items-start">
          <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
          Full forsikring under hele turen
        </li>
        <li className="flex gap-2 items-start">
          <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
          Gratis kansellering inntil 24 t før
        </li>
        <li className="flex gap-2 items-start">
          <CheckCircle2 className="h-4 w-4 text-[color:var(--success)] mt-0.5" aria-hidden />
          Ingen skjulte gebyr
        </li>
      </ul>

      {/* Already applied */}
      {myRequest ? (
        <div className="mt-5 rounded-lg border border-[color:var(--border)] p-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Din søknad</p>
            <Badge
              tone={
                myRequest.status === "approved"
                  ? "success"
                  : myRequest.status === "rejected"
                    ? "error"
                    : myRequest.status === "cancelled"
                      ? "neutral"
                      : "warning"
              }
            >
              {myRequest.status === "approved"
                ? "Godkjent"
                : myRequest.status === "rejected"
                  ? "Avslått"
                  : myRequest.status === "cancelled"
                    ? "Kansellert"
                    : "Avventer"}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-[color:var(--muted)]">
            Sendt {formatDate(myRequest.createdAt)} · ønsket opphenting{" "}
            {formatDate(myRequest.preferredPickupAt)} kl.{" "}
            {formatTime(myRequest.preferredPickupAt)}
          </p>
          <LinkButton
            href="/dashboard/foresp%C3%B8rsler"
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
          >
            Se mine forespørsler
          </LinkButton>
        </div>
      ) : isAlreadyTaken ? (
        <div className="mt-5 rounded-lg border border-[color:var(--border)] p-4 text-sm text-[color:var(--muted)]">
          Denne annonsen er tildelt en annen sjåfør.
        </div>
      ) : !session ? (
        <>
          <LinkButton
            href={`/demo-login?next=/biler/${listing.id}`}
            size="lg"
            className="w-full mt-5"
          >
            Logg inn for å søke
          </LinkButton>
          <p className="mt-2 text-xs text-[color:var(--muted)] text-center">
            Krever konto. Tar 1 minutt å registrere.
          </p>
        </>
      ) : session.role !== "driver" ? (
        <p className="mt-5 text-sm text-[color:var(--muted)]">
          Bare sjåfører kan søke om annonser. Logg inn med en sjåfør-konto
          for å søke.
        </p>
      ) : (
        <form action={applyForListing} className="mt-5 space-y-3">
          <input type="hidden" name="listingId" value={listing.id} />
          <div>
            <label
              htmlFor="preferredPickupAt"
              className="block text-xs font-medium text-[color:var(--muted)] mb-1"
            >
              Ønsket opphenting
            </label>
            <input
              id="preferredPickupAt"
              name="preferredPickupAt"
              type="datetime-local"
              required
              defaultValue={listing.pickupStart.slice(0, 16)}
              min={listing.pickupStart.slice(0, 16)}
              max={listing.pickupEnd.slice(0, 16)}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-[color:var(--muted)] mb-1"
            >
              Melding (valgfritt)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={400}
              placeholder="Kort om hvorfor du passer for denne turen"
              className={`${inputClass} h-auto py-2`}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Søk om denne bilen
          </Button>
          <p className="text-xs text-[color:var(--muted)] text-center">
            Du kan trekke søknaden inntil utleier har godkjent.
          </p>
        </form>
      )}
    </Card>
  );
}
