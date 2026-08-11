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
      <ChapterSection content={playersChapter}>
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </ChapterSection>
      <HorizontalScrollText text={ctaMarqueeText} />
      <Footer contact={contactInfo} socialLinks={socialLinks} />
    </>
  );
}
