"use client";

import {
  AudioLines,
  Backpack,
  BatteryCharging,
  Cable,
  Camera,
  Crosshair,
  Gamepad2,
  Headphones,
  Headset,
  Keyboard,
  Lamp,
  LaptopMinimal,
  MicVocal,
  Monitor,
  Mouse,
  Speaker,
  Usb,
  Watch,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Product, ProductArt } from "@/lib/types";
import { categoryById } from "@/lib/data";
import { cn } from "@/lib/utils";

const ART_ICONS: Record<ProductArt, LucideIcon> = {
  headphones: Headphones,
  earbuds: AudioLines,
  speaker: Speaker,
  mic: MicVocal,
  keyboard: Keyboard,
  mouse: Mouse,
  hub: Usb,
  stand: LaptopMinimal,
  lamp: Lamp,
  webcam: Camera,
  monitor: Monitor,
  watch: Watch,
  tracker: Watch,
  controller: Gamepad2,
  gamemouse: Crosshair,
  headset: Headset,
  backpack: Backpack,
  charger: Zap,
  cable: Cable,
  sleeve: Cable,
  powerbank: BatteryCharging,
};

export function ProductArt({
  product,
  className,
  iconSize = 44,
}: {
  product: Product;
  className?: string;
  iconSize?: number;
}) {
  const cat = categoryById(product.category);
  const Icon = ART_ICONS[product.art] ?? Headphones;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        background: `linear-gradient(150deg, color-mix(in srgb, ${cat.from} 16%, #0c1118) 0%, #0c1118 55%, color-mix(in srgb, ${cat.to} 12%, #0c1118) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-[46%] rounded-full opacity-60 blur-2xl"
        style={{
          background: `linear-gradient(140deg, ${cat.from}, ${cat.to})`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[88%] h-4 w-[46%] -translate-x-1/2 rounded-[100%] opacity-40 blur-md"
        style={{ background: `color-mix(in srgb, ${cat.from} 55%, transparent)` }}
        aria-hidden
      />
      <div
        className="relative flex items-center justify-center rounded-2xl border border-white/10 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]"
        style={{
          width: iconSize * 1.9,
          height: iconSize * 1.9,
          background: `linear-gradient(150deg, color-mix(in srgb, ${cat.from} 30%, #151d29), color-mix(in srgb, ${cat.to} 24%, #10161f))`,
        }}
      >
        <Icon
          className="relative text-white"
          style={{
            width: iconSize,
            height: iconSize,
            filter: `drop-shadow(0 6px 14px color-mix(in srgb, ${cat.from} 65%, transparent))`,
          }}
          aria-hidden
        />
        <span
          className="absolute inset-x-4 bottom-1.5 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${cat.from} 70%, transparent), transparent)`,
          }}
          aria-hidden
        />
      </div>
      <span className="sr-only">{product.name}</span>
    </div>
  );
}