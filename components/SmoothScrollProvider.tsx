"use client";

import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useRef } from "react";
import type { RefObject } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Returns a ref object whose `.current` holds the active Lenis instance
 * (or null under reduced motion / before initialization). Deref `.current`
 * at call time (e.g. inside an event handler), not at render time, since
 * the instance is created asynchronously in an effect after mount.
 */
export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenisInstance = new Lenis({ autoRaf: false, anchors: true });
    document.documentElement.style.scrollBehavior = "auto";
    lenisInstance.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenisInstance;

    const update = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      document.documentElement.style.scrollBehavior = "";
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
