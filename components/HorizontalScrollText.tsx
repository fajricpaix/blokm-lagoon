"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesCore } from "@/components/ui/sparkles";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalScrollText({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const section = sectionRef.current;
          if (!track || !section) return;

          if (track.scrollWidth - section.clientWidth <= 0) return;

          gsap.to(track, {
            x: () => -(track.scrollWidth - section.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${track.scrollWidth - section.clientWidth}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-surface py-12 md:h-screen md:py-0"
    >
      <div className="absolute inset-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          particleColor="#D4A359"
          speed={0.8}
          className="h-full w-full"
        />
      </div>
      <div
        ref={trackRef}
        className="relative z-10 flex flex-col gap-2 whitespace-normal px-6 md:flex-row md:flex-nowrap md:gap-16 md:whitespace-nowrap md:px-16"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden={i !== 0 ? "true" : undefined}
            className={`text-4xl font-semibold uppercase tracking-tight text-foreground sm:text-6xl md:text-[8vw] ${
              i !== 0 ? "hidden md:block" : ""
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
