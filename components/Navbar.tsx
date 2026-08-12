"use client";

import Image from "next/image";
import { useState } from "react";
import MenuOverlay from "@/components/MenuOverlay";
import { useLenis } from "@/components/SmoothScrollProvider";
import { logoAlt, logoSrc } from "@/lib/data";
import type { NavLink } from "@/lib/data";

const MENU_ID = "menu-overlay";

export default function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const lenisRef = useLenis();

  const openMenu = () => {
    setIsOpen(true);
    lenisRef?.current?.stop();
  };

  const closeMenu = () => {
    setIsOpen(false);
    lenisRef?.current?.start();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-linear-to-b from-background/80 via-background/40 to-transparent px-6 py-4 backdrop-blur-sm sm:px-12 sm:py-5">
        <button
          type="button"
          onClick={() => lenisRef?.current?.scrollTo(0)}
          aria-label="Kembali ke atas"
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold/60 shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            sizes="(min-width: 640px) 80px, 64px"
            className="object-cover"
            priority
          />
        </button>
        <button
          type="button"
          onClick={openMenu}
          aria-label="Buka menu"
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="h-px w-7 bg-gold" />
          <span className="h-px w-7 bg-gold" />
        </button>
      </header>
      <MenuOverlay
        id={MENU_ID}
        isOpen={isOpen}
        onClose={closeMenu}
        navLinks={navLinks}
      />
    </>
  );
}
