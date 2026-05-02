import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Truck, Users } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { ListingCard } from "@/components/ListingCard";
import { CompanyCard } from "@/components/CompanyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Badge } from "@/components/Badge";
import { publishedListingsLive } from "@/data/store";
import { companies } from "@/data/companies";
import { getVehicleById } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { recentBlogEntries } from "@/data/blogEntries";
import { faqSchema } from "@/lib/seo";
import { formatKg, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "FreeRider.no - Kjør gratis. Flytt bilen. Spar CO₂.",
  description:
    "Norges marked for gratis bilflytting. Hertz, Avis, Sixt og flere trenger biler flyttet - du får gratis biltur. Lavere kostnader for utleier, lavere CO₂ for alle.",
  alternates: { canonical: "/" },
};

const FAQ = [
  {
    q: "Hva er FreeRider.no?",
    a: "FreeRider.no er et marked der bilutleiere publiserer leiebiler som må flyttes mellom stasjoner, og private sjåfører tar på seg å kjøre bilen. Sjåføren får gratis (eller billig) biltur, utleieren sparer lønn og fly, og CO₂ går ned.",
  },
  {
    q: "Hvor mye koster det meg som sjåfør?",
    a: "Ingenting i utgangspunktet. Mange oppdrag er helt gratis. Andre dekker drivstoff, bom og ferje. Noen gir til og med et flatt honorar.",
  },
  {
    q: "Hva med forsikring?",
    a: "Bilen er fullforsikret av utleieren under hele relokeringen, så lenge du følger reglene i annonsen (alder, gyldig sertifikat, ingen alkohol).",
  },
  {
    q: "Hva om jeg ikke rekk fristen?",
    a: "Si fra så snart som mulig. Mindre forsinkelser er greie, men utleieren kan kreve kompensasjon for store overskridelser. I verste fall blir du sperret fra plattformen.",
  },
  {
    q: "Hvordan vet jeg at det er trygt?",
    a: "Alle utleiere på FreeRider.no er manuelt verifisert. Du leier fra seriøse aktører med fysiske stasjoner og full forsikring. Vi tar aldri privatpersoner som tilbydere.",
  },
];

export default function HomePage() {
  const featured = publishedListingsLive().slice(0, 6);
  const totalSavedKg = totalCo2SavedKg(
    publishedListingsLive().map((l) => {
      const v = getVehicleById(l.vehicleId)!;
      return { distanceKm: l.distanceKm, fuelType: v.fuelType };
    }),
  );
  const blog = recentBlogEntries(3);

  return (
    <>
      <Hero />

      <HowItWorks />

      <Container className="py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            eyebrow="Marked"
            title="Nyeste freerider-biler"
            description="Plukk en bil og søk i dag. Nye annonser hver dag."
          />
          <Link
            href="/biler"
            className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            Se alle <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Container>

      <section className="bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
        <Container className="py-12 md:py-16 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <Badge tone="primary" className="bg-white/15">
              <Leaf className="h-3.5 w-3.5" aria-hidden /> Klimaeffekt
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-4">
              {formatKg(totalSavedKg)} CO₂ spart så langt
            </h2>
            <p className="mt-3 text-base md:text-lg text-white/85 max-w-xl">
              Hver relokering med FreeRider erstatter en tom retur eller et
              returfly. Vi regner utslippet åpent og publiserer metoden vår.
            </p>
            <div className="mt-5 flex gap-3">
              <LinkButton
                href="/miljo"
                variant="secondary"
                className="bg-white text-[color:var(--primary)] hover:bg-[color:var(--accent)]"
              >
                Se metoden
              </LinkButton>
            </div>
          </div>
          <div className="hidden md:block">
            <Leaf
              className="h-40 w-40 mx-auto text-white/20"
              aria-hidden
              strokeWidth={1.2}
            />
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <SectionHeading
          eyebrow="Utleiere"
          title="Hele bransjen på ett sted"
          description="Hertz, Avis, Sixt, Budget og uavhengige aktører. Vi samler tilbudet."
        />
        <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {companies.slice(0, 6).map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
        <div className="mt-6">
          <LinkButton href="/utleiere" variant="secondary">
            Se alle utleiere
          </LinkButton>
        </div>
      </Container>

      <PopularRoutes />

      <Testimonials />

      <Container className="py-12 md:py-16">
        <Card className="p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <Badge tone="eco">For utleiere</Badge>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mt-3">
              Spar opptil 70 % på bilflytting.
            </h2>
            <p className="mt-3 text-[color:var(--muted)] max-w-xl">
              Erstatt staff-relokeringer med freerider-sjåfører. Lavere lønnskostnad,
              ingen returfly, raskere omløp.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <LinkButton href="/for-utleiere" variant="primary">
              Bli utleier-partner
            </LinkButton>
          </div>
        </Card>
      </Container>

      <Container className="py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            eyebrow="Blogg"
            title="Les om bilflytting"
            description="Guider, ruter og bransje-innsikt."
          />
          <Link
            href="/blogg"
            className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            Se alle <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-3">
          {blog.map((entry) => (
            <Link key={entry.slug} href={`/blogg/${entry.slug}`} className="block group">
              <Card className="p-5 h-full flex flex-col gap-3 group-hover:border-[color:var(--secondary)]">
                <p className="text-xs text-[color:var(--muted)]">
                  {formatDate(entry.publishedAt)} · {entry.author}
                </p>
                <h3 className="font-medium text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                  {entry.title}
                </h3>
                <p className="text-sm text-[color:var(--muted)] line-clamp-3">
                  {entry.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-12 md:py-16">
        <SectionHeading title="Vanlige spørsmål" />
        <div className="mt-6 max-w-3xl">
          <FAQAccordion items={FAQ} />
        </div>
      </Container>

      <JsonLd data={faqSchema(FAQ)} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 80% at 80% 20%, rgba(168, 213, 168, 0.5) 0%, rgba(168, 213, 168, 0) 60%), linear-gradient(180deg, #FAFAF7 0%, #F1F0EA 100%)",
        }}
      />
      <Container className="py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <Badge tone="eco">
            <Leaf className="h-3.5 w-3.5" aria-hidden /> 1 800 tonn CO₂ spart i 2025
          </Badge>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            Kjør gratis. <br />
            Flytt bilen. <br />
            Spar planeten.
          </h1>
          <p className="mt-5 text-base md:text-lg text-[color:var(--muted)] max-w-xl">
            FreeRider.no kobler bilutleiere som trenger biler flyttet med sjåfører
            som vil reise gratis. Lavere kostnader for utleier, gratis biltur
            for deg, mindre CO₂ for alle.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/biler" size="lg">
              Se ledige biler
            </LinkButton>
            <LinkButton href="/for-utleiere" size="lg" variant="secondary">
              For utleiere
            </LinkButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[color:var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              4 200 sjåfører
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              6 utleiere
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              42 stasjoner
            </span>
          </div>
        </div>
        <div className="md:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[color:var(--border)] card-shadow">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(160deg, #1F4D2B 0%, #3A7D44 60%, #A8D5A8 100%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <path
          d="M0 380 C 100 320, 180 420, 260 360 S 400 300, 400 320 L 400 500 L 0 500 Z"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M0 420 C 120 380, 220 460, 320 400 S 400 380, 400 400 L 400 500 L 0 500 Z"
          fill="rgba(255,255,255,0.12)"
        />
        <circle cx="320" cy="100" r="40" fill="rgba(255,255,255,0.18)" />
      </svg>
      <div className="absolute inset-x-6 bottom-6 bg-white/90 backdrop-blur p-4 rounded-xl border border-[color:var(--border)]">
        <p className="text-xs text-[color:var(--muted)]">Aktuell rute</p>
        <p className="font-medium text-[color:var(--foreground)] flex items-center gap-2">
          Oslo <ArrowRight className="h-4 w-4" aria-hidden /> Bergen
        </p>
        <p className="text-xs text-[color:var(--muted)] mt-1">
          480 km · VW ID.4 · 80 kg CO₂ spart
        </p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Utleier publiserer",
      body: "Bilutleieren legger ut en bil som må flyttes mellom to stasjoner - med dato, distanse og regler.",
    },
    {
      title: "Du søker",
      body: "Filtrer på rute, dato og biltype. Søk om bilen som passer deg. Tar kort tid.",
    },
    {
      title: "Du kjører",
      body: "Hent bilen, kjør strekningen og lever den i tide. Gratis tur for deg, lavere CO₂ for alle.",
    },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Slik fungerer det"
        title="Tre steg fra annonse til biltur."
      />
      <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-3">
        {steps.map((step, idx) => (
          <Card key={step.title} className="p-6">
            <div className="h-9 w-9 rounded-full bg-[color:var(--accent)] text-[color:var(--primary)] flex items-center justify-center font-semibold">
              {idx + 1}
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-[color:var(--muted)]">{step.body}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}

function PopularRoutes() {
  const routes = [
    { from: "Oslo", to: "Bergen", km: 480 },
    { from: "Oslo", to: "Trondhjem", km: 495 },
    { from: "Tromsø", to: "Bodø", km: 720 },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Populære ruter"
        title="Finn bil på ruten du vil reise."
      />
      <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-3">
        {routes.map((r) => (
          <Link
            key={`${r.from}-${r.to}`}
            href={`/biler?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
            className="block group"
          >
            <Card className="p-6 h-full group-hover:border-[color:var(--secondary)]">
              <div className="flex items-center gap-3 text-lg font-medium">
                {r.from}
                <ArrowRight className="h-5 w-5 text-[color:var(--secondary)]" aria-hidden />
                {r.to}
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {r.km} km · vanlig sommerrute
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--primary)] font-medium">
                Se ledige biler <ArrowRight className="h-4 w-4" aria-hidden />
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Jeg sparte 1 600 kr på flybillett til Bergen og fikk kjøre en splitter ny ID.4. Tar meg igjen om sjansen kommer.",
      name: "Ida, 27, Oslo",
    },
    {
      quote:
        "Funket perfekt fra første tur. Drivstoffkortet var inkludert, og levering gikk på 5 minutter.",
      name: "Henrik, 33, Trondhjem",
    },
    {
      quote:
        "Endelig en måte å reise nord på som faktisk er billig og grønn samtidig.",
      name: "Marit, 41, Tromsø",
    },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Sjåfører"
        title="Slik er det å være freerider."
      />
      <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-3">
        {items.map((t, idx) => (
          <Card key={idx} className="p-6">
            <p className="text-[color:var(--foreground)] leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-[color:var(--muted)]">{t.name}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
