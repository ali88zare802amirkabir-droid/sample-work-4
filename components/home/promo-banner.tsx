import Link from "next/link";
import { ArrowRight, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-edge" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a2e] via-[#10161f] to-[#1a1026]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(56,189,248,0.22), transparent 42%), radial-gradient(circle at 82% 70%, rgba(167,139,250,0.2), transparent 46%)",
          }}
        />
        <div className="relative grid gap-6 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-warn/25 bg-warn-soft px-2.5 py-1 text-[11px] font-bold text-warn">
              <BadgePercent className="h-3.5 w-3.5" />
              Demo promo
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Upgrade your setup.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-2">
              A set of curated discounts across desks, audio and everyday carry.
              Discounts are sample data — but the experience is real.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link href="/deals">
              <Button size="lg" variant="primary">
                View Deals
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-3 text-[12px] text-ink-3 lg:text-right">
              Limited-time *demo* countdown — purely visual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}