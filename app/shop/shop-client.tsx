"use client";

import { useMemo, useState } from "react";
import { PackageSearch, X } from "lucide-react";
import { useCommerce } from "@/lib/store";
import {
  filterProducts,
  categories,
  PRICE_BUCKETS,
  SORT_OPTIONS,
} from "@/lib/data";
import type { CategoryId, SortKey } from "@/lib/types";
import { ProductGrid } from "@/components/products/product-grid";
import {
  FiltersPanel,
  activeFilterCount,
  type FilterState,
} from "@/components/shop/filters";
import { FilterBarButton } from "@/components/shop/filters";
import { EmptyState } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";

export function ShopClient({
  initialQuery,
  initialCat,
  initialSort,
}: {
  initialQuery: string;
  initialCat?: CategoryId;
  initialSort?: SortKey;
}) {
  const { products } = useCommerce();
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    cat: initialCat ?? "all",
    priceIndex: -1,
    minRating: 0,
    inStock: false,
    onSale: false,
  });
  const [sort, setSort] = useState<SortKey>(initialSort ?? "featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  const bucket = filters.priceIndex >= 0 ? PRICE_BUCKETS[filters.priceIndex] : undefined;

  const results = useMemo(
    () =>
      filterProducts(products, {
        query: filters.query,
        category: filters.cat,
        minPrice: bucket?.min ?? null,
        maxPrice: bucket?.max ?? null,
        minRating: filters.minRating > 0 ? filters.minRating : null,
        inStockOnly: filters.inStock,
        onSaleOnly: filters.onSale,
        sort,
      }),
    [products, filters, bucket, sort]
  );

  const score = activeFilterCount(filters);

  const clearAll = () => {
    setFilters({ query: "", cat: "all", priceIndex: -1, minRating: 0, inStock: false, onSale: false });
    setSort("featured");
  };

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.query) {
    chips.push({ key: "q", label: `“${filters.query}”`, clear: () => setFilters({ ...filters, query: "" }) });
  }
  if (filters.cat !== "all") {
    const c = categories.find((x) => x.id === filters.cat);
    chips.push({ key: "cat", label: c?.name ?? "", clear: () => setFilters({ ...filters, cat: "all" }) });
  }
  if (bucket) {
    chips.push({ key: "price", label: bucket.label, clear: () => setFilters({ ...filters, priceIndex: -1 }) });
  }
  if (filters.minRating > 0) {
    chips.push({ key: "rating", label: `${filters.minRating}★+`, clear: () => setFilters({ ...filters, minRating: 0 }) });
  }
  if (filters.inStock) {
    chips.push({ key: "stock", label: "In stock", clear: () => setFilters({ ...filters, inStock: false }) });
  }
  if (filters.onSale) {
    chips.push({ key: "sale", label: "On sale", clear: () => setFilters({ ...filters, onSale: false }) });
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] text-ink-3">NexaStore catalog</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Shop all products
          </h1>
          <p className="mt-1 text-[13px] text-ink-3">
            {results.length} {results.length === 1 ? "product" : "products"}
            {filters.cat !== "all" && " in this category"}
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
          <div className="lg:hidden">
            <FilterBarButton count={score} onClick={() => setMobileFilters(true)} />
          </div>
          <div className="w-44 sm:w-52">
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.clear}
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-ink-2 transition-colors hover:border-danger/30 hover:text-danger"
            >
              {chip.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          {(score > 0 || sort !== "featured") && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[12px] font-medium text-ink-3 underline-offset-2 hover:text-ink hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="card sticky top-24 p-4">
            <FiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <div>
          {results.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              desc="Try removing a filter or two, or search for something else like “keyboard”."
              action={
                <Button variant="primary" onClick={clearAll}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>

      <Drawer open={mobileFilters} onClose={() => setMobileFilters(false)} title="Filters">
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FiltersPanel filters={filters} onChange={setFilters} />
        </div>
        <div className="border-t border-edge px-5 py-4">
          <Button className="w-full" variant="primary" size="lg" onClick={() => setMobileFilters(false)}>
            Show {results.length} {results.length === 1 ? "product" : "products"}
          </Button>
        </div>
      </Drawer>
    </div>
  );
}