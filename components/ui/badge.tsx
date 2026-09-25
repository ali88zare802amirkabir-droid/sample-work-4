"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "ok" | "warn" | "danger" | "info" | "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  ok: "bg-ok-soft text-ok border-ok/20",
  warn: "bg-warn-soft text-warn border-warn/20",
  danger: "bg-danger-soft text-danger border-danger/20",
  info: "bg-info-soft text-info border-info/20",
  accent: "bg-accent-soft text-accent border-accent/20",
  muted: "bg-surface-3 text-ink-2 border-edge",
};

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DiscountBadge({ pct, className }: { pct: number; className?: string }) {
  if (pct <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-danger px-1.5 py-0.5 text-[11px] font-bold text-white shadow-[0_4px_12px_-2px_rgba(251,113,133,0.5)]",
        className
      )}
    >
      −{pct}%
    </span>
  );
}