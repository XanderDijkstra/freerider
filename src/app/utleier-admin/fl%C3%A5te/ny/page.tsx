import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button, LinkButton } from "@/components/Button";
import { addVehicleAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Legg til bil",
  robots: { index: false },
};

const inputClass =
  "block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]";

export default function LeggTilBilPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Legg til bil
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Registrer hver bil i flåten én gang. Du kan opprette annonser mot
          disse senere.
        </p>
      </header>

      <Card className="p-6">
        <form action={addVehicleAction} className="space-y-6">
          <Section title="Identifikasjon">
            <Grid>
              <Field label="Skilt" id="plate">
                <input id="plate" name="plate" className={inputClass} required />
              </Field>
            </Grid>
          </Section>

          <Section title="Spesifikasjoner">
            <Grid>
              <Field label="Merke" id="make">
                <input id="make" name="make" className={inputClass} required />
              </Field>
              <Field label="Modell" id="model">
                <input id="model" name="model" className={inputClass} required />
              </Field>
              <Field label="Årsmodell" id="year">
                <input
                  id="year"
                  name="year"
                  type="number"
                  min={1990}
                  max={2030}
                  defaultValue={2024}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Drivstoff" id="fuel">
                <select id="fuel" name="fuel" className={inputClass}>
                  <option value="petrol">Bensin</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Elbil</option>
                </select>
              </Field>
              <Field label="Girkasse" id="transmission">
                <select id="transmission" name="transmission" className={inputClass}>
                  <option value="manual">Manuell</option>
                  <option value="automatic">Automat</option>
                </select>
              </Field>
              <Field label="Sete" id="seats">
                <input
                  id="seats"
                  name="seats"
                  type="number"
                  min={2}
                  max={9}
                  defaultValue={5}
                  className={inputClass}
                />
              </Field>
            </Grid>
          </Section>

          <Section title="Funksjoner">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {["AC", "GPS", "Bluetooth", "Vinterdekk", "Tilhengerfeste", "Skiboks", "Barnesete"].map(
                (f) => (
                  <label key={f} className="flex items-center gap-2">
                    <input type="checkbox" name="features" value={f} />
                    {f}
                  </label>
                ),
              )}
            </div>
          </Section>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Publiser bil</Button>
            <LinkButton
              href="/utleier-admin/fl%C3%A5te"
              variant="secondary"
            >
              Avbryt
            </LinkButton>
          </div>
        </form>
      </Card>
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
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>;
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
