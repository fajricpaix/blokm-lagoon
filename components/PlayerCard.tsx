import Image from "next/image";
import type { Player } from "@/lib/data";

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gold/20 bg-surface">
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <Image
          src={player.imageSrc}
          alt={player.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-5">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">
          {player.nickname}
        </span>
        <h3 className="text-xl font-semibold text-foreground">{player.name}</h3>
        <p className="text-sm text-sand">{player.achievement}</p>
      </div>
    </div>
  );
}
