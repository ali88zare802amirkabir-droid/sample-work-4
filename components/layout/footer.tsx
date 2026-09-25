import Link from "next/link";
import { Store, ShieldCheck, Truck, RefreshCcw, Sparkles } from "lucide-react";

const SHOP_LINKS = [
  { href: "/shop", label: "Shop all" },
  { href: "/deals", label: "Deals" },
  { href: "/categories", label: "Categories" },
  { href: "/wishlist", label: "Wishlist" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About this demo" },
  { href: "/admin", label: "Admin dashboard" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-edge bg-surface/40">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_4px_16px_-4px_rgba(56,189,248,0.6)]">
                <Store className="h-4.5 w-4.5 text-white" />
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-md border-2 border-[var(--surface)] bg-gradient-to-br from-violet-500 to-fuchsia-400" />
              </span>
              <span className="font-display text-[16px] font-bold tracking-tight text-ink">
                Nexa<span className="text-accent">Store</span>
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-3">
              NexaStore is a fictional e-commerce experience created as a product design and
              development demonstration. Every product, order and review is sample data.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Sparkles, label: "Demo experience" },
                { icon: Truck, label: "Fast delivery demo" },
                { icon: ShieldCheck, label: "Secure (demo) checkout" },
                { icon: RefreshCcw, label: "Easy returns demo" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-edge bg-surface-2 px-2.5 py-1.5 text-[11px] font-medium text-ink-2"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              Shopping
            </p>
            <ul className="space-y-2">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              Company
            </p>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-ink-2 transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-edge pt-6 text-[12px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NexaStore — portfolio demonstration. Not a real store.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}