"use client";

import { useCommerce } from "@/lib/store";
import { ProductGrid } from "@/components/products/product-grid";

export function FeaturedGrid() {
  const { products } = useCommerce();
  const bestIds = new Set(products.filter((p) => p.bestseller).map((p) => p.id));
  const featured = [
    ...products.filter((p) => p.featured && !bestIds.has(p.id)),
    ...products.filter((p) => p.isNew && !bestIds.has(p.id) && !p.featured),
  ].slice(0, 6);
  if (featured.length === 0) return null;
  return <ProductGrid products={featured} />;
}