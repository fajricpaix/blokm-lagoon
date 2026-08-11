# Blok M Lagoon — Struktur Komponen Next.js (Design)

Status: Approved
Tanggal: 2026-08-11
Sumber requirement: `projects-brief.md` (root repo)

## 1. Ringkasan

Membangun struktur komponen Next.js (App Router) untuk one-page cinematic
scrollytelling site komunitas domino "Blok M Lagoon", sesuai `projects-brief.md`.
Video background diganti gambar statis (placeholder picsum.photos, seeded/deterministic).
Scope: scaffolding struktur, styling, dan animasi scroll — bukan integrasi CMS/backend,
bukan foto asli, bukan test framework baru.

## 2. Tech stack tambahan

Dependency baru yang ditambahkan ke `package.json`:

- `gsap` + `@gsap/react` — animasi scroll (ScrollTrigger, pin, parallax, horizontal scroll),
  `useGSAP` hook untuk cleanup yang aman di React.
- `framer-motion` — micro-interaction (menu overlay, hover, transisi).
- `lenis` — smooth scrolling, disinkronkan ke GSAP ScrollTrigger.

Tidak menambah testing framework (repo belum punya); verifikasi lewat `npm run lint`,
`npm run build`, dan pengecekan manual di browser (dev server).

## 3. Struktur file

```
components/
  Navbar.tsx                 (client — state menu buka/tutup, render burger + MenuOverlay)
  MenuOverlay.tsx             (client — overlay full-screen, Framer Motion AnimatePresence + stagger)
  Hero.tsx                    (GSAP entrance timeline + parallax gambar, cue "Scroll to explore")
  HorizontalScrollText.tsx    (teks besar dipin + digeser horizontal saat scroll; matchMedia utk mobile)
  ChapterSection.tsx          (reusable: gambar + teks, layout selang-seling, scroll-reveal)
  PlayerCard.tsx              (kartu profil pemain, dipakai di chapter "The Players")
  TournamentSchedule.tsx      (jadwal/format turnamen, dipakai di chapter "The Tournament")
  Footer.tsx                  (lokasi, kontak, sosial media)
  SmoothScrollProvider.tsx    (client — init Lenis, sync ke GSAP ticker/ScrollTrigger,
                                menghormati prefers-reduced-motion)
lib/
  data.ts                     (nav links, hero copy, narasi tiap chapter, daftar pemain,
                                jadwal turnamen, kontak & sosial — draft copy Bahasa Indonesia,
                                ditandai sebagai placeholder/dummy)
app/
  layout.tsx                  (bungkus children dengan SmoothScrollProvider; metadata + OG image)
  page.tsx                    (urutan: Navbar → Hero → HorizontalScrollText → 4× ChapterSection
                                (Game, Community, Tournament, Players) → TournamentSchedule →
                                HorizontalScrollText (CTA) → Footer/Join Us)
next.config.ts                (tambah images.remotePatterns untuk picsum.photos)
```

Chapter "Join Us / Location" digabung ke dalam `Footer.tsx` (lokasi, jam operasional,
kontak, sosial media) — tidak perlu komponen chapter terpisah karena isinya sudah
sejenis dengan konten footer.

## 4. Data flow

- `lib/data.ts` adalah single source of truth untuk semua konten teks & data terstruktur
  (bukan hardcode di komponen). Komponen menerima data lewat props dari `app/page.tsx`
  (server component) supaya reusable dan gampang ganti konten nanti.
- `PlayerCard` dan `TournamentSchedule` masing-masing menerima array data (`players`,
  `schedule`) dari `lib/data.ts` dan me-render list-nya (`.map()`), bukan hardcode
  jumlah kartu.
- `ChapterSection` generik: menerima props `title`, `body`, `imageSeed`, `imageAlt`,
  `align` ('left' | 'right') — dipakai ulang untuk 4 chapter dengan konten berbeda.

## 5. Pendekatan animasi

- **Hero**: GSAP timeline (fade + scale-in) saat mount via `useGSAP`; parallax halus
  pada gambar background terhadap scroll (ScrollTrigger `scrub`).
- **HorizontalScrollText**: section di-pin (`ScrollTrigger.pin`), teks digeser
  horizontal mengikuti scroll (`scrub`) — desktop only. `gsap.matchMedia()` dengan
  breakpoint mobile mengganti jadi tampilan statis/reveal vertikal biasa (brief §7).
- **ChapterSection**: scroll-triggered fade + slide-up saat masuk viewport
  (`ScrollTrigger` dengan `toggleActions`), gambar & teks selang-seling kiri/kanan
  per chapter via prop `align`.
- **MenuOverlay / Navbar**: Framer Motion `AnimatePresence` untuk transisi
  buka/tutup overlay full-screen; stagger animation untuk item link menu.
- **Reduced motion**: `SmoothScrollProvider` cek `window.matchMedia('(prefers-reduced-motion: reduce)')`
  sekali di awal. Kalau true: skip inisialisasi Lenis (pakai native scroll), dan
  komponen GSAP di-set langsung ke end-state (tanpa animasi berat) via
  `gsap.matchMedia()` scope reduced-motion.

## 6. Gambar (placeholder strategy)

- Semua gambar pakai `next/image` dengan `src` dari picsum.photos yang di-seed
  supaya deterministic/stabil (bukan random tiap reload), contoh:
  `https://picsum.photos/seed/blokm-hero/1600/900`.
- Seed name dan alt text deskriptif Bahasa Indonesia disimpan di `lib/data.ts`
  bersama konten lain, supaya nanti tinggal ganti `src` ke file lokal di
  `public/images/...` tanpa ubah struktur komponen.
- `next.config.ts` perlu `images.remotePatterns` mengizinkan hostname `picsum.photos`
  (dan domain redirect-nya `fastly.picsum.photos`).

## 7. Responsive & aksesibilitas

- Mobile: `HorizontalScrollText` disederhanakan jadi statis/vertikal (lihat §5).
  `ChapterSection` layout selang-seling kiri/kanan collapse jadi 1 kolom (image di atas, teks di bawah) di breakpoint mobile via Tailwind (`flex-col md:flex-row`).
- `prefers-reduced-motion`: lihat §5.
- Semua `<Image>` punya `alt` deskriptif (bukan generic "image" atau kosong).

## 8. Scope boundaries (out of scope)

- Tidak ada CMS/backend/API route.
- Tidak ada foto asli (masih placeholder picsum, dengan struktur yang gampang diganti).
- Tidak menambah testing framework baru.
- Tidak ada form submission/autentikasi — kontak "Join Us" berupa link statis
  (WhatsApp/Instagram) dari `lib/data.ts`.
- Logo/monogram Blok M Lagoon: pakai teks/wordmark sederhana dulu di Navbar
  (bukan file logo image), karena aset logo belum disiapkan (brief §4).

## 9. Verifikasi

- `npm run lint` — tanpa error.
- `npm run build` — build sukses (memverifikasi type-check `PageProps`/`LayoutProps`,
  import GSAP/Framer Motion/Lenis benar untuk server/client component boundary).
- Manual: jalankan `next dev`, cek di browser — scroll behavior, horizontal text
  section, menu overlay buka/tutup, responsive di mobile viewport, dan
  `prefers-reduced-motion` (via devtools emulation) menonaktifkan animasi berat.
