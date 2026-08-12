"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";
import type { GalleryPhoto } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gallery-reveal", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="galeri"
      ref={sectionRef}
      className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 text-center md:py-36"
    >
      <div className="gallery-reveal flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">Galeri</span>
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Galeri Foto</h2>
        <p className="max-w-xl text-sm text-sand sm:text-base">
          Momen-momen di meja domino Blok M Serpong Lagoon — dari latihan mingguan sampai final turnamen.
        </p>
      </div>

      <div className="gallery-reveal w-full">
        <ImageGallery images={photos} />
      </div>
    </section>
  );
}
