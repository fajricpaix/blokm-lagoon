"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ChapterContent } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ChapterSection({
  content,
}: {
  content: ChapterContent;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".chapter-reveal", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  const imageFirst = content.align === "left";

  return (
    <section
      id={content.id}
      ref={sectionRef}
      className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24 md:flex-row md:items-center md:gap-16 md:py-36"
    >
      <div
        className={`chapter-reveal relative aspect-[4/5] w-full overflow-hidden rounded-lg md:w-1/2 ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={`https://picsum.photos/seed/${content.imageSeed}/1000/1250`}
          alt={content.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className={`flex w-full flex-col gap-5 md:w-1/2 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        <span className="chapter-reveal text-sm font-medium uppercase tracking-[0.3em] text-white/50">
          {content.eyebrow}
        </span>
        <h2 className="chapter-reveal text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
          {content.title}
        </h2>
        <p className="chapter-reveal max-w-prose text-base leading-relaxed text-white/70 sm:text-lg">
          {content.body}
        </p>
      </div>
    </section>
  );
}
