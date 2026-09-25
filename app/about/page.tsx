import Link from "next/link";
import {
  ArrowRight,
  Code2,
  LayoutTemplate,
  LifeBuoy,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PILLARS = [
  {
    icon: LayoutTemplate,
    title: "Design",
    desc: "A layered, glass-forward dark UI with a coherent token system. Every page reuses the same radii, spacing, typography, surfaces and motion language.",
  },
  {
    icon: Code2,
    title: "Technology",
    desc: "Next.js 16, TypeScript and Tailwind CSS v4 with a single commerce state store. Filters, search, wishlist, cart and a multi-step checkout all run live, locally.",
  },
  {
    icon: MousePointerClick,
    title: "Experience",
    desc: "Twenty-two products, five categories, working tabs, sortable grids and demo flows — every button does something. Built to feel like a real premium store.",
  },
];

const STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Lucide icons",
  "localStorage persistence",
  "CSS-first product visuals",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Badge tone="accent">
            <Sparkles className="h-3 w-3" /> Portfolio demonstration
          </Badge>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          NexaStore is a fictional e-commerce experience
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
          Created as a product design and development demonstration for a software
          portfolio. Browsing, filtering, search, wishlist, cart and a demo checkout —
          everything runs locally with sample data.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Explore the demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg">View admin dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="card p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2">
              <p.icon className="h-4.5 w-4.5 text-accent" />
            </div>
            <h2 className="text-[15px] font-semibold text-ink">{p.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-3">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-edge bg-surface p-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          Built with
        </p>
        <div className="flex flex-wrap gap-1.5">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-edge bg-surface-2 px-2.5 py-1 text-[12.5px] font-medium text-ink-2"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <LifeBuoy className="h-4 w-4 text-ink-3" />
        <p className="text-[12.5px] text-ink-3">
          Not a real store — no purchases, no accounts, no payments. All content is sample data.
        </p>
      </div>
    </div>
  );
}