"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  compact,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-edge bg-bg-soft",
        compact ? "h-8" : "h-10",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center rounded-l-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink disabled:opacity-35",
          compact ? "h-8 w-8" : "h-10 w-9"
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </button>
      <span className={cn("min-w-8 text-center font-semibold tabular-nums text-ink", compact ? "text-[13px]" : "text-sm")}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center rounded-r-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink disabled:opacity-35",
          compact ? "h-8 w-8" : "h-10 w-9"
        )}
        aria-label="Increase quantity"
      >
        <Plus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      </button>
    </div>
  );
}