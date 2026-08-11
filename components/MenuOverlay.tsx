"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { NavLink } from "@/lib/data";

export default function MenuOverlay({
  id,
  isOpen,
  onClose,
  navLinks,
}: {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] flex flex-col justify-between bg-black px-6 py-6 text-white sm:px-12"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">
              Blok M Serpong Lagoon
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu"
              className="text-sm uppercase tracking-[0.3em]"
            >
              Tutup
            </button>
          </div>
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              closed: {},
            }}
            className="flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 24 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-5xl font-semibold uppercase tracking-tight sm:text-7xl"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            Beyond The Table
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
