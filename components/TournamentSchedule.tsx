import type { ScheduleItem } from "@/lib/data";

export default function TournamentSchedule({
  schedule,
}: {
  schedule: ScheduleItem[];
}) {
  return (
    <div className="grid gap-4 pt-2">
      {schedule.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 rounded-lg border border-gold/20 bg-surface p-6"
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
