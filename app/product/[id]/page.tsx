import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/app/product/[id]/product-detail";

export const generateStaticParams = () => products.map((p) => ({ id: p.id }));

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!products.some((p) => p.id === id)) notFound();
  return <ProductDetailClient id={id} />;
}