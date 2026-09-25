"use client";

import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/product-card";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) return null;
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}