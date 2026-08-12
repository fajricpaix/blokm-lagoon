"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-eyebrow", { opacity: 0, y: 24, duration: 0.6 })
          .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
          .from(
            ".hero-subtitle",
            { opacity: 0, y: 24, duration: 0.6 },
            "-=0.5"
          )
          .from(".hero-scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.3");

        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-fade", {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 h-[115%] w-full">
        <Image
          src={content.imageSrc}
          alt={content.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>
      <div className="hero-fade relative z-10 flex w-full flex-col gap-4 px-6 pb-20 sm:px-12 sm:pb-28">
        <span className="hero-eyebrow text-sm font-medium uppercase tracking-[0.3em] text-sand">
          {content.eyebrow}
        </span>
        <h1 className="hero-title max-w-4xl text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl">
          {content.title}
        </h1>
        <p className="hero-subtitle max-w-xl text-base text-foreground/80 sm:text-lg">
          {content.subtitle}
        </p>
        <div className="hero-scroll-cue mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-sand">
          <span className="h-8 w-px animate-pulse bg-gold" />
          {content.scrollCue}
        </div>
      </div>
    </section>
  );
}
