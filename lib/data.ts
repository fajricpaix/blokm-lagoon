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
  imageSrc: string;
  imageAlt: string;
};

export const heroContent: HeroContent = {
  eyebrow: "Blok M Serpong Lagoon",
  title: "Memintarkan Serpong Lagoon",
  subtitle:
    "Komunitas Domino di Komplek Serpong Lagoon — Strategi, Bercanda dan Persahabatan bertemu di atas satu meja.",
  scrollCue: "Scroll to explore",
  imageSrc: "/top-bg.png",
  imageAlt:
    "Meja domino close-up dengan kartu tersusun di bawah lampu temaram Blok M Serpong Lagoon",
};

export type ChapterContent = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  align: "left" | "right";
};

export const chapters: ChapterContent[] = [
  {
    id: "the-game",
    eyebrow: "Chapter 01",
    title: "The Game",
    body: "Domino bukan sekadar susun kartu — ini permainan hitung-hitungan, membaca lawan, dan menahan diri di saat yang tepat. Berabad-abad dimainkan lintas generasi, domino berkembang jadi olahraga strategi yang menuntut konsentrasi penuh dan kerja sama tim yang solid.",
    imageSrc: "/chapters/1.png",
    imageAlt: "Empat pemain domino berkonsentrasi menyusun kartu di atas meja kayu",
    align: "right",
  },
  {
    id: "the-community",
    eyebrow: "Chapter 02",
    title: "The Community",
    body: "Blok M Serpong Lagoon lahir dari kumpulan pemain lepas yang rutin bertemu tiap akhir pekan. Kini komunitas ini menjadi tempat bagi warga lagoo dari berbagai latar belakang — disatukan oleh satu meja, satu set batu domino dan obrolan yang sehat.",
    imageSrc: "/chapters/2.png",
    imageAlt:
      "Anggota komunitas Blok M Serpong Lagoon berkumpul dan tertawa di sela pertandingan domino",
    align: "left",
  },
  {
    id: "the-tournament",
    eyebrow: "Chapter 03",
    title: "The Tournament",
    body: "Setiap tahun, Blok M Serpong Lagoon menggelar turnamen dengan sistem gugur. Tensinya naik di setiap ronde — satu keputusan salah bisa menentukan siapa yang melaju ke meja final.",
    imageSrc: "/chapters/3.png",
    imageAlt: "Suasana tegang turnamen domino dengan penonton mengelilingi meja final",
    align: "right",
  },
  {
    id: "the-players",
    eyebrow: "Chapter 04",
    title: "The Players",
    body: "Dari pemain rumahan sampai legenda meja, Blok M Serpong Lagoon dibesarkan oleh nama-nama yang dikenal lewat gaya permainan dan julukannya masing-masing. Berikut beberapa wajah yang paling sering duduk di meja domino.",
    imageSrc: "https://picsum.photos/seed/blokm-the-players/1000/1250",
    imageAlt: "Potret salah satu pemain unggulan Blok M Serpong Lagoon memegang kartu domino",
    align: "left",
  },
];

export type Player = {
  id: string;
  name: string;
  nickname: string;
  achievement: string;
  imageSrc: string;
  imageAlt: string;
};

export const players: Player[] = [
  {
    id: "sugi",
    name: "Ketua Sugi",
    nickname: "Sang Ketua",
    achievement: "Kuncen SC",
    imageSrc: "https://picsum.photos/seed/blokm-player-andra/600/800",
    imageAlt: "Potret Andra Wijaya, pemain domino dengan julukan Sang Kalkulator",
  },
  {
    id: "adbi",
    name: "Uda Abdi",
    nickname: "Sang Kalkulator",
    achievement: "Marketing Permainan",
    imageSrc: "https://picsum.photos/seed/blokm-player-rina/600/800",
    imageAlt: "Potret Rina Kusuma, pemain domino dengan julukan Ratu Gertak",
  },
  {
    id: "julio",
    name: "Champ Julio",
    nickname: "Sumbu Pendek",
    achievement: "Kang Ngantuk",
    imageSrc: "https://picsum.photos/seed/blokm-player-bagas/600/800",
    imageAlt: "Potret Bagas Prakoso, pemain domino dengan julukan Si Tenang",
  },
  {
    id: "ricy",
    name: "King Ryci",
    nickname: "Nanti Balik Lagi",
    achievement: "Menang Mudah Ini",
    imageSrc: "https://picsum.photos/seed/blokm-player-maya/600/800",
    imageAlt: "Potret Maya Anggraini, pemain domino dengan julukan Legenda Lagoon",
  },
  {
    id: "fajri",
    name: "Uda Fajri",
    nickname: "Sang Perancang",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-fajri/600/800",
    imageAlt: "Potret Uda Fajri, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "edo",
    name: "Uda Edo",
    nickname: "Sang Penantang",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-edo/600/800",
    imageAlt: "Potret Uda Edo, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "rt-aldhi",
    name: "Pak RT Aldhi",
    nickname: "Sang Penjaga Wilayah",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-aldhi/600/800",
    imageAlt: "Potret Pak RT Aldhi, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "lucky",
    name: "Om Lucky",
    nickname: "Sang Pembawa Hoki",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-lucky/600/800",
    imageAlt: "Potret Om Lucky, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "agung",
    name: "Om Agung",
    nickname: "Sang Kokoh",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-agung/600/800",
    imageAlt: "Potret Om Agung, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "habib-ali",
    name: "Habib Ali",
    nickname: "Sang Bijak",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-habibali/600/800",
    imageAlt: "Potret Habib Ali, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "hayogi",
    name: "Om Hayogi",
    nickname: "Sang Penyemangat",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-hayogi/600/800",
    imageAlt: "Potret Om Hayogi, pemain domino Blok M Serpong Lagoon",
  },
  {
    id: "osa",
    name: "Adek Osa",
    nickname: "Sang Penerus",
    achievement: "Anggota Blok M Serpong Lagoon",
    imageSrc: "https://picsum.photos/seed/blokm-player-osa/600/800",
    imageAlt: "Potret Adek Osa, pemain domino Blok M Serpong Lagoon",
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
    cadence: "Tiap Weekend 19.00 WIB",
    format: "Round Robin Santai",
    description:
      "Sesi latihan dan silaturahmi mingguan, terbuka untuk anggota baru maupun tamu yang ingin coba-coba.",
  },
  {
    id: "tahunan",
    name: "Kejuaraan Tahunan",
    cadence: "Agustus",
    format: "Knockout System + Meja Final",
    description:
      "Puncak musim — Penentuan siapa yang berhak duduk tahta tertinggi Blok M - Serpong Lagoon.",
  },
];

export type SocialLink = { label: string; href: string };

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/lagoon.domino/" },
];

export type ContactInfo = {
  address: string;
  hours: string;
  email: string;
};

export const contactInfo: ContactInfo = {
  address: "Komplek Serpong Lagoon",
  hours: "Buka setiap hari, 16.00 – 23.00 WIB",
  email: "lagoon.domino@gmail.com",
};

export const heroMarqueeText = "Silaturahmi. Strategi. Bercanda. Kemenangan. Silaturahmi";
export const ctaMarqueeText = "Siap Duduk Satu Meja?";

export const ogImageSrc = "https://picsum.photos/seed/blokm-og/1200/630";

export const logoSrc = "/logo.JPG";
export const logoAlt = "Logo Blok M Serpong Lagoon — olahraga domino bapak bapak, est. 2025";
export const establishedYear = 2025;
