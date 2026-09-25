"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  desc,
  action,
}: {
  icon: LucideIcon;
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-edge bg-surface/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-surface-2">
        <Icon className="h-6 w-6 text-ink-3" />
      </div>
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      {desc && <p className="mt-1 max-w-sm text-sm text-ink-3">{desc}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}