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
