import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Varselinnstillingar",
  robots: { index: false },
};

const PREFS = [
  {
    key: "newListings",
    title: "Nye annonsar frå utleigarar eg følgjer",
    desc: "Få varsel når Hertz, Avis eller andre du følgjer publiserer eit oppdrag.",
  },
  {
    key: "statusChange",
    title: "Status på forespørslane mine",
    desc: "Godkjenning, avslag eller endringar i opphenting.",
  },
  {
    key: "pickupReminder",
    title: "Påminning før opphenting",
    desc: "24 t før opphenting får du e-post + SMS.",
  },
];

export default function VarslerPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Varselinnstillingar
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Vel kva for varsel du vil ha — og på kva kanal.
        </p>
      </header>
      <Card className="divide-y divide-[color:var(--border)]">
        {PREFS.map((p) => (
          <div
            key={p.key}
            className="p-5 flex items-start justify-between flex-wrap gap-4"
          >
            <div className="max-w-md">
              <h2 className="font-medium">{p.title}</h2>
              <p className="text-sm text-[color:var(--muted)] mt-1">{p.desc}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                E-post
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                SMS
              </label>
            </div>
          </div>
        ))}
      </Card>
      <Button>Lagre innstillingar</Button>
    </div>
  );
}
