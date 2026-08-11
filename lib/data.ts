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
  imageSrc: "https://picsum.photos/seed/blokm-hero/1920/1280",
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
    imageSrc: "https://picsum.photos/seed/blokm-the-game/1000/1250",
    imageAlt: "Empat pemain domino berkonsentrasi menyusun kartu di atas meja kayu",
    align: "right",
  },
  {
    id: "the-community",
    eyebrow: "Chapter 02",
    title: "The Community",
    body: "Blok M Serpong Lagoon lahir dari kumpulan pemain lepas yang rutin bertemu tiap akhir pekan. Kini komunitas ini menjadi rumah bagi puluhan anggota dari berbagai latar belakang — disatukan oleh satu meja, satu set kartu, dan semangat kompetisi yang sehat.",
    imageSrc: "https://picsum.photos/seed/blokm-the-community/1000/1250",
    imageAlt:
      "Anggota komunitas Blok M Serpong Lagoon berkumpul dan tertawa di sela pertandingan domino",
    align: "left",
  },
  {
    id: "the-tournament",
    eyebrow: "Chapter 03",
    title: "The Tournament",
    body: "Setiap bulan, Blok M Serpong Lagoon menggelar turnamen dengan sistem gugur dan poin akumulasi. Tensinya naik di setiap ronde — satu keputusan salah bisa menentukan siapa yang melaju ke meja final.",
    imageSrc: "https://picsum.photos/seed/blokm-the-tournament/1000/1250",
    imageAlt: "Suasana tegang turnamen domino dengan penonton mengelilingi meja final",
    align: "right",
  },
  {
    id: "the-players",
    eyebrow: "Chapter 04",
    title: "The Players",
    body: "Dari pemain rumahan sampai legenda meja, Blok M Serpong Lagoon dibesarkan oleh nama-nama yang dikenal lewat gaya main dan julukan masing-masing. Berikut beberapa wajah yang paling sering duduk di kursi juara.",
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
    id: "andra",
    name: "Andra Wijaya",
    nickname: "Sang Kalkulator",
    achievement: "Juara Turnamen Tahunan 2024 & 2025",
    imageSrc: "https://picsum.photos/seed/blokm-player-andra/600/800",
    imageAlt: "Potret Andra Wijaya, pemain domino dengan julukan Sang Kalkulator",
  },
  {
    id: "rina",
    name: "Rina Kusuma",
    nickname: "Ratu Gertak",
    achievement: "Runner-up 3 musim beruntun",
    imageSrc: "https://picsum.photos/seed/blokm-player-rina/600/800",
    imageAlt: "Potret Rina Kusuma, pemain domino dengan julukan Ratu Gertak",
  },
  {
    id: "bagas",
    name: "Bagas Prakoso",
    nickname: "Si Tenang",
    achievement: "Rekor kemenangan beruntun terbanyak: 14 partai",
    imageSrc: "https://picsum.photos/seed/blokm-player-bagas/600/800",
    imageAlt: "Potret Bagas Prakoso, pemain domino dengan julukan Si Tenang",
  },
  {
    id: "maya",
    name: "Maya Anggraini",
    nickname: "Legenda Lagoon",
    achievement: "Anggota pendiri, aktif bermain sejak 2016",
    imageSrc: "https://picsum.photos/seed/blokm-player-maya/600/800",
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
  { label: "Instagram", href: "https://instagram.com/blokmserponglagoon" },
  { label: "TikTok", href: "https://tiktok.com/@blokmserponglagoon" },
];

export type ContactInfo = {
  address: string;
  hours: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
};

export const contactInfo: ContactInfo = {
  address: "Komplek Serpong Lagoon",
  hours: "Buka setiap hari, 16.00 – 23.00 WIB",
  whatsapp: "+62 812-3456-7890",
  whatsappHref: "https://wa.me/6281234567890",
  email: "halo@blokmserponglagoon.id",
};

export const heroMarqueeText = "Silaturahmi. Strategi. Bercanda. Kemenangan. Silaturahmi";
export const ctaMarqueeText = "Siap Duduk Satu Meja?";

export const ogImageSrc = "https://picsum.photos/seed/blokm-og/1200/630";

export const logoSrc = "/logo.JPG";
export const logoAlt = "Logo Blok M Serpong Lagoon — olahraga domino bapak bapak, est. 2025";
export const establishedYear = 2025;
