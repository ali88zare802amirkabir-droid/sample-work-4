"use client";

import { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";
import { useCommerce } from "@/lib/store";
import { discountPct } from "@/lib/utils";
import { ProductGrid } from "@/components/products/product-grid";
import { Badge } from "@/components/ui/badge";

const DEMO_DEADLINE = 2 * 86400 + 14 * 3600 + 32 * 60;

export function DealsClient() {
  const { products } = useCommerce();
  const [secs, setSecs] = useState(DEMO_DEADLINE);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSecs((s) => (s <= 0 ? DEMO_DEADLINE : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const deals = [...products]
    .filter((p) => (p.oldPrice ?? 0) > p.price)
    .sort((a, b) => discountPct(b.price, b.oldPrice) - discountPct(a.price, a.oldPrice));

  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-warn/25 bg-gradient-to-br from-warn/10 via-surface to-danger/10 p-8 sm:p-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-warn/20 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge tone="warn">
              <Flame className="h-3 w-3" /> Limited-time demo deals
            </Badge>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Deals that show off the pricing
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-2">
              Sample discounts across the catalog — percentage badges, strikethrough prices
              and a purely visual countdown. No real sale; just the interface.
            </p>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              <Clock className="h-3.5 w-3.5 text-warn" />
              Demo countdown
            </p>
            <div className="flex gap-1.5">
              {[
                [String(d).padStart(2, "0"), "days"],
                [String(h).padStart(2, "0"), "hrs"],
                [String(m).padStart(2, "0"), "min"],
                [String(s).padStart(2, "0"), "sec"],
              ].map(([n, label]) => (
                <div
                  key={label}
                  className="flex min-w-12 flex-col items-center rounded-xl border border-edge bg-surface px-2 py-2"
                >
                  <span className="text-lg font-bold tabular-nums text-warn">{n}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-ink-3">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mb-5 text-[13px] text-ink-3">
        {deals.length} discounted products · sorted by savings
      </p>
      <ProductGrid products={deals} />
    </div>
  );
}