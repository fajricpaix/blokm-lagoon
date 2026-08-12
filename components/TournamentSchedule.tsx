"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScheduleItem } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TournamentSchedule({
  schedule,
}: {
  schedule: ScheduleItem[];
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".schedule-card", {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    },
    { scope: listRef }
  );

  return (
    <div ref={listRef} className="grid gap-4 pt-2">
      {schedule.map((item) => (
        <div
          key={item.id}
          className="schedule-card flex flex-col gap-2 rounded-lg border border-gold/20 bg-surface p-6"
        >
          <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-gold">
            {item.cadence}
          </span>
          <span className="text-sm font-medium text-sand">
            {item.format}
          </span>
          <p className="text-sm leading-relaxed text-sand">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
