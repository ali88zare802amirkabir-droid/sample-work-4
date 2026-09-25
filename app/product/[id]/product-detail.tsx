"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCommerce } from "@/lib/store";
import { categoryById, relatedProducts, reviewsFor } from "@/lib/data";
import { money, cn, discountPct } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";
import { Badge, DiscountBadge } from "@/components/ui/badge";
import { RatingLine, Stars } from "@/components/ui/rating";
import { QuantityStepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty";
import { ProductGrid } from "@/components/products/product-grid";

type Tab = "info" | "specs" | "reviews";

const TABS: { id: Tab; label: string }[] = [
  { id: "info", label: "Product Information" },
  { id: "specs", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
];

export function ProductDetailClient({ id }: { id: string }) {
  const { products, addToCart, toggleWishlist, isWishlisted, toast } = useCommerce();
  const product = products.find((p) => p.id === id);
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState<Tab>("info");

  const related = useMemo(
    () => (product ? relatedProducts(products, product, 4) : []),
    [products, product]
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <EmptyState
          icon={PackageCheck}
          title="Product not found"
          desc="This product may have been removed from the demo catalog."
          action={
            <Link href="/shop">
              <Button variant="primary">Browse Shop</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const cat = categoryById(product.category);
  const pct = discountPct(product.price, product.oldPrice);
  const wishlisted = isWishlisted(product.id);
  const unavailable = product.inactive || product.stock <= 0;
  const reviews = reviewsFor(product.id);
  const activeColor = color ?? product.colors[0]?.name;
  const isNew = product.isNew;

  const added = () => {
    addToCart(product, { qty, color: activeColor });
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-[12.5px] text-ink-3" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-ink">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="transition-colors hover:text-ink">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate font-medium text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-edge">
            <ProductArt product={product} className="aspect-square w-full" iconSize={92} />
          </div>
          <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
            {isNew && <Badge tone="accent">New</Badge>}
            <DiscountBadge pct={pct} className="px-2 py-1 text-[13px]" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: cat.from }}
            >
              {cat.name}
            </span>
            <span className="text-ink-3">·</span>
            <span className="text-[11px] text-ink-3">{product.brand}</span>
          </div>

          <h1 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <RatingLine value={product.rating} count={product.reviewCount} />
            <a
              href="#reviews"
              onClick={() => setTab("reviews")}
              className="text-[12.5px] font-medium text-accent hover:text-cyan"
            >
              Read reviews
            </a>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold tabular-nums text-ink">{money(product.price)}</span>
            {pct > 0 && (
              <>
                <span className="text-lg font-medium tabular-nums text-ink-3 line-through">
                  {money(product.oldPrice ?? 0)}
                </span>
                <DiscountBadge pct={pct} />
              </>
            )}
          </div>

          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-[12px] font-medium text-ink-3">
                Color — <span className="text-ink">{activeColor}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={`Select color ${c.name}`}
                    aria-pressed={activeColor === c.name}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all active:scale-90",
                      activeColor === c.name
                        ? "border-accent"
                        : "border-edge hover:border-ink-3"
                    )}
                    style={{ backgroundColor: c.hex }}
                  >
                    {activeColor === c.name && (
                      <Check className="h-4 w-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button size="lg" variant="primary" disabled={unavailable} onClick={added} className="min-w-[180px] flex-1 sm:flex-none">
              <ShoppingBag className="h-4.5 w-4.5" />
              {unavailable ? "Out of stock" : "Add to Cart"}
            </Button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border transition-all active:scale-95",
                wishlisted
                  ? "border-danger/30 bg-danger/15 text-danger"
                  : "border-edge bg-surface-2 text-ink-2 hover:border-danger/30 hover:text-danger"
              )}
            >
              <Heart className={cn("h-5 w-5", wishlisted && "fill-danger")} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[12.5px] font-medium">
            {unavailable ? (
              <Badge tone="danger">Out of stock</Badge>
            ) : product.stock < 10 ? (
              <Badge tone="warn">Only {product.stock} left</Badge>
            ) : (
              <Badge tone="ok">In stock</Badge>
            )}
            <span className="text-ink-3">· ships demo-fast</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Free demo shipping" },
              { icon: ShieldCheck, label: "Secure demo checkout" },
              { icon: PackageCheck, label: "30-day returns demo" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-edge bg-surface-2 px-3 py-2.5 text-[12px] font-medium text-ink-2"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex gap-1 overflow-x-auto border-b border-edge no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative shrink-0 px-4 py-3 text-[13.5px] font-semibold transition-colors",
                tab === t.id ? "text-ink" : "text-ink-3 hover:text-ink-2"
              )}
            >
              {t.label}
              {t.id === "reviews" && reviews.length > 0 && (
                <span className="ml-1.5 text-[11px] text-ink-3">({reviews.length})</span>
              )}
              {tab === t.id && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-cyan" />
              )}
            </button>
          ))}
        </div>

        <div className="animate-fade-in py-6" key={tab}>
          {tab === "info" && (
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Product Information</h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
                  {product.longDescription}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-3">
                  All content on this page is sample data for a portfolio demonstration.
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <Badge key={tag} tone="muted">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-edge bg-surface p-5">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-3">Highlights</p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    ["Category", cat.name],
                    ["Brand", product.brand],
                    ["Colors", product.colors.map((c) => c.name).join(", ")],
                    ["Stock", product.stock > 0 ? `${product.stock} units` : "Out of stock"],
                    ["Availability", product.inactive ? "Hidden from shop" : "Live"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-start justify-between gap-4 text-[13px]">
                      <span className="text-ink-3">{k}</span>
                      <span className="text-right font-medium text-ink">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-3xl">
              <h2 className="font-display text-lg font-semibold text-ink">Specifications</h2>
              <dl className="mt-4 divide-y divide-edge rounded-2xl border border-edge bg-surface">
                {product.specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[180px_1fr]">
                    <dt className="text-[13px] text-ink-3">{k}</dt>
                    <dd className="text-[13.5px] font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tab === "reviews" && (
            <div id="reviews" className="max-w-3xl">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-lg font-semibold text-ink">Customer Reviews</h2>
                <div className="flex items-center gap-2 text-sm">
                  <Stars value={product.rating} size="md" />
                  <span className="font-bold text-ink">{product.rating.toFixed(1)}</span>
                  <span className="text-ink-3">from {product.reviewCount} demo reviews</span>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {reviews.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-edge bg-surface/50 px-4 py-8 text-center text-sm text-ink-3">
                    No written reviews yet for this product.
                  </p>
                ) : (
                  reviews.map((r) => (
                    <article key={r.id} className="rounded-2xl border border-edge bg-surface p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-surface-3 to-surface-2 text-[11px] font-bold text-ink-2">
                            {r.author.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold text-ink">{r.author}</p>
                            <p className="text-[11px] text-ink-3">{r.date}</p>
                          </div>
                        </div>
                        {r.verified && (
                          <Badge tone="ok">
                            <BadgeCheck className="h-3 w-3" /> Verified
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3">
                        <Stars value={r.rating} />
                        <p className="mt-1.5 text-[14px] font-semibold text-ink">{r.title}</p>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{r.body}</p>
                      </div>
                    </article>
                  ))
                )}
                <div className="flex items-center gap-2 rounded-xl border border-edge bg-surface-2 px-4 py-3 text-[12.5px] text-ink-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                  Reviews are fictional sample content written for this portfolio demo.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                Keep exploring
              </p>
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                You may also like
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                toast("Related products", { desc: "Demo related-items engine (category-first).", variant: "info" });
                router.push("/shop");
              }}
              className="text-sm font-medium text-accent hover:text-cyan"
            >
              View all →
            </button>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}