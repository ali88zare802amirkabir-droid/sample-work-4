import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SectionHead({
  eyebrow,
  title,
  desc,
  link,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
        {desc && <p className="mt-1.5 text-sm text-ink-3">{desc}</p>}
      </div>
      {link && (
        <Link
          href={link}
          className="group inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-cyan"
        >
          {linkLabel ?? "View all"}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function BenefitTile({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="card group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-edge-strong">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2 transition-colors group-hover:bg-accent-soft">
        <Icon className="h-4.5 w-4.5 text-accent" />
      </div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-3">{desc}</p>
    </div>
  );
}