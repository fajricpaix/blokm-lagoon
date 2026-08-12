import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ogImageSrc } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Blok M Serpong Lagoon — Lebih dari Sekadar Meja",
  description:
    "Komunitas dan turnamen domino Blok M Serpong Lagoon. Strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
  openGraph: {
    title: "Blok M Serpong Lagoon — Lebih dari Sekadar Meja",
    description:
      "Komunitas dan turnamen domino Blok M Serpong Lagoon. Strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
    images: [ogImageSrc],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blok M Serpong Lagoon — Lebih dari Sekadar Meja",
    description:
      "Komunitas dan turnamen domino Blok M Serpong Lagoon. Strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
    images: [ogImageSrc],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
