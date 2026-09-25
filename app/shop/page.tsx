import type { CategoryId, SortKey } from "@/lib/types";
import { ShopClient } from "@/app/shop/shop-client";

interface ShopParams {
  q?: string;
  cat?: string;
  sort?: string;
}

export default async function ShopPage({ searchParams }: { searchParams?: Promise<ShopParams> }) {
  const sp = (await searchParams) ?? {};
  const cat = ["audio", "desk", "wearables", "gaming", "accessories"].includes(sp.cat ?? "")
    ? (sp.cat as CategoryId)
    : undefined;
  const sort: SortKey | undefined = ["featured", "newest", "price-asc", "price-desc", "rated"].includes(
    sp.sort ?? ""
  )
    ? (sp.sort as SortKey)
    : undefined;

  return <ShopClient initialQuery={sp.q ?? ""} initialCat={cat} initialSort={sort} />;
}