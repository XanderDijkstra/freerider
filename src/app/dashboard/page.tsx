import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, X } from "lucide-react";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button, LinkButton } from "@/components/Button";
import { ListingCard } from "@/components/ListingCard";
import {
  getDriverFavoriteLocations,
  getFollowedCompanyIds,
  getRequestsForDriver,
  publishedListingsLive,
} from "@/data/store";
import { computeCo2Saved } from "@/lib/co2";
import { formatKg } from "@/lib/format";
import { getSession } from "@/lib/session";
import { getVehicleById } from "@/data/vehicles";
import { getCompanyById } from "@/data/companies";
import {
  addFavoriteLocation,
  removeFavoriteLocation,
  unfollowCompanyAction,
} from "@/lib/auth-actions";
import { listingsByCompany } from "@/data/listings";

export const metadata: Metadata = {
  title: "Sjåførpanel",
  robots: { index: false },
};

export default async function DriverDashboard() {
  const session = await getSession();
  const userId = session?.userId ?? "";
  const firstName = session?.name.split(" ")[0] ?? "der";

  const all = publishedListingsLive();
  const favorites = userId ? getDriverFavoriteLocations(userId) : [];
  const requests = getRequestsForDriver(userId);
  const followedIds = getFollowedCompanyIds(userId);

  const cityOptions = Array.from(
    new Set(all.flatMap((l) => [l.fromCity, l.toCity])),
  )
    .filter((c) => !favorites.includes(c))
    .sort((a, b) => a.localeCompare(b, "nb"));

  const matching =
    favorites.length > 0
      ? all.filter(
          (l) => favorites.includes(l.fromCity) || favorites.includes(l.toCity),
        )
      : [];

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;

  // CO2 contribution = sum from approved requests
  const co2SavedKg = requests
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => {
      const listing = all.find((l) => l.id === r.listingId);
      if (!listing) return sum;
      const v = getVehicleById(listing.vehicleId);
      if (!v) return sum;
      return (
        sum +
        computeCo2Saved({
          distanceKm: listing.distanceKm,
          fuelType: v.fuelType,
        }).savedKg
      );
    }, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Hei {firstName}, klar for en tur?
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Se dine aktive forespørsler, nye annonser som matcher
          favorittstedene dine, og total CO₂-besparing du har bidratt med.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Aktive forespørsler
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">
            {pendingCount + approvedCount}
          </p>
          <p className="text-xs text-[color:var(--muted)] mt-1">
            {approvedCount} godkjent · {pendingCount} avventer
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            Følgde utleiere
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold">
            {followedIds.length}
          </p>
          <p className="text-xs text-[color:var(--muted)] mt-1">
            Få varsel når de publiserer nytt
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-[color:var(--muted)]">
            CO₂ spart med deg
          </p>
          <p className="mt-1 font-heading text-2xl font-semibold text-[color:var(--primary)]">
            {formatKg(co2SavedKg)}
          </p>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-heading text-xl font-semibold">
              Favorittsteder
            </h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              Legg til byer du gjerne reiser til eller fra. Vi viser alle
              aktive annonser som starter eller ender der.
            </p>
          </div>
          <Badge tone="eco">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {favorites.length} {favorites.length === 1 ? "sted" : "steder"}
          </Badge>
        </div>

        <Card className="mt-4 p-5 space-y-4">
          {favorites.length === 0 ? (
            <p className="text-sm text-[color:var(--muted)]">
              Ingen favorittsteder enda. Legg til Bergen, Oslo eller andre byer
              under for å se matchende annonser.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {favorites.map((city) => (
                <li key={city}>
                  <form action={removeFavoriteLocation}>
                    <input type="hidden" name="city" value={city} />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-full pl-3 pr-2 py-1.5 text-sm bg-[color:var(--accent)]/40 text-[color:var(--primary)] border border-[color:var(--accent)] hover:bg-[color:var(--accent)] transition-colors"
                      aria-label={`Fjern ${city}`}
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {city}
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}

          <form
            action={addFavoriteLocation}
            className="flex flex-wrap items-end gap-3 pt-2 border-t border-[color:var(--border)]"
          >
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="city"
                className="block text-xs font-medium text-[color:var(--muted)] mb-1"
              >
                Legg til favorittsted
              </label>
              <select
                id="city"
                name="city"
                required
                defaultValue=""
                className="block w-full h-10 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]"
              >
                <option value="" disabled>
                  Velg by …
                </option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Legg til</Button>
          </form>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-heading text-xl font-semibold">
            {favorites.length === 0
              ? "Anbefalt for deg"
              : "Annonser som matcher favorittene dine"}
          </h2>
          <LinkButton href="/biler" variant="secondary" size="sm">
            Se alle annonser
          </LinkButton>
        </div>
        {favorites.length === 0 ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {all.slice(0, 2).map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : matching.length === 0 ? (
          <Card className="mt-4 p-6 text-sm text-[color:var(--muted)]">
            Ingen aktive annonser matcher favorittene dine akkurat nå. Vi
            varsler deg så snart noe dukker opp.
          </Card>
        ) : (
          <>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {matching.length}{" "}
              {matching.length === 1 ? "annonse" : "annonser"} fra eller til{" "}
              {favorites.join(", ")}.
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {matching.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold">Følgde utleiere</h2>
        {followedIds.length === 0 ? (
          <Card className="mt-4 p-5 text-sm text-[color:var(--muted)]">
            Du følger ingen utleiere enda. Gå til{" "}
            <Link href="/utleiere" className="text-[color:var(--primary)] underline">
              utleier-oversikten
            </Link>{" "}
            og klikk &quot;Følg&quot; for å få varsel ved nye annonser.
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {followedIds.map((id) => {
              const c = getCompanyById(id);
              if (!c) return null;
              const activeCount = listingsByCompany(id).length;
              return (
                <Card
                  key={id}
                  className="p-5 flex items-center justify-between flex-wrap gap-3"
                >
                  <div>
                    <Link
                      href={`/utleier/${c.slug}`}
                      className="font-medium hover:text-[color:var(--primary)]"
                    >
                      {c.name}
                    </Link>
                    <p className="text-sm text-[color:var(--muted)]">
                      {activeCount} aktive annonser
                    </p>
                  </div>
                  <form action={unfollowCompanyAction}>
                    <input type="hidden" name="companyId" value={id} />
                    <Button variant="secondary" size="sm" type="submit">
                      Slutt å følge
                    </Button>
                  </form>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
