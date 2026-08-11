# Blok M Lagoon Component Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the full Next.js component structure for the Blok M Lagoon domino community one-pager (Navbar, MenuOverlay, Hero, HorizontalScrollText, ChapterSection, PlayerCard, TournamentSchedule, Footer), wired together on `app/page.tsx`, with GSAP/ScrollTrigger scroll animation, Framer Motion micro-interactions, Lenis smooth scroll, and static placeholder images (no video).

**Architecture:** Server component `app/page.tsx` assembles reusable components fed by a single content/data module (`lib/data.ts`). Components that drive scroll/entrance animation (`Hero`, `HorizontalScrollText`, `ChapterSection`) are client components using `@gsap/react`'s `useGSAP` hook for safe effect cleanup; `Navbar`/`MenuOverlay` use Framer Motion for the full-screen menu; a single `SmoothScrollProvider` client component wraps the app in `app/layout.tsx` to drive Lenis synced to GSAP's ticker, and is skipped entirely when `prefers-reduced-motion: reduce` is set.

**Tech Stack:** Next.js 16.3.0 (App Router), React 19.2.8, TypeScript, Tailwind CSS v4 (CSS-first `@theme`), GSAP 3.15 + `@gsap/react` 2.1 (ScrollTrigger), Framer Motion 13.1, Lenis 1.3.

## Global Constraints

- Do not downgrade or change `next`, `react`, `react-dom` versions (currently `16.3.0` / `19.2.8` / `19.2.8`).
- New dependencies, pinned to current latest at plan time: `gsap@^3.15.0`, `@gsap/react@^2.1.2`, `framer-motion@^13.1.0`, `lenis@^1.3.26`.
- No CMS/backend/API routes. No real photos — all images use seeded `https://picsum.photos/seed/<seed>/<w>/<h>` URLs from `lib/data.ts`, with descriptive Bahasa Indonesia `alt` text.
- No new test framework is added (repo has none). Every task is verified with `npm run lint` and `npm run build` instead of unit tests; the final task adds a manual browser QA pass.
- All user-facing copy is Bahasa Indonesia draft/dummy content, clearly marked as such in `lib/data.ts`, structured so it's a one-line swap to replace with real content later.
- All animation must respect `prefers-reduced-motion: reduce` — `SmoothScrollProvider` must skip Lenis init in that case, and `HorizontalScrollText`'s pinned horizontal scroll must already degrade to a static layout on mobile regardless (`gsap.matchMedia` at `min-width: 768px`).
- `ChapterSection` layout must collapse to a single column (image above text) below the `md` breakpoint.
- The site commits to a single dark ("cinematic") visual theme — no `prefers-color-scheme` light/dark toggle; background `#0a0a0a`, foreground near-white.

---

### Task 1: Install animation dependencies + allow picsum.photos images

**Files:**
- Modify: `package.json` (via `npm install`, not hand-edited)
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `gsap`, `@gsap/react`, `framer-motion`, `lenis` importable from any later component; `next/image` accepts `https://picsum.photos/...` and `https://fastly.picsum.photos/...` URLs.

- [ ] **Step 1: Install the packages**

Run:
```bash
npm install gsap@^3.15.0 @gsap/react@^2.1.2 framer-motion@^13.1.0 lenis@^1.3.26
```
Expected: `package.json` `dependencies` gains all four packages; `npm install` exits 0.

- [ ] **Step 2: Allow picsum.photos remote images**

Replace the full contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0. Build output shows the `/` route compiled (content is still the default `create-next-app` page at this point — that's expected, it's replaced in Task 11).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json next.config.ts
git commit -m "Add GSAP, Framer Motion, Lenis and allow picsum.photos images"
```

---

### Task 2: Content data module (`lib/data.ts`)

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (all imported later as `import { ... } from "@/lib/data"`):
  - `type NavLink = { label: string; href: string }`, `navLinks: NavLink[]`
  - `type HeroContent = { eyebrow: string; title: string; subtitle: string; scrollCue: string; imageSeed: string; imageAlt: string }`, `heroContent: HeroContent`
  - `type ChapterContent = { id: string; eyebrow: string; title: string; body: string; imageSeed: string; imageAlt: string; align: "left" | "right" }`, `chapters: ChapterContent[]` (4 items, order: The Game, The Community, The Tournament, The Players)
  - `type Player = { id: string; name: string; nickname: string; achievement: string; imageSeed: string; imageAlt: string }`, `players: Player[]`
  - `type ScheduleItem = { id: string; name: string; cadence: string; format: string; description: string }`, `tournamentSchedule: ScheduleItem[]`
  - `type SocialLink = { label: string; href: string }`, `socialLinks: SocialLink[]`
  - `type ContactInfo = { address: string; hours: string; whatsapp: string; whatsappHref: string; email: string }`, `contactInfo: ContactInfo`
  - `heroMarqueeText: string`, `ctaMarqueeText: string`

- [ ] **Step 1: Create `lib/data.ts`**

```ts
// Draft/dummy content — replace with real copy, photos, and player data before launch.

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "The Game", href: "#the-game" },
  { label: "The Community", href: "#the-community" },
  { label: "The Tournament", href: "#the-tournament" },
  { label: "The Players", href: "#the-players" },
  { label: "Join Us", href: "#join-us" },
];

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  scrollCue: string;
  imageSeed: string;
  imageAlt: string;
};

export const heroContent: HeroContent = {
  eyebrow: "Blok M Lagoon",
  title: "Beyond The Table",
  subtitle:
    "Komunitas dan turnamen domino di jantung Blok M — tempat strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
  scrollCue: "Scroll to explore",
  imageSeed: "blokm-hero",
  imageAlt:
    "Meja domino close-up dengan kartu tersusun di bawah lampu temaram Blok M Lagoon",
};

export type ChapterContent = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  imageSeed: string;
  imageAlt: string;
  align: "left" | "right";
};

export const chapters: ChapterContent[] = [
  {
    id: "the-game",
    eyebrow: "Chapter 01",
    title: "The Game",
    body: "Domino bukan sekadar susun kartu — ini permainan hitung-hitungan, membaca lawan, dan menahan diri di saat yang tepat. Berabad-abad dimainkan lintas generasi, domino berkembang jadi olahraga strategi yang menuntut konsentrasi penuh dan kerja sama tim yang solid.",
    imageSeed: "blokm-the-game",
    imageAlt: "Empat pemain domino berkonsentrasi menyusun kartu di atas meja kayu",
    align: "right",
  },
  {
    id: "the-community",
    eyebrow: "Chapter 02",
    title: "The Community",
    body: "Blok M Lagoon lahir dari kumpulan pemain lepas yang rutin bertemu tiap akhir pekan. Kini komunitas ini menjadi rumah bagi puluhan anggota dari berbagai latar belakang — disatukan oleh satu meja, satu set kartu, dan semangat kompetisi yang sehat.",
    imageSeed: "blokm-the-community",
    imageAlt:
      "Anggota komunitas Blok M Lagoon berkumpul dan tertawa di sela pertandingan domino",
    align: "left",
  },
  {
    id: "the-tournament",
    eyebrow: "Chapter 03",
    title: "The Tournament",
    body: "Setiap bulan, Blok M Lagoon menggelar turnamen dengan sistem gugur dan poin akumulasi. Tensinya naik di setiap ronde — satu keputusan salah bisa menentukan siapa yang melaju ke meja final.",
    imageSeed: "blokm-the-tournament",
    imageAlt: "Suasana tegang turnamen domino dengan penonton mengelilingi meja final",
    align: "right",
  },
  {
    id: "the-players",
    eyebrow: "Chapter 04",
    title: "The Players",
    body: "Dari pemain rumahan sampai legenda meja, Blok M Lagoon dibesarkan oleh nama-nama yang dikenal lewat gaya main dan julukan masing-masing. Berikut beberapa wajah yang paling sering duduk di kursi juara.",
    imageSeed: "blokm-the-players",
    imageAlt: "Potret salah satu pemain unggulan Blok M Lagoon memegang kartu domino",
    align: "left",
  },
];

export type Player = {
  id: string;
  name: string;
  nickname: string;
  achievement: string;
  imageSeed: string;
  imageAlt: string;
};

export const players: Player[] = [
  {
    id: "andra",
    name: "Andra Wijaya",
    nickname: "Sang Kalkulator",
    achievement: "Juara Turnamen Tahunan 2024 & 2025",
    imageSeed: "blokm-player-andra",
    imageAlt: "Potret Andra Wijaya, pemain domino dengan julukan Sang Kalkulator",
  },
  {
    id: "rina",
    name: "Rina Kusuma",
    nickname: "Ratu Gertak",
    achievement: "Runner-up 3 musim beruntun",
    imageSeed: "blokm-player-rina",
    imageAlt: "Potret Rina Kusuma, pemain domino dengan julukan Ratu Gertak",
  },
  {
    id: "bagas",
    name: "Bagas Prakoso",
    nickname: "Si Tenang",
    achievement: "Rekor kemenangan beruntun terbanyak: 14 partai",
    imageSeed: "blokm-player-bagas",
    imageAlt: "Potret Bagas Prakoso, pemain domino dengan julukan Si Tenang",
  },
  {
    id: "maya",
    name: "Maya Anggraini",
    nickname: "Legenda Lagoon",
    achievement: "Anggota pendiri, aktif bermain sejak 2016",
    imageSeed: "blokm-player-maya",
    imageAlt: "Potret Maya Anggraini, pemain domino dengan julukan Legenda Lagoon",
  },
];

export type ScheduleItem = {
  id: string;
  name: string;
  cadence: string;
  format: string;
  description: string;
};

export const tournamentSchedule: ScheduleItem[] = [
  {
    id: "mingguan",
    name: "Meja Mingguan",
    cadence: "Tiap Sabtu, 19.00 WIB",
    format: "Round robin santai",
    description:
      "Sesi latihan dan silaturahmi mingguan, terbuka untuk anggota baru maupun tamu yang ingin coba-coba.",
  },
  {
    id: "bulanan",
    name: "Turnamen Bulanan",
    cadence: "Sabtu minggu ketiga",
    format: "Sistem gugur, 16 tim",
    description:
      "Kompetisi resmi berhadiah dengan sistem gugur. Pendaftaran dibuka dua minggu sebelumnya lewat WhatsApp.",
  },
  {
    id: "tahunan",
    name: "Kejuaraan Tahunan",
    cadence: "Desember",
    format: "Poin akumulasi + meja final",
    description:
      "Puncak musim — akumulasi poin sepanjang tahun menentukan siapa yang berhak duduk di meja final.",
  },
];

export type SocialLink = { label: string; href: string };

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/blokmlagoon" },
  { label: "TikTok", href: "https://tiktok.com/@blokmlagoon" },
];

export type ContactInfo = {
  address: string;
  hours: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
};

export const contactInfo: ContactInfo = {
  address: "Blok M Lagoon, Jl. Melawai Raya, Jakarta Selatan",
  hours: "Buka setiap hari, 16.00 – 23.00 WIB",
  whatsapp: "+62 812-3456-7890",
  whatsappHref: "https://wa.me/6281234567890",
  email: "halo@blokmlagoon.id",
};

export const heroMarqueeText = "Strategi. Gertakan. Kemenangan.";
export const ctaMarqueeText = "Siap Duduk Satu Meja?";
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0 (file is not imported anywhere yet, but must still type-check and lint clean).

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "Add lib/data.ts content module for Blok M Lagoon copy and data"
```

---

### Task 3: SmoothScrollProvider + wire into layout + dark theme

**Files:**
- Create: `components/SmoothScrollProvider.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `export default function SmoothScrollProvider({ children }: { children: React.ReactNode })` — a client component with no visual wrapper (renders `children` via a Fragment), used once in `app/layout.tsx`.

- [ ] **Step 1: Create `components/SmoothScrollProvider.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Update `app/globals.css`**

Replace the full file contents with:

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #f5f5f4;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}
```

This commits the site to a single dark theme (no `prefers-color-scheme` toggle) and keeps native `scroll-behavior: smooth` as the CSS fallback brief §2 asks for when Lenis is skipped.

- [ ] **Step 3: Wire the provider and update metadata in `app/layout.tsx`**

Replace the full file contents with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blok M Lagoon — Beyond The Table",
  description:
    "Komunitas dan turnamen domino Blok M Lagoon. Strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
  openGraph: {
    title: "Blok M Lagoon — Beyond The Table",
    description:
      "Komunitas dan turnamen domino Blok M Lagoon. Strategi, gertakan, dan persahabatan bertemu di atas satu meja.",
    images: ["https://picsum.photos/seed/blokm-og/1200/630"],
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
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add components/SmoothScrollProvider.tsx app/layout.tsx app/globals.css
git commit -m "Add Lenis smooth scroll provider and commit to dark cinematic theme"
```

---

### Task 4: Navbar + MenuOverlay

**Files:**
- Create: `components/MenuOverlay.tsx`
- Create: `components/Navbar.tsx`

**Interfaces:**
- Consumes: `NavLink` type and `navLinks` data shape from Task 2 (`{ label: string; href: string }[]`).
- Produces: `export default function Navbar({ navLinks }: { navLinks: NavLink[] })`, used once in `app/page.tsx` (Task 11). `MenuOverlay` is internal to `Navbar` (not imported elsewhere).

- [ ] **Step 1: Create `components/MenuOverlay.tsx`**

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "@/lib/data";

export default function MenuOverlay({
  isOpen,
  onClose,
  navLinks,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-black px-6 py-6 text-white sm:px-12"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">
              Blok M Lagoon
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu"
              className="text-sm uppercase tracking-[0.3em]"
            >
              Tutup
            </button>
          </div>
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              closed: {},
            }}
            className="flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 24 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-5xl font-semibold uppercase tracking-tight sm:text-7xl"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            Beyond The Table
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create `components/Navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import MenuOverlay from "@/components/MenuOverlay";
import type { NavLink } from "@/lib/data";

export default function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-12">
        <a
          href="#"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          Blok M Lagoon
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Buka menu"
          aria-expanded={isOpen}
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="h-px w-7 bg-white" />
          <span className="h-px w-7 bg-white" />
        </button>
      </header>
      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add components/MenuOverlay.tsx components/Navbar.tsx
git commit -m "Add Navbar and full-screen MenuOverlay with Framer Motion"
```

---

### Task 5: Hero

**Files:**
- Create: `components/Hero.tsx`

**Interfaces:**
- Consumes: `HeroContent` type from Task 2 (`{ eyebrow, title, subtitle, scrollCue, imageSeed, imageAlt }`).
- Produces: `export default function Hero({ content }: { content: HeroContent })`, used once in `app/page.tsx` (Task 11).

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 24, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
        .from(".hero-subtitle", { opacity: 0, y: 24, duration: 0.6 }, "-=0.5")
        .from(".hero-scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.3");

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 h-[115%] w-full">
        <Image
          src={`https://picsum.photos/seed/${content.imageSeed}/1920/1280`}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      </div>
      <div className="relative z-10 flex w-full flex-col gap-4 px-6 pb-20 sm:px-12 sm:pb-28">
        <span className="hero-eyebrow text-sm font-medium uppercase tracking-[0.3em] text-white/70">
          {content.eyebrow}
        </span>
        <h1 className="hero-title max-w-4xl text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
          {content.title}
        </h1>
        <p className="hero-subtitle max-w-xl text-base text-white/80 sm:text-lg">
          {content.subtitle}
        </p>
        <div className="hero-scroll-cue mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
          <span className="h-8 w-px animate-pulse bg-white/60" />
          {content.scrollCue}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "Add Hero section with GSAP entrance timeline and parallax"
```

---

### Task 6: HorizontalScrollText

**Files:**
- Create: `components/HorizontalScrollText.tsx`

**Interfaces:**
- Consumes: nothing from `lib/data.ts` types directly — takes a plain `text: string` prop (fed from `heroMarqueeText` / `ctaMarqueeText` in Task 11).
- Produces: `export default function HorizontalScrollText({ text }: { text: string })`, used twice in `app/page.tsx` (Task 11).

- [ ] **Step 1: Create `components/HorizontalScrollText.tsx`**

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalScrollText({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const distance = track.scrollWidth - section.clientWidth;

        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: true,
            pin: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex items-center overflow-hidden bg-black py-16 md:h-screen md:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-2 whitespace-normal px-6 md:flex-row md:flex-nowrap md:gap-16 md:whitespace-nowrap md:px-16"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-6xl md:text-[8vw]"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
```

On desktop (`md:` and up) the section pins and the track scrubs horizontally by its own overflow distance. Below `md`, `matchMedia` never registers the animation, so it renders as a plain stacked, non-pinned block — this is the brief §7 mobile simplification.

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/HorizontalScrollText.tsx
git commit -m "Add HorizontalScrollText pinned marquee with mobile fallback"
```

---

### Task 7: ChapterSection

**Files:**
- Create: `components/ChapterSection.tsx`

**Interfaces:**
- Consumes: `ChapterContent` type from Task 2 (`{ id, eyebrow, title, body, imageSeed, imageAlt, align }`).
- Produces: `export default function ChapterSection({ content }: { content: ChapterContent })`, used three times directly in `app/page.tsx` for The Game/Community/Tournament and once more for The Players (Task 11).

- [ ] **Step 1: Create `components/ChapterSection.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ChapterContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ChapterSection({
  content,
}: {
  content: ChapterContent;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".chapter-reveal", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  const imageFirst = content.align === "left";

  return (
    <section
      id={content.id}
      ref={sectionRef}
      className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:flex-row md:items-center md:gap-16 md:py-36"
    >
      <div
        className={`chapter-reveal relative aspect-[4/5] w-full overflow-hidden rounded-lg md:w-1/2 ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={`https://picsum.photos/seed/${content.imageSeed}/1000/1250`}
          alt={content.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className={`flex w-full flex-col gap-5 md:w-1/2 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        <span className="chapter-reveal text-sm font-medium uppercase tracking-[0.3em] text-white/50">
          {content.eyebrow}
        </span>
        <h2 className="chapter-reveal text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="chapter-reveal max-w-prose text-base leading-relaxed text-white/70 sm:text-lg">
          {content.body}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/ChapterSection.tsx
git commit -m "Add reusable ChapterSection with scroll-reveal animation"
```

---

### Task 8: PlayerCard

**Files:**
- Create: `components/PlayerCard.tsx`

**Interfaces:**
- Consumes: `Player` type from Task 2 (`{ id, name, nickname, achievement, imageSeed, imageAlt }`).
- Produces: `export default function PlayerCard({ player }: { player: Player })`, mapped over `players` in `app/page.tsx` (Task 11).

- [ ] **Step 1: Create `components/PlayerCard.tsx`**

```tsx
import Image from "next/image";
import type { Player } from "@/lib/data";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white/5">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${player.imageSeed}/600/800`}
          alt={player.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
          {player.nickname}
        </span>
        <h3 className="text-xl font-semibold text-white">{player.name}</h3>
        <p className="text-sm text-white/70">{player.achievement}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/PlayerCard.tsx
git commit -m "Add PlayerCard component"
```

---

### Task 9: TournamentSchedule

**Files:**
- Create: `components/TournamentSchedule.tsx`

**Interfaces:**
- Consumes: `ScheduleItem` type from Task 2 (`{ id, name, cadence, format, description }`).
- Produces: `export default function TournamentSchedule({ schedule }: { schedule: ScheduleItem[] })`, used once in `app/page.tsx` (Task 11).

- [ ] **Step 1: Create `components/TournamentSchedule.tsx`**

```tsx
import type { ScheduleItem } from "@/lib/data";

export default function TournamentSchedule({
  schedule,
}: {
  schedule: ScheduleItem[];
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-6 pb-24 md:grid-cols-3">
      {schedule.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 rounded-lg border border-white/10 p-6"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            {item.cadence}
          </span>
          <span className="text-sm font-medium text-white/60">
            {item.format}
          </span>
          <p className="text-sm leading-relaxed text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/TournamentSchedule.tsx
git commit -m "Add TournamentSchedule component"
```

---

### Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`

**Interfaces:**
- Consumes: `ContactInfo` and `SocialLink` types from Task 2.
- Produces: `export default function Footer({ contact, socialLinks }: { contact: ContactInfo; socialLinks: SocialLink[] })`, used once in `app/page.tsx` (Task 11). Renders `id="join-us"`, the target of the Navbar's "Join Us" link.

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
import type { ContactInfo, SocialLink } from "@/lib/data";

export default function Footer({
  contact,
  socialLinks,
}: {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}) {
  return (
    <footer id="join-us" className="bg-black px-6 py-20 text-white sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
            Join Us
          </span>
          <h2 className="max-w-md text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Gabung Meja Kami
          </h2>
          <p className="max-w-md text-white/70">{contact.address}</p>
          <p className="text-white/70">{contact.hours}</p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={contact.whatsappHref}
            className="text-lg font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            {contact.whatsapp}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-white/70 hover:text-white"
          >
            {contact.email}
          </a>
          <div className="mt-4 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-6xl text-xs text-white/40">
        © {new Date().getFullYear()} Blok M Lagoon. Semua hak cipta dilindungi.
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "Add Footer with Join Us / location content"
```

---

### Task 11: Assemble `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: every component and data export from Tasks 2–10 (`Navbar`, `Hero`, `HorizontalScrollText`, `ChapterSection`, `PlayerCard`, `TournamentSchedule`, `Footer`, and all `lib/data.ts` exports).
- Produces: the rendered `/` route — nothing downstream depends on this file.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HorizontalScrollText from "@/components/HorizontalScrollText";
import ChapterSection from "@/components/ChapterSection";
import PlayerCard from "@/components/PlayerCard";
import TournamentSchedule from "@/components/TournamentSchedule";
import Footer from "@/components/Footer";
import {
  navLinks,
  heroContent,
  chapters,
  players,
  tournamentSchedule,
  socialLinks,
  contactInfo,
  heroMarqueeText,
  ctaMarqueeText,
} from "@/lib/data";

export default function Home() {
  const [gameChapter, communityChapter, tournamentChapter, playersChapter] =
    chapters;

  return (
    <>
      <Navbar navLinks={navLinks} />
      <Hero content={heroContent} />
      <HorizontalScrollText text={heroMarqueeText} />
      <ChapterSection content={gameChapter} />
      <ChapterSection content={communityChapter} />
      <ChapterSection content={tournamentChapter} />
      <TournamentSchedule schedule={tournamentSchedule} />
      <ChapterSection content={playersChapter} />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      <HorizontalScrollText text={ctaMarqueeText} />
      <Footer contact={contactInfo} socialLinks={socialLinks} />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both exit 0, `/` route compiled.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Assemble Blok M Lagoon one-pager from all sections"
```

---

### Task 12: Manual browser QA and final verification

**Files:** none (verification only).

**Interfaces:** none — this task only exercises the assembled app.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running)
Expected: server starts on `http://localhost:3000` with no compile errors in the terminal.

- [ ] **Step 2: Desktop pass**

Open `http://localhost:3000` in a desktop-width browser window and check:
- Hero fades/scales in on load, background image parallaxes slightly while scrolling past it.
- The two `HorizontalScrollText` sections pin and the text visibly scrubs horizontally as you scroll through them.
- Each chapter (`The Game`, `The Community`, `The Tournament`, `The Players`) fades/slides up into view as it enters the viewport, alternating image left/right.
- Tournament schedule cards and the 4 player cards render with picsum images.
- Clicking the burger button opens the full-screen `MenuOverlay` with staggered nav links; clicking a link scrolls to that section's `id` and closes the overlay; the "Tutup" button closes it too.
- Footer/"Join Us" shows the WhatsApp/email/social links and location text.

- [ ] **Step 3: Mobile viewport pass**

Using browser devtools device toolbar (e.g. 390×844), reload and check:
- `HorizontalScrollText` sections are static stacked text, not pinned/scrubbing.
- Each `ChapterSection` is a single column, image above text.
- Menu overlay and Navbar still work at this width.

- [ ] **Step 4: Reduced motion pass**

In devtools, enable the "prefers-reduced-motion: reduce" emulation (Rendering tab), reload, and check:
- Page scrolls with native (non-Lenis) momentum — no smoothing lag.
- Chapter/hero content is still visible (not stuck at `opacity: 0` — GSAP `from()` tweens still run their entrance once per section since only the smooth-scroll layer is skipped, not GSAP itself).

- [ ] **Step 5: Final lint/build check**

Run: `npm run lint && npm run build`
Expected: both exit 0 with no warnings.

- [ ] **Step 6: Stop the dev server**

Stop the `npm run dev` process (Ctrl+C).

This task has no commit — it's verification only. If any check in Steps 2–4 fails, fix the relevant component from its own task's file, re-run Steps 1–5, then commit the fix with a message describing what was wrong (e.g. `git commit -m "Fix HorizontalScrollText mobile fallback"`).
