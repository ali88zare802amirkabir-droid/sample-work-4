"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  LayoutDashboard,
  Menu,
  Search,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useCommerce } from "@/lib/store";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";
import { HeaderSearchBox } from "@/components/layout/header-search";
import { Drawer } from "@/components/ui/drawer";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const { cartCount, wishlist, setCartOpen } = useCommerce();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_4px_16px_-4px_rgba(56,189,248,0.6)]">
            <Store className="h-4.5 w-4.5 text-white" />
            <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-md border-2 border-[var(--surface)] bg-gradient-to-br from-violet-500 to-fuchsia-400" />
          </span>
          <span className="font-display text-[16px] font-bold tracking-tight text-ink">
            Nexa<span className="text-accent">Store</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                isActive(item.href)
                  ? "bg-accent-soft text-accent"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden w-56 md:block lg:w-72">
            <HeaderSearchBox />
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2 text-ink-2 transition-colors hover:text-ink md:hidden"
            aria-label="Open search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          <Link
            href="/wishlist"
            className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2 text-ink-2 transition-colors hover:text-ink sm:flex"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <Heart className="h-4.5 w-4.5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2 text-ink-2 transition-colors hover:text-ink"
            aria-label={`Open cart, ${cartCount} items`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-b from-[var(--accent)] to-cyan px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <div className="hidden md:block">
            <ProfileMenu />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-2 text-ink-2 transition-colors hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const items = [
    { label: "My Cart", href: "/cart", icon: ShoppingBag },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "About this demo", href: "/about", icon: ArrowUpRight },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-edge bg-surface-2 py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-edge-strong"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-400 text-[11px] font-bold text-white">
          DC
        </span>
        <span className="hidden text-[13px] font-medium text-ink xl:block">Demo Customer</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-ink-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-edge-strong bg-surface p-1.5 shadow-[var(--shadow-pop)] animate-rise"
        >
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 text-xs font-bold text-white">
              DC
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">Demo Customer</p>
              <p className="text-[11px] text-ink-3">demo@nexastore.dev</p>
            </div>
          </div>
          <div className="my-1 h-px bg-edge" />
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.push(item.href);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
          <div className="my-1 h-px bg-edge" />
          <p className="px-2.5 py-2 text-[11px] leading-relaxed text-ink-3">
            Local demo account — no real authentication.
          </p>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { setCartOpen } = useCommerce();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Drawer open={open} onClose={onClose} title="Menu">
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        <nav className="space-y-1" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors",
                isActive(item.href)
                  ? "bg-accent-soft text-accent"
                  : "text-ink hover:bg-surface-2"
              )}
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 opacity-40" />
            </Link>
          ))}
        </nav>

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            Categories
          </p>
          <div className="space-y-1">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/shop?cat=${c.id}`}
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                />
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            Account
          </p>
          <div className="space-y-1">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Wishlist
              <Heart className="h-4 w-4 opacity-40" />
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                setCartOpen(true);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Cart
              <ShoppingBag className="h-4 w-4 opacity-40" />
            </button>
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Admin Dashboard
              <LayoutDashboard className="h-4 w-4 opacity-40" />
            </Link>
          </div>
        </div>

        <p className="px-3 pt-2 text-[11px] leading-relaxed text-ink-3">
          NexaStore is a demo experience — everything runs locally. No real payments, no real accounts.
        </p>
      </div>
    </Drawer>
  );
}

function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Search">
      <div className="px-5 py-4">
        <HeaderSearchBox onNavigate={onClose} autoFocus />
      </div>
      <p className="px-5 text-[11px] leading-relaxed text-ink-3">
        Search works across product name, category and description.
      </p>
    </Drawer>
  );
}