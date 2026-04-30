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
import { publishedListings } from "@/data/listings";
import { companies } from "@/data/companies";
import { getVehicleById } from "@/data/vehicles";
import { totalCo2SavedKg } from "@/lib/co2";
import { recentBlogEntries } from "@/data/blogEntries";
import { faqSchema } from "@/lib/seo";
import { formatKg, formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "FreeRider.no — Kjør gratis. Flytt bilen. Spar CO₂.",
  description:
    "Norges marknad for gratis bilflytting. Hertz, Avis, Sixt og fleire treng biler flytta — du får gratis biltur. Lavare kostnader for utleier, lavare CO₂ for alle.",
  alternates: { canonical: "/" },
};

const FAQ = [
  {
    q: "Kva er FreeRider.no?",
    a: "FreeRider.no er ein marknad der bilutleiere publiserer leigebilar som må flyttast mellom stasjonar, og private sjåførar tek på seg å køyre bilen. Sjåføren får gratis (eller billeg) biltur, utleigaren sparar lønn og fly, og CO₂ går ned.",
  },
  {
    q: "Kor mykje kostar det meg som sjåfør?",
    a: "Ingenting i utgangspunktet. Mange oppdrag er heilt gratis. Andre dekkjer drivstoff, bom og ferje. Nokre gir til og med eit flatt honorar.",
  },
  {
    q: "Kva med forsikring?",
    a: "Bilen er fullforsikra av utleigaren under heile relokeringa, så lenge du følgjer reglane i annonsen (alder, gyldig sertifikat, ingen alkohol).",
  },
  {
    q: "Kva om eg ikkje rekk fristen?",
    a: "Sei frå så snart som mogleg. Mindre forseinkingar er greie, men utleigaren kan krevje kompensasjon for store overskridingar. I verste fall blir du sperra frå plattforma.",
  },
  {
    q: "Korleis veit eg at det er trygt?",
    a: "Alle utleigarar på FreeRider.no er manuelt verifiserte. Du leiger frå seriøse aktørar med fysiske stasjonar og full forsikring. Vi tek aldri privatpersonar som tilbydarar.",
  },
];

export default function HomePage() {
  const featured = publishedListings().slice(0, 6);
  const totalSavedKg = totalCo2SavedKg(
    publishedListings().map((l) => {
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
            eyebrow="Marknad"
            title="Nyaste freerider-bilar"
            description="Plukk ein bil og søk i dag. Nye annonser kvar dag."
          />
          <Link
            href="/biler"
            className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            Sjå alle <ArrowRight className="h-4 w-4" aria-hidden />
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
              Kvar relokering med FreeRider erstattar ein tom retur eller eit
              returfly. Vi reknar utsleppet ope og publiserer metoden vår.
            </p>
            <div className="mt-5 flex gap-3">
              <LinkButton
                href="/miljo"
                variant="secondary"
                className="bg-white text-[color:var(--primary)] hover:bg-[color:var(--accent)]"
              >
                Sjå metoden
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
          title="Heile bransjen på éin stad"
          description="Hertz, Avis, Sixt, Budget og uavhengige aktørar. Vi samlar tilbodet."
        />
        <div className="mt-6 md:mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {companies.slice(0, 6).map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
        <div className="mt-6">
          <LinkButton href="/utleiere" variant="secondary">
            Sjå alle utleiere
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
              Erstatt staff-relokeringar med freerider-sjåførar. Lågare lønnskostnad,
              ingen returfly, raskare omløp.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <LinkButton href="/for-utleiere" variant="primary">
              Bli utleiar-partner
            </LinkButton>
          </div>
        </Card>
      </Container>

      <Container className="py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading
            eyebrow="Blogg"
            title="Lese om bilflytting"
            description="Guidar, ruter og bransje-innsikt."
          />
          <Link
            href="/blogg"
            className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--primary)] hover:underline"
          >
            Sjå alle <ArrowRight className="h-4 w-4" aria-hidden />
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
        <SectionHeading title="Vanlege spørsmål" />
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
            FreeRider.no koblar bilutleiere som treng biler flytta med sjåfører
            som vil reise gratis. Lågare kostnader for utleigar, gratis biltur
            for deg, mindre CO₂ for alle.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/biler" size="lg">
              Sjå ledige biler
            </LinkButton>
            <LinkButton href="/for-utleiere" size="lg" variant="secondary">
              For utleiere
            </LinkButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[color:var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              4 200 sjåførar
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              6 utleiere
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[color:var(--primary)]" aria-hidden />
              42 stasjonar
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
      title: "Utleigar publiserer",
      body: "Bilutleiaren legg ut ein bil som må flyttast mellom to stasjonar — med dato, distanse og reglar.",
    },
    {
      title: "Du søker",
      body: "Filtrer på rute, dato og biltype. Søk om bilen som passar deg. Tek kort tid.",
    },
    {
      title: "Du kjører",
      body: "Hent bilen, kjør strekninga og lever den i tide. Gratis tur for deg, lågare CO₂ for alle.",
    },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Slik fungerer det"
        title="Tre steg frå annonse til biltur."
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
    { from: "Oslo", to: "Trondheim", km: 495 },
    { from: "Tromsø", to: "Bodø", km: 720 },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Populære ruter"
        title="Finn ein bil på ruta du vil reise."
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
                {r.km} km · vanleg sommarrute
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--primary)] font-medium">
                Sjå ledige biler <ArrowRight className="h-4 w-4" aria-hidden />
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
        "Eg sparte 1 600 kr på flybillett til Bergen og fekk køyre ein splitter ny ID.4. Tek meg igjen om sjansen kjem.",
      name: "Ida, 27, Oslo",
    },
    {
      quote:
        "Funka perfekt frå første tur. Drivstoffkortet var inkludert, og levering gjekk på 5 minutt.",
      name: "Henrik, 33, Trondheim",
    },
    {
      quote:
        "Endeleg ein måte å reise nord på som faktisk er billeg og grøn samstundes.",
      name: "Marit, 41, Tromsø",
    },
  ];
  return (
    <Container className="py-12 md:py-16">
      <SectionHeading
        eyebrow="Sjåførar"
        title="Slik er det å vere freerider."
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
