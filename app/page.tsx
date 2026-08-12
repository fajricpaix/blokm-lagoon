import ChapterSection from "@/components/ChapterSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PlayerGallery from "@/components/PlayerGallery";
import TournamentSchedule from "@/components/TournamentSchedule";
import {
  chapters,
  contactInfo,
  heroContent,
  navLinks,
  players,
  socialLinks,
  tournamentSchedule
} from "@/lib/data";

export default function Home() {
  const gameChapter = chapters.find((c) => c.id === "the-game")!;
  const communityChapter = chapters.find((c) => c.id === "the-community")!;
  const tournamentChapter = chapters.find((c) => c.id === "the-tournament")!;

  return (
    <>
      <Navbar navLinks={navLinks} />
      <Hero content={heroContent} />
      <ChapterSection content={gameChapter} />
      <ChapterSection content={communityChapter} />
      <ChapterSection content={tournamentChapter}>
        <TournamentSchedule schedule={tournamentSchedule} />
      </ChapterSection>
      <PlayerGallery players={players} />
      <Footer contact={contactInfo} socialLinks={socialLinks} />
    </>
  );
}
