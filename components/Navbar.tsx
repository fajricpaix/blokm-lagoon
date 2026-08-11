"use client";

import { useState } from "react";
import MenuOverlay from "@/components/MenuOverlay";
import type { NavLink } from "@/lib/data";

export default function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 sm:px-12">
        <a
          href="#"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          Blok M Lagoon
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Buka menu"
          aria-expanded={isOpen}
          className="flex flex-col gap-1.5 p-2"
        >
          <span className="h-px w-7 bg-white" />
          <span className="h-px w-7 bg-white" />
        </button>
      </header>
      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
