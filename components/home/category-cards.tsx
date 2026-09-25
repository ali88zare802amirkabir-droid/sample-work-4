import Link from "next/link";
import { Backpack, Gamepad2, Headphones, LaptopMinimal, Watch, type LucideIcon } from "lucide-react";
import type { Category, CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<CategoryId, LucideIcon> = {
  audio: Headphones,
  desk: LaptopMinimal,
  wearables: Watch,
  gaming: Gamepad2,
  accessories: Backpack,
};

export function CategoryCards({
  categories,
  counts,
}: {
  categories: Category[];
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
      {categories.map((c) => {
        const Icon = ICONS[c.id];
        return (
          <Link
            key={c.id}
            href={`/shop?cat=${c.id}`}
            className="card group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-1 hover:border-edge-strong hover:shadow-[var(--shadow-pop)]"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
              style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
              aria-hidden
            />
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 shadow-md"
              style={{ background: `linear-gradient(135deg, ${c.from}33, ${c.to}33)` }}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <p className="font-display text-[15px] font-semibold text-ink">{c.name}</p>
            <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-3">
              {c.blurb}
            </p>
            <p
              className={cn("mt-3 text-[11px] font-semibold")}
              style={{ color: c.from }}
            >
              {counts[c.id] ?? 0} products
            </p>
          </Link>
        );
      })}
    </div>
  );
}