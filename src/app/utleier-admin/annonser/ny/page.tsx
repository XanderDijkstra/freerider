import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button, LinkButton } from "@/components/Button";
import { createListingAction } from "@/lib/auth-actions";
import { getSession } from "@/lib/session";
import { vehiclesForCompany } from "@/data/store";

export const metadata: Metadata = {
  title: "Ny annonse",
  robots: { index: false },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

function isoDateLocalDefault(daysAhead: number, hour: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString().slice(0, 16);
}

export default async function NyAnnonsePage() {
  const session = await getSession();
  const fleet = session?.companyId ? vehiclesForCompany(session.companyId) : [];

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Ny annonse
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Velg bil, sett rute og dato, og publiser. Du kan endre detaljer
          etterpå.
        </p>
      </header>

      {fleet.length === 0 ? (
        <Card className="p-6 text-sm space-y-3">
          <p className="text-[color:var(--muted)]">
            Du må legge til en bil i flåten før du kan opprette en annonse.
          </p>
          <LinkButton href="/utleier-admin/fl%C3%A5te/ny">
            Legg til bil
          </LinkButton>
        </Card>
      ) : (
        <Card className="p-6">
          <form action={createListingAction} className="space-y-6">
            <Section title="Bil">
              <Field label="Velg bil fra flåten" id="vehicleId">
                <select
                  id="vehicleId"
                  name="vehicleId"
                  required
                  className={inputClass}
                  defaultValue={fleet[0]?.id}
                >
                  {fleet.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.make} {v.model} ({v.year}) · {v.plate}
                    </option>
                  ))}
                </select>
              </Field>
            </Section>

            <Section title="Rute">
              <Grid>
                <Field label="Fra by" id="fromCity">
                  <input
                    id="fromCity"
                    name="fromCity"
                    required
                    placeholder="Oslo"
                    className={inputClass}
                  />
                </Field>
                <Field label="Til by" id="toCity">
                  <input
                    id="toCity"
                    name="toCity"
                    required
                    placeholder="Bergen"
                    className={inputClass}
                  />
                </Field>
                <Field label="Distanse (km)" id="distanceKm">
                  <input
                    id="distanceKm"
                    name="distanceKm"
                    type="number"
                    min={1}
                    required
                    defaultValue={480}
                    className={inputClass}
                  />
                </Field>
              </Grid>
            </Section>

            <Section title="Datoer">
              <Grid>
                <Field label="Tidligste opphenting" id="pickupStart">
                  <input
                    id="pickupStart"
                    name="pickupStart"
                    type="datetime-local"
                    required
                    defaultValue={isoDateLocalDefault(2, 8)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Seneste opphenting" id="pickupEnd">
                  <input
                    id="pickupEnd"
                    name="pickupEnd"
                    type="datetime-local"
                    required
                    defaultValue={isoDateLocalDefault(3, 18)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Leveringsfrist" id="dropoffDeadline">
                  <input
                    id="dropoffDeadline"
                    name="dropoffDeadline"
                    type="datetime-local"
                    required
                    defaultValue={isoDateLocalDefault(4, 20)}
                    className={inputClass}
                  />
                </Field>
              </Grid>
            </Section>

            <Section title="Regler">
              <Grid>
                <Field label="Drivstoff" id="fuelPolicy">
                  <select
                    id="fuelPolicy"
                    name="fuelPolicy"
                    className={inputClass}
                    defaultValue="returnAsReceived"
                  >
                    <option value="returnFull">Lever med full tank</option>
                    <option value="returnAsReceived">Lever som mottatt</option>
                    <option value="companyPays">Utleier dekker</option>
                  </select>
                </Field>
                <Field label="Ferje" id="ferryPolicy">
                  <select
                    id="ferryPolicy"
                    name="ferryPolicy"
                    className={inputClass}
                    defaultValue="covered"
                  >
                    <option value="covered">Dekket</option>
                    <option value="notCovered">Ikke dekket</option>
                    <option value="partial">Delvis dekket</option>
                  </select>
                </Field>
              </Grid>
            </Section>

            <Section title="Kompensasjon">
              <Grid>
                <Field label="Type" id="compensation">
                  <select
                    id="compensation"
                    name="compensation"
                    className={inputClass}
                    defaultValue="free"
                  >
                    <option value="free">Gratis</option>
                    <option value="fuelCard">Drivstoffkort</option>
                    <option value="tollsAndFerries">Bom + ferje dekket</option>
                    <option value="flat">Flatt honorar (kr)</option>
                  </select>
                </Field>
                <Field label="Honorar (kr) - kun ved flatt" id="flatAmount">
                  <input
                    id="flatAmount"
                    name="flatAmount"
                    type="number"
                    min={0}
                    defaultValue={500}
                    className={inputClass}
                  />
                </Field>
              </Grid>
            </Section>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Publiser annonse</Button>
              <LinkButton
                href="/utleier-admin/annonser"
                variant="secondary"
              >
                Avbryt
              </LinkButton>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-[color:var(--foreground)]">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-3">{children}</div>;
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-[color:var(--muted)] mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
