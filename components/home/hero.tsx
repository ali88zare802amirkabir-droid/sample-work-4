import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles, Star } from "lucide-react";
import { ProductArt } from "@/components/ui/product-art";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productById, categoryById } from "@/lib/data";
import { money } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function Hero() {
  const main = productById("orbit-watch");
  const sideA = productById("aerowave-a1");
  const sideB = productById("keytype-k87");
  if (!main || !sideA || !sideB) return null;

  return (
    <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-20 lg:pt-16">
      <div className="max-w-xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="accent">
            <Sparkles className="h-3 w-3" /> Demo experience
          </Badge>
          <Badge tone="muted">22 products live</Badge>
        </div>
        <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
          Technology that{" "}
          <span className="bg-gradient-to-r from-[var(--accent)] to-cyan bg-clip-text text-transparent">
            fits your world.
          </span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
          A curated demo store for modern desks, ears and everyday carry. Browse,
          filter, wishlist and check out — everything runs locally, nothing is real.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop">
            <Button size="lg" variant="primary">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/deals">
            <Button size="lg">
              <BadgePercent className="h-4 w-4" />
              View Deals
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-ink-3">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-warn text-warn" /> 4.6 average rating
          </span>
          <span>…any store, this time demo</span>
        </div>
      </div>

      <HeroScene main={main} sideA={sideA} sideB={sideB} />
    </section>
  );
}

function HeroScene({ main, sideA, sideB }: { main: Product; sideA: Product; sideB: Product }) {
  const cat = categoryById(main.category);
  return (
    <div className="relative hidden h-[300px] sm:block lg:h-[460px]" aria-hidden>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
      />

      <div className="absolute left-1/2 top-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 animate-float-slow lg:w-56">
        <Link href={`/product/${main.id}`} className="card block overflow-hidden">
          <ProductArt product={main} className="aspect-square w-full" iconSize={54} />
          <div className="px-3.5 py-3">
            <p className="truncate text-[13px] font-semibold text-ink">{main.name}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink">{money(main.price)}</span>
              <Badge tone="warn">Best seller</Badge>
            </div>
          </div>
        </Link>
      </div>

      <div
        className="absolute left-[4%] top-[12%] w-36 animate-float-slow opacity-90 lg:left-[8%]"
        style={{ animationDelay: "0.8s" }}
      >
        <Link href={`/product/${sideA.id}`} className="card block overflow-hidden -rotate-6">
          <ProductArt product={sideA} className="aspect-square w-full" iconSize={30} />
          <div className="px-3 py-2">
            <p className="truncate text-[11.5px] font-semibold text-ink">{sideA.name}</p>
          </div>
        </Link>
      </div>

      <div
        className="absolute right-[3%] bottom-[8%] w-36 animate-float-slow opacity-90 lg:right-[7%]"
        style={{ animationDelay: "1.6s" }}
      >
        <Link href={`/product/${sideB.id}`} className="card block overflow-hidden rotate-6">
          <ProductArt product={sideB} className="aspect-square w-full" iconSize={30} />
          <div className="px-3 py-2">
            <p className="truncate text-[11.5px] font-semibold text-ink">{sideB.name}</p>
          </div>
        </Link>
      </div>

      <span
        className="absolute right-[16%] top-[8%] rounded-lg border border-warn/25 bg-warn-soft px-2 py-1 text-[11px] font-bold text-warn"
        style={{ animationDelay: "0.4s" }}
      >
        −24% today
      </span>
    </div>
  );
}