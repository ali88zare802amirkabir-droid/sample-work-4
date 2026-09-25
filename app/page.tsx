import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { PromoBanner } from "@/components/home/promo-banner";
import { BestSellers } from "@/components/home/best-sellers";
import { SectionHead } from "@/components/ui/section-head";
import { categories, products } from "@/lib/data";

export default function HomePage() {
  const counts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-16 pb-6 sm:space-y-20">
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-[1280px] space-y-6 px-4 sm:px-6">
        <SectionHead eyebrow="Browse" title="Featured Categories" />
        <CategoryCards categories={categories} counts={counts} />
      </section>

      <section className="mx-auto max-w-[1280px] space-y-6 px-4 sm:px-6">
        <SectionHead
          eyebrow="Handpicked"
          title="Featured Products"
          desc="A quick look at the most-loved items in the catalog."
          link="/shop"
          linkLabel="Shop all"
        />
        <FeaturedGrid />
      </section>

      <PromoBanner />

      <section className="mx-auto max-w-[1280px] space-y-6 px-4 sm:px-6">
        <SectionHead
          eyebrow="Popular"
          title="Best Sellers"
          desc="Swipe through the horizontal rail — or open any product for details."
          link="/shop?sort=rated"
          linkLabel="Top rated"
        />
        <BestSellers />
      </section>
    </div>
  );
}