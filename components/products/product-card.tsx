"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ProductArt } from "@/components/ui/product-art";
import { DiscountBadge, Badge } from "@/components/ui/badge";
import { RatingLine } from "@/components/ui/rating";
import { useCommerce } from "@/lib/store";
import { categoryById } from "@/lib/data";
import { money, discountPct, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCommerce();
  const category = categoryById(product.category);
  const pct = discountPct(product.price, product.oldPrice);
  const wishlisted = isWishlisted(product.id);
  const unavailable = product.inactive || product.stock <= 0;

  return (
    <div
      className={cn(
        "card group relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-[var(--shadow-pop)]",
        className
      )}
    >
      <Link href={`/product/${product.id}`} className="relative block" tabIndex={-1} aria-hidden>
        <div className="relative aspect-square overflow-hidden">
          <div className={cn("h-full w-full transition-transform duration-300 group-hover:scale-[1.05]")}>
            <ProductArt product={product} className="h-full w-full" iconSize={42} />
          </div>
        </div>
      </Link>

      <div className="absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5">
        {product.isNew && <Badge tone="accent">New</Badge>}
        <DiscountBadge pct={pct} />
      </div>

      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
          "absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 active:scale-90",
          wishlisted
            ? "border-danger/30 bg-danger/15 text-danger"
            : "border-edge bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] text-ink-2 backdrop-blur hover:border-danger/30 hover:text-danger"
        )}
      >
        <Heart className={cn("h-4 w-4", wishlisted && "fill-danger")} />
      </button>

      {unavailable && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg/60 backdrop-blur-[2px]">
          <Badge tone="muted" className="px-2.5 py-1 text-xs">Out of stock</Badge>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: category.from }}>
          {category.name}
        </p>
        <Link href={`/product/${product.id}`} className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-ink transition-colors hover:text-accent">
          {product.name}
        </Link>
        <RatingLine value={product.rating} count={product.reviewCount} />
        <div className="flex items-baseline gap-2">
          <span className="text-[15px] font-bold tabular-nums text-ink">{money(product.price)}</span>
          {pct > 0 && (
            <span className="text-[12.5px] font-medium tabular-nums text-ink-3 line-through">
              {money(product.oldPrice ?? 0)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-2">
          <button
            type="button"
            disabled={unavailable}
            onClick={() => addToCart(product)}
            className={cn(
              "flex h-9.5 w-full items-center justify-center gap-2 rounded-xl text-[13px] font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-40",
              "bg-gradient-to-b from-[var(--accent)] to-[color-mix(in_srgb,var(--accent)_80%,var(--cyan))] text-white shadow-[0_4px_16px_-4px_color-mix(in_srgb,var(--accent)_55%,transparent)] hover:brightness-110"
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            {unavailable ? "Unavailable" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}