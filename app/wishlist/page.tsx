"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCommerce } from "@/lib/store";
import { categoryById } from "@/lib/data";
import { money, discountPct } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, moveToCart } = useCommerce();
  const items = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          desc="Tap the heart on any product to save it here. Demo wishlists stay on this device."
          action={
            <Link href="/shop">
              <Button variant="primary">Explore products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="mb-6">
        <p className="text-[12px] text-ink-3">Saved for later</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Wishlist
        </h1>
        <p className="mt-1 text-[13px] text-ink-3">
          {items.length} {items.length === 1 ? "product" : "products"} · move anything to your cart
        </p>
      </div>

      <div className="space-y-3">
        {items.map((p) => {
          const cat = categoryById(p.category);
          const pct = discountPct(p.price, p.oldPrice);
          return (
            <div
              key={p.id}
              className="card flex items-center gap-4 p-3.5 transition-all duration-200 hover:border-edge-strong sm:p-4"
            >
              <Link href={`/product/${p.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-edge sm:h-24 sm:w-24">
                <ProductArt product={p} className="h-full w-full" iconSize={30} />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: cat.from }}>
                  {cat.name}
                </p>
                <Link
                  href={`/product/${p.id}`}
                  className="mt-0.5 line-clamp-1 text-[14px] font-semibold text-ink hover:text-accent sm:line-clamp-2"
                >
                  {p.name}
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[14px] font-bold tabular-nums text-ink">{money(p.price)}</span>
                  {pct > 0 && (
                    <span className="text-[12px] tabular-nums text-ink-3 line-through">
                      {money(p.oldPrice ?? 0)}
                    </span>
                  )}
                  {p.inactive || p.stock <= 0 ? (
                    <Badge tone="danger">Out of stock</Badge>
                  ) : (
                    <Badge tone="ok">In stock</Badge>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button size="sm" variant="primary" onClick={() => moveToCart(p)} disabled={p.inactive || p.stock <= 0}>
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Move to cart</span>
                  <span className="sm:hidden">Add</span>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toggleWishlist(p)} aria-label={`Remove ${p.name}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}