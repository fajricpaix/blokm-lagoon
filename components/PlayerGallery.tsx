"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Player } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PlayerGallery({ players }: { players: Player[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: stageRef.current,
          },
        });

        players.forEach((_, i) => {
          const cardEl = cardRefs.current[i];
          const capEl = captionRefs.current[i];
          if (!cardEl || !capEl) return;

          const slotStart = i;

          tl.fromTo(
            cardEl,
            { z: -900, scale: 0.55, opacity: 0 },
            { z: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power1.out" },
            slotStart
          ).fromTo(capEl, { y: 100 }, { y: 0, duration: 0.3 }, "<");

          if (i < players.length - 1) {
            tl.to(
              cardEl,
              { z: 500, scale: 1.3, opacity: 0, duration: 0.4, ease: "power1.in" },
              slotStart + 0.6
            ).to(capEl, { y: -100, duration: 0.3 }, "<");
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `${players.length * 100}vh` }}
      className="relative"
      id="the-players"
    >
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden bg-background"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/top-bg.png"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 px-6 pt-28 text-center md:pt-32">
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Bab 04
          </span>
          <h2 className="mt-2 text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-5xl">
            Para Pemain
          </h2>
        </div>

        {players.map((player, i) => (
          <div
            key={`${player.id}-photo`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="fixed inset-0 opacity-0 md:absolute"
          >
            <div className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-gold/30 sm:w-[60%] md:w-[25%]">
              <Image
                src={player.imageSrc}
                alt={player.imageAlt}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-20 z-10 mx-auto h-20 w-full max-w-xl overflow-hidden px-6 text-center">
          {players.map((player, i) => (
            <div
              key={`${player.id}-caption`}
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-0 translate-y-25"
            >
              <p className="text-lg font-semibold text-foreground">
                {player.name}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {player.nickname}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
