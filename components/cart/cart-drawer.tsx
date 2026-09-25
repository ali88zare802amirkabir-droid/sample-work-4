"use client";

import Link from "next/link";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useCommerce } from "@/lib/store";
import { Drawer } from "@/components/ui/drawer";
import { ProductArt } from "@/components/ui/product-art";
import { QuantityStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
import { categoryById } from "@/lib/data";

export function CartDrawer() {
  const {
    cart,
    products,
    cartOpen,
    cartCount,
    setCartOpen,
    updateQty,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
  } = useCommerce();

  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter((x) => !!x.product) as { productId: string; qty: number; color?: string; product: NonNullable<(typeof products)[number]> }[];

  const total = subtotal - discount;

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={
        <span>
          Your cart{" "}
          <span className="font-normal text-ink-3">({cartCount} {cartCount === 1 ? "item" : "items"})</span>
        </span>
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-edge bg-surface-2">
            <ShoppingBag className="h-7 w-7 text-ink-3" />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-ink">Your cart is empty</p>
            <p className="mt-1 text-[13px] text-ink-3">
              Add something you love — everything ships from demo-land instantly.
            </p>
          </div>
          <Button size="sm" onClick={() => setCartOpen(false)}>
            Continue shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {items.map(({ product, qty, color }) => {
              const cat = categoryById(product.category);
              return (
                <div key={product.id} className="flex gap-3 rounded-xl border border-edge bg-surface-2 p-3">
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setCartOpen(false)}
                    className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-edge"
                  >
                    <ProductArt product={product} className="h-full w-full" iconSize={26} />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setCartOpen(false)}
                        className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink hover:text-accent"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-md p-1 text-ink-3 transition-colors hover:bg-surface-3 hover:text-danger"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {color && (
                      <p className="mt-0.5 text-[11px] text-ink-3">Color: {color}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper compact value={qty} onChange={(n) => updateQty(product.id, n - qty)} />
                      <span className="text-[13.5px] font-semibold tabular-nums text-ink">
                        {money(product.price * qty)}
                      </span>
                    </div>
                  </div>
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
                    aria-hidden
                  />
                </div>
              );
            })}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-3 transition-colors hover:text-danger"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            </div>
          </div>

          <div className="border-t border-edge px-5 py-4">
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="text-ink-3">Subtotal</span>
              <span className="font-medium tabular-nums text-ink">{money(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span className="text-ink-3">Discount</span>
                <span className="font-medium tabular-nums text-ok">−{money(discount)}</span>
              </div>
            )}
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="text-ink-3">Shipping</span>
              <span className="font-medium tabular-nums text-ok">Free (demo)</span>
            </div>
            <div className="my-3 h-px bg-edge" />
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Total</span>
              <span className="text-lg font-bold tabular-nums text-ink">{money(total)}</span>
            </div>
            <div className="space-y-2">
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="block">
                <Button className="w-full" variant="primary" size="lg">
                  Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="block">
                <Button className="w-full" variant="secondary" size="lg">
                  View Cart
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-center text-[11px] text-ink-3">
              Demo checkout — no real payment is processed.
            </p>
          </div>
        </>
      )}
    </Drawer>
  );
}