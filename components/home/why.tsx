import { RefreshCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { BenefitTile } from "@/components/ui/section-head";

const BENEFITS = [
  {
    icon: Truck,
    title: "Fast delivery",
    desc: "Demo orders move instantly. In the real world we'd be shipping in one business day.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "A designed checkout flow built for portability — this demo never touches real payment data.",
  },
  {
    icon: Sparkles,
    title: "Quality products",
    desc: "Curated sample catalog that shows a range of premium product content.",
  },
  {
    icon: RefreshCcw,
    title: "Easy returns",
    desc: "Returns interfaces built for modern shopping expectations — no fine print, by design.",
  },
];

export function WhyNexaStore() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6">
      <div className="mb-6 max-w-xl">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Why NexaStore
        </p>
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          Designed for modern shopping
        </h2>
        <p className="mt-1.5 text-sm text-ink-3">
          A portfolio demo experience — principles, not promises. No real store behind it.
        </p>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <BenefitTile key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}