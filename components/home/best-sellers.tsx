"use client";

import { useCommerce } from "@/lib/store";
import { ProductCard } from "@/components/products/product-card";

export function BestSellers() {
  const { products } = useCommerce();
  const best = products.filter((p) => p.bestseller);

  if (best.length === 0) return null;

  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {best.map((p) => (
        <div key={p.id} className="w-[220px] shrink-0 snap-start sm:w-[240px]">
          <ProductCard product={p} className="h-full" />
        </div>
      ))}
    </div>
  );
}