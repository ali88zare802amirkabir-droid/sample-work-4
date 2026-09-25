import { categories } from "@/lib/data";

export function Marquee() {
  const items = [
    ...categories.map((c) => c.name),
    ...categories.map((c) => c.name),
    ...categories.map((c) => c.name),
    ...categories.map((c) => c.name),
  ];

  return (
    <div className="relative overflow-hidden border-y border-edge bg-surface/30 py-3" aria-hidden>
      <div className="animate-ticker flex w-max items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((name, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-ink-3">
              {name}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}