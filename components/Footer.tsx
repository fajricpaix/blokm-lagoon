"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logoAlt, logoSrc, establishedYear } from "@/lib/data";
import type { ContactInfo, SocialLink } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer({
  contact,
  socialLinks,
}: {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="join-us"
      className="bg-surface px-6 py-20 text-foreground sm:px-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="footer-reveal relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <Image src={logoSrc} alt={logoAlt} fill sizes="80px" className="object-cover" />
          </div>
          <h2 className="footer-reveal max-w-md text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            Gabung Meja Kami
          </h2>
          <p className="footer-reveal max-w-md text-sand">{contact.address}</p>
          <p className="footer-reveal text-sand">{contact.hours}</p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="footer-reveal text-sand hover:text-foreground"
          >
            {contact.email}
          </a>
          <div className="footer-reveal mt-4 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-[0.2em] text-sand hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="footer-reveal mx-auto mt-16 max-w-6xl text-xs text-sand/60">
        © {new Date().getFullYear()} Blok M Serpong Lagoon · Sejak {establishedYear}. Semua hak
        cipta dilindungi.
      </p>
    </footer>
  );
}
