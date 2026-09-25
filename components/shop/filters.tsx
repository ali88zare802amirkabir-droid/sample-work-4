"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CategoryId } from "@/lib/types";
import { categories, PRICE_BUCKETS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface FilterState {
  query: string;
  cat: CategoryId | "all";
  priceIndex: number; // -1 = any
  minRating: number; // 0 = any
  inStock: boolean;
  onSale: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  cat: "all",
  priceIndex: -1,
  minRating: 0,
  inStock: false,
  onSale: false,
};

export function activeFilterCount(f: FilterState): number {
  let n = 0;
  if (f.query) n++;
  if (f.cat !== "all") n++;
  if (f.priceIndex >= 0) n++;
  if (f.minRating > 0) n++;
  if (f.inStock) n++;
  if (f.onSale) n++;
  return n;
}

export function FiltersPanel({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const score = activeFilterCount(filters);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          <Search className="h-3.5 w-3.5" /> Search
        </p>
        <Input
          value={filters.query}
          onChange={(e) => set({ query: e.target.value })}
          placeholder="e.g. keyboard"
        />
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          Category
        </p>
        <div className="space-y-1">
          <FilterRow active={filters.cat === "all"} onClick={() => set({ cat: "all" })}>
            <span className="h-2 w-2 rounded-full bg-ink-3" />
            All products
          </FilterRow>
          {categories.map((c) => (
            <FilterRow
              key={c.id}
              active={filters.cat === c.id}
              onClick={() => set({ cat: c.id })}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
              />
              {c.name}
            </FilterRow>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          Price
        </p>
        <div className="space-y-1">
          <FilterRow active={filters.priceIndex === -1} onClick={() => set({ priceIndex: -1 })}>
            Any price
          </FilterRow>
          {PRICE_BUCKETS.map((b, i) => (
            <FilterRow
              key={b.label}
              active={filters.priceIndex === i}
              onClick={() => set({ priceIndex: i })}
            >
              {b.label}
            </FilterRow>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          Rating
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => set({ minRating: r })}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                filters.minRating === r
                  ? "border-accent/40 bg-accent-soft text-accent"
                  : "border-edge bg-surface-2 text-ink-2 hover:text-ink"
              )}
            >
              {r === 0 ? "Any" : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-edge pt-4">
        <Toggle
          label="In stock"
          checked={filters.inStock}
          onChange={(v) => set({ inStock: v })}
        />
        <Toggle
          label="On sale"
          checked={filters.onSale}
          onChange={(v) => set({ onSale: v })}
        />
      </div>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_FILTERS)}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-3 transition-colors hover:text-danger"
      >
        <X className="h-3.5 w-3.5" />
        Reset filters
        {score > 0 && <span className="text-danger">({score})</span>}
      </button>
    </div>
  );
}

function FilterRow({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
        active
          ? "bg-accent-soft font-semibold text-accent"
          : "font-medium text-ink-2 hover:bg-surface-2 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between py-0.5"
    >
      <span className="text-[13px] font-medium text-ink-2">{label}</span>
      <span
        className={cn(
          "relative h-5.5 w-9.5 rounded-full border transition-colors",
          checked ? "border-accent/50 bg-accent" : "border-edge bg-surface-3"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow transition-all",
            checked ? "left-[calc(100%-1.1rem)]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function FilterBarButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-edge bg-surface-2 px-3.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface-3"
    >
      <SlidersHorizontal className="h-4 w-4" />
      Filters
      {count > 0 && (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}