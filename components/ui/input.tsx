"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-xl border border-edge bg-bg-soft px-3.5 text-sm text-ink placeholder:text-ink-3 transition-colors focus:border-accent/50 focus:bg-surface focus:outline-none",
          className
        )}
        {...props}
      />
    );
  }
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-edge bg-bg-soft px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 transition-colors focus:border-accent/50 focus:bg-surface focus:outline-none",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-edge bg-bg-soft px-3.5 text-sm text-ink transition-colors focus:border-accent/50 focus:bg-surface focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

export function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink-2">
        {label}
        {optional && <em className="text-xs not-italic text-ink-3">(optional)</em>}
      </span>
      {children}
      {hint && <span className="block text-xs text-ink-3">{hint}</span>}
    </label>
  );
}