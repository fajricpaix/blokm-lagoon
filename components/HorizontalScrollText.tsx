"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalScrollText({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const distance = track.scrollWidth - section.clientWidth;

        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: true,
            pin: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex items-center overflow-hidden bg-black py-16 md:h-screen md:py-0"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-2 whitespace-normal px-6 md:flex-row md:flex-nowrap md:gap-16 md:whitespace-nowrap md:px-16"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-6xl md:text-[8vw]"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
