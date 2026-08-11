import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HorizontalScrollText from "@/components/HorizontalScrollText";
import ChapterSection from "@/components/ChapterSection";
import PlayerGallery from "@/components/PlayerGallery";
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
  const gameChapter = chapters.find((c) => c.id === "the-game")!;
  const communityChapter = chapters.find((c) => c.id === "the-community")!;
  const tournamentChapter = chapters.find((c) => c.id === "the-tournament")!;
  const playersChapter = chapters.find((c) => c.id === "the-players")!;

  return (
    <>
      <Navbar navLinks={navLinks} />
      <Hero content={heroContent} />
      <HorizontalScrollText text={heroMarqueeText} />
      <ChapterSection content={gameChapter} />
      <ChapterSection content={communityChapter} />
      <ChapterSection content={tournamentChapter}>
        <TournamentSchedule schedule={tournamentSchedule} />
      </ChapterSection>
      <ChapterSection content={playersChapter} />
      <PlayerGallery players={players} />
      <HorizontalScrollText text={ctaMarqueeText} />
      <Footer contact={contactInfo} socialLinks={socialLinks} />
    </>
  );
}
