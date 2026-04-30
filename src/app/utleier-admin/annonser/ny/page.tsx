import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Ny annonse",
  robots: { index: false },
};

const STEPS = [
  "Velg bil",
  "Rute",
  "Datoer",
  "Regler",
  "Kompensasjon",
  "Forhåndsvisning",
];

export default function NyAnnonsePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Ny annonse
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          6-stegs veiviser. Du kan lagre utkast underveis.
        </p>
      </header>

      <Stepper current={0} />

      <Card className="p-6">
        <h2 className="font-heading text-xl font-semibold">Velg bil fra flåten</h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Bare biler med status &quot;Ledig&quot; kan brukes i en annonse.
        </p>
        <div className="mt-4">
          <input
            type="search"
            placeholder="Søk skilt, modell, ID …"
            className="block w-full h-11 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--secondary)]"
          />
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            { plate: "EK 12345", model: "VW ID.4 (2024)" },
            { plate: "EK 22456", model: "Toyota Yaris (2023)" },
            { plate: "EK 41099", model: "Hyundai Kona Electric (2024)" },
          ].map((c) => (
            <button
              key={c.plate}
              type="button"
              className="text-left p-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--secondary)]"
            >
              <p className="font-medium">{c.model}</p>
              <p className="text-xs text-[color:var(--muted)] mt-1">
                Skilt: {c.plate}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="secondary">Lagre utkast</Button>
          <Button>Neste — rute</Button>
        </div>
      </Card>
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap gap-2 text-sm">
      {STEPS.map((s, idx) => (
        <li
          key={s}
          className={`px-3 py-1.5 rounded-full border ${
            idx === current
              ? "bg-[color:var(--primary)] text-white border-[color:var(--primary)]"
              : "bg-[color:var(--surface)] text-[color:var(--muted)] border-[color:var(--border)]"
          }`}
        >
          <span className="text-xs mr-1.5">{idx + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}
