import Link from "next/link";
import { ArrowRight, Backpack, Gamepad2, Headphones, LaptopMinimal, Watch, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/lib/types";
import { categories, products } from "@/lib/data";

const ICONS: Record<CategoryId, LucideIcon> = {
  audio: Headphones,
  desk: LaptopMinimal,
  wearables: Watch,
  gaming: Gamepad2,
  accessories: Backpack,
};

export default function CategoriesPage() {
  const counts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-[12px] text-ink-3">NexaStore · Browse</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Categories
        </h1>
        <p className="mt-2 text-sm text-ink-3">
          Every product in the demo catalog lives under one of five categories. Pick one to
          jump straight into a filtered Shop view.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => {
          const Icon = ICONS[c.id];
          return (
            <Link
              key={c.id}
              href={`/shop?cat=${c.id}`}
              className="card group relative overflow-hidden p-6 transition-all duration-200 hover:-translate-y-1 hover:border-edge-strong hover:shadow-[var(--shadow-pop)]"
            >
              <div
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-45"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${c.from}44, ${c.to}44)` }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full border border-edge bg-surface-2 px-2.5 py-1 text-[11px] font-bold tabular-nums text-ink-2">
                  {counts[c.id] ?? 0} products
                </span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold text-ink">{c.name}</h2>
              <p className="text-[13px] font-medium" style={{ color: c.from }}>
                {c.tagline}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-3">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                Shop {c.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}

        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-warn/25 bg-gradient-to-br from-warn/10 via-surface to-accent/10 p-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-warn">Save money</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">
              Limited-time demo deals
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-3">
              Discounts that show off pricing treatments — badges, strikethroughs and a
              visual countdown.
            </p>
          </div>
          <Link
            href="/deals"
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-xl bg-warn/15 px-4 py-2.5 text-[13px] font-bold text-warn transition-all hover:bg-warn/25"
          >
            View Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}