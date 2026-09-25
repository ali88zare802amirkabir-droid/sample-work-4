"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  if (!open) return null;
  return (
    <OpenDrawer onClose={onClose} title={title} className={className}>
      {children}
    </OpenDrawer>
  );
}

function OpenDrawer({
  onClose,
  title,
  children,
  className,
}: {
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => {
    setClosing((c) => {
      if (c) return c;
      window.setTimeout(onClose, 200);
      return true;
    });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [requestClose]);

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
      <div
        className={cn(
          "absolute inset-0 bg-black/55 backdrop-blur-[3px]",
          closing ? "animate-fade-out" : "animate-fade-in"
        )}
        onClick={requestClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l border-edge bg-surface shadow-[var(--shadow-pop)]",
          closing ? "animate-fade-out" : "animate-drawer-in",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-4">
            <div className="font-display text-[15px] font-semibold text-ink">{title}</div>
            <button
              type="button"
              onClick={requestClose}
              className="rounded-lg p-1.5 text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}