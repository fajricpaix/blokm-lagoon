"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Player } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pair = { left: Player; right?: Player };

function toPairs(players: Player[]): Pair[] {
  const pairs: Pair[] = [];
  for (let i = 0; i < players.length; i += 2) {
    pairs.push({ left: players[i], right: players[i + 1] });
  }
  return pairs;
}

export default function PlayerGallery({ players }: { players: Player[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pairRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pairs = toPairs(players);

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

        pairs.forEach((_, i) => {
          const pairEl = pairRefs.current[i];
          const bgEl = bgRefs.current[i];
          const capEl = captionRefs.current[i];
          if (!pairEl || !bgEl || !capEl) return;

          if (i > 0) {
            tl.fromTo(
              pairEl,
              { z: -900, opacity: 0 },
              { z: 0, opacity: 1, duration: 1, ease: "power1.inOut" },
              i - 0.5
            )
              .fromTo(bgEl, { opacity: 0 }, { opacity: 1, duration: 1 }, "<")
              .fromTo(
                capEl,
                { y: 100 },
                { y: 0, duration: 0.6 },
                "<"
              );
          }

          if (i < pairs.length - 1) {
            tl.to(
              pairEl,
              { z: 500, opacity: 0, duration: 1, ease: "power1.inOut" },
              i + 0.5
            )
              .to(bgEl, { opacity: 0, duration: 1 }, "<")
              .to(capEl, { y: -100, duration: 0.6 }, "<");
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{ height: `${pairs.length * 100}vh` }}
      className="relative"
    >
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden bg-background"
        style={{ perspective: "1200px" }}
      >
        {pairs.map((pair, i) => (
          <div
            key={`${pair.left.id}-bg`}
            ref={(el) => {
              bgRefs.current[i] = el;
            }}
            className={`absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={pair.left.imageSrc}
              alt=""
              fill
              sizes="100vw"
              className="scale-110 object-cover blur-2xl"
            />
            <div className="absolute inset-0 bg-background/40" />
          </div>
        ))}

        {pairs.map((pair, i) => (
          <div
            key={`${pair.left.id}-photos`}
            ref={(el) => {
              pairRefs.current[i] = el;
            }}
            style={{ transformStyle: "preserve-3d" }}
            className={`fixed inset-0 md:absolute ${
              i === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute left-[6%] top-1/2 aspect-square w-[42%] -translate-y-1/2 overflow-hidden rounded-lg border border-gold/30 sm:left-[10%] md:w-[38%]">
              <Image
                src={pair.left.imageSrc}
                alt={pair.left.imageAlt}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
            {pair.right && (
              <div className="absolute right-[6%] top-1/2 aspect-square w-[42%] -translate-y-1/2 overflow-hidden rounded-lg border border-gold/30 sm:right-[10%] md:w-[38%]">
                <Image
                  src={pair.right.imageSrc}
                  alt={pair.right.imageAlt}
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-10 z-10 mx-auto h-20 w-full max-w-xl overflow-hidden px-6 text-center">
          {pairs.map((pair, i) => (
            <div
              key={`${pair.left.id}-caption`}
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className={`absolute inset-x-0 top-0 ${
                i === 0 ? "translate-y-0" : "translate-y-[100px]"
              }`}
            >
              <p className="text-lg font-semibold text-foreground">
                {pair.left.name}
                {pair.right ? ` & ${pair.right.name}` : ""}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {pair.left.nickname}
                {pair.right ? ` · ${pair.right.nickname}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
