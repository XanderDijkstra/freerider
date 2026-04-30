import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freerider.no"),
  title: {
    default: "FreeRider.no — Kjør gratis. Flytt bilen. Spar CO₂.",
    template: "%s | FreeRider.no",
  },
  description:
    "Norges marknad for gratis bilflytting. Hertz, Avis, Sixt og fleire treng biler flytta — du får gratis biltur. Lavare kostnader for utleier, lavare CO₂ for alle.",
  applicationName: "FreeRider.no",
  authors: [{ name: "FreeRider AS" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "FreeRider.no",
    url: "https://freerider.no",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nb"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
