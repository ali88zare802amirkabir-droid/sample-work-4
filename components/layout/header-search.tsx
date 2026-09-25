"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { useCommerce } from "@/lib/store";
import { searchProducts } from "@/lib/data";
import { money, cn } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";

const SUGGESTIONS = ["keyboard", "headphones", "wireless", "watch"];

export function HeaderSearchBox({
  onNavigate,
  autoFocus,
}: {
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const { products, search, setSearch } = useCommerce();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const q = search.trim();
  const results = q ? searchProducts(products, search) : [];

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (href: string, keepSearch = false) => {
    if (!keepSearch) setSearch("");
    setIsOpen(false);
    router.push(href);
    onNavigate?.();
  };

  const showPanel = isOpen && q; // results may be empty -> shows empty state
  const showSuggestions = isOpen && !q;

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products…"
          aria-label="Search products"
          autoFocus={autoFocus}
          className="h-10 w-full rounded-xl border border-edge bg-bg-soft pl-9 pr-9 text-[13px] text-ink placeholder:text-ink-3 transition-colors focus:border-accent/50 focus:bg-surface focus:outline-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-3 transition-colors hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-edge-strong bg-surface shadow-[var(--shadow-pop)] animate-rise">
          {results.length === 0 && q ? (
            <div className="flex flex-col items-start gap-1 px-4 py-5">
              <p className="text-sm font-semibold text-ink">No products found</p>
              <p className="text-[13px] text-ink-3">
                Nothing matched “{q}” — try “keyboard” or “wireless”.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-2 text-[13px] font-medium text-accent hover:text-cyan"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div>
              <div className="max-h-[380px] overflow-y-auto p-1.5">
                {results.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => go(`/product/${p.id}`)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-2"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-edge">
                      <ProductArt product={p} className="h-full w-full" iconSize={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
                      <p className="text-[11px] text-ink-3">{p.category}</p>
                    </div>
                    <span className="text-[13px] font-semibold tabular-nums text-ink">
                      {money(p.price)}
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-edge px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => go("/shop", true)}
                  className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:bg-accent-soft"
                >
                  See all results in Shop
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showSuggestions && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-edge-strong bg-surface p-2 shadow-[var(--shadow-pop)] animate-rise">
          <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-1.5 px-2 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => go(`/shop?q=${s}`, true)}
                className={cn(
                  "rounded-lg border border-edge bg-surface-2 px-2.5 py-1 text-[12.5px] font-medium text-ink-2 transition-colors hover:border-edge-strong hover:text-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}