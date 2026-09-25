"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  value,
  size = "sm",
  className,
}: {
  value: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const n = Math.round(value);
  return (
    <span
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
            i < n ? "fill-warn text-warn" : "fill-transparent text-ink-3"
          )}
        />
      ))}
    </span>
  );
}

export function RatingLine({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-1.5", className)}>
      <Stars value={value} />
      <span className="text-[12px] font-medium text-ink-2">{value.toFixed(1)}</span>
      {count != null && <span className="text-[12px] text-ink-3">({count})</span>}
    </span>
  );
}