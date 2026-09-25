"use client";

import Link from "next/link";
import { ArrowRight, Info, ShoppingBag, Trash2, X } from "lucide-react";
import { useCommerce } from "@/lib/store";
import { money } from "@/lib/utils";
import { categoryById } from "@/lib/data";
import { ProductArt } from "@/components/ui/product-art";
import { QuantityStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty";

export default function CartPage() {
  const {
    cart,
    products,
    updateQty,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
  } = useCommerce();

  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter(
      (x): x is { productId: string; qty: number; color?: string; product: NonNullable<typeof x.product> } =>
        !!x.product
    );

  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          desc="Everything you add shows up here with quantity controls and a live total."
          action={
            <Link href="/shop">
              <Button variant="primary">Start shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] text-ink-3">Almost there</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your cart
          </h1>
          <p className="mt-1 text-[13px] text-ink-3">
            {items.length} {items.length === 1 ? "product" : "products"} · stored locally in this browser
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-3 transition-colors hover:text-danger"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map(({ product, qty, color }) => {
            const cat = categoryById(product.category);
            return (
              <div key={product.id} className="card flex gap-4 p-3.5 sm:p-4">
                <Link
                  href={`/product/${product.id}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-edge"
                >
                  <ProductArt product={product} className="h-full w-full" iconSize={34} />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: cat.from }}>
                        {cat.name}
                      </p>
                      <Link
                        href={`/product/${product.id}`}
                        className="mt-0.5 line-clamp-2 text-[14px] font-semibold leading-snug text-ink hover:text-accent"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="rounded-md p-1.5 text-ink-3 transition-colors hover:bg-surface-2 hover:text-danger"
                      aria-label={`Remove ${product.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {color && <p className="mt-0.5 text-[11px] text-ink-3">Color: {color}</p>}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <QuantityStepper value={qty} onChange={(n) => updateQty(product.id, n - qty)} />
                    <div className="text-right">
                      <span className="block text-[13px] font-bold tabular-nums text-ink">
                        {money(product.price * qty)}
                      </span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="block text-[11px] tabular-nums text-ink-3 line-through">
                          {money(product.oldPrice * qty)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="card sticky top-24 p-5">
            <h2 className="font-display text-base font-semibold text-ink">Order summary</h2>
            <div className="mt-4 space-y-2.5 text-[13.5px]">
              <div className="flex items-center justify-between">
                <span className="text-ink-3">Subtotal</span>
                <span className="font-medium tabular-nums text-ink">{money(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-3">Discount</span>
                  <span className="font-medium tabular-nums text-ok">−{money(discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-ink-3">Shipping</span>
                <span className="font-medium tabular-nums text-ok">Free (demo)</span>
              </div>
              <div className="my-3 h-px bg-edge" />
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-ink">Total</span>
                <span className="text-xl font-bold tabular-nums text-ink">{money(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-5 block">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop" className="mt-2.5 block">
              <Button variant="secondary" size="lg" className="w-full">
                Continue shopping
              </Button>
            </Link>
            <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-3">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Checkout is a front-end demo. No payment is collected or processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}