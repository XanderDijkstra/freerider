import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { getNotificationPrefs } from "@/data/store";
import { saveNotificationPrefs } from "@/lib/auth-actions";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Varselinnstillinger",
  robots: { index: false },
};

const PREFS = [
  {
    key: "newListings",
    title: "Nye annonser fra utleiere jeg følger",
    desc: "Få varsel når Hertz, Avis eller andre du følger publiserer et oppdrag.",
  },
  {
    key: "statusChange",
    title: "Status på forespørslene mine",
    desc: "Godkjenning, avslag eller endringer i opphenting.",
  },
  {
    key: "pickupReminder",
    title: "Påminnelse før opphenting",
    desc: "24 t før opphenting får du e-post + SMS.",
  },
];

export default async function VarslerPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await getSession();
  const prefs = session ? getNotificationPrefs(session.userId) : {};
  const { saved } = await searchParams;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold">
          Varselinnstillinger
        </h1>
        <p className="mt-1 text-[color:var(--muted)]">
          Velg hvilke varsler du vil ha - og på hvilken kanal.
        </p>
      </header>

      {saved === "1" ? (
        <Card className="p-4 bg-[color:var(--success)]/10 border-[color:var(--success)]/30 text-sm">
          Innstillingene er lagret.
        </Card>
      ) : null}

      <form action={saveNotificationPrefs} className="space-y-6">
        <Card className="divide-y divide-[color:var(--border)]">
          {PREFS.map((p) => {
            const current = prefs[p.key] ?? { email: false, sms: false };
            return (
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
                    <input
                      type="checkbox"
                      name={`${p.key}_email`}
                      defaultChecked={current.email}
                    />
                    E-post
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={`${p.key}_sms`}
                      defaultChecked={current.sms}
                    />
                    SMS
                  </label>
                </div>
              </div>
            );
          })}
        </Card>
        <Button type="submit">Lagre innstillinger</Button>
      </form>
    </div>
  );
}
