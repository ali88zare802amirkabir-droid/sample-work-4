"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Info,
  Lock,
  Mail,
  MapPin,
  PackageCheck,
  Send,
  Wallet,
} from "lucide-react";
import { useCommerce } from "@/lib/store";
import { money } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StepIndex = 0 | 1 | 2;

const STEPS = ["Contact", "Shipping", "Payment"];

const PAY_METHODS = [
  {
    id: "demo-card",
    icon: CreditCard,
    title: "Demo card",
    desc: "Card •••• 4242 — fictional, no real gateway.",
  },
  {
    id: "demo-wallet",
    icon: Wallet,
    title: "Demo wallet",
    desc: "Sample wallet flow, entirely front-end.",
  },
  {
    id: "demo-cod",
    icon: Banknote,
    title: "Demo pay on delivery",
    desc: "Cash on delivery — represented visually only.",
  },
] as const;

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  method: (typeof PAY_METHODS)[number]["id"] | "";
}

const INITIAL: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postal: "",
  country: "United States",
  method: "",
};

export default function CheckoutPage() {
  const { cart, products, subtotal, discount, clearCart, toast } = useCommerce();
  const [step, setStep] = useState<StepIndex>(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placed, setPlaced] = useState<{ id: string } | null>(null);

  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.productId) }))
    .filter(
      (x): x is { productId: string; qty: number; color?: string; product: NonNullable<typeof x.product> } =>
        !!x.product
    );
  const total = subtotal - discount;

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (s: StepIndex): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
      if (!form.firstName.trim()) next.firstName = "Required";
      if (!form.lastName.trim()) next.lastName = "Required";
    }
    if (s === 1) {
      if (!form.address.trim()) next.address = "Required";
      if (!form.city.trim()) next.city = "Required";
      if (!/^\d{3,10}$/.test(form.postal.trim())) next.postal = "Enter a postal code";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(2, s + 1) as StepIndex);
  };

  const placeOrder = () => {
    if (!validate(2)) return;
    if (!form.method) {
      setErrors({ method: "Choose a demo payment method" });
      return;
    }
    const id = `NX-${2049 + Math.floor(Math.random() * 40)}`;
    clearCart();
    setPlaced({ id });
    toast("Order placed (demo)", { desc: `Order ${id} created successfully.` });
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-2xl border border-dashed border-edge bg-surface/50 px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-edge bg-surface-2">
            <PackageCheck className="h-6 w-6 text-ink-3" />
          </div>
          <h1 className="font-display text-base font-semibold text-ink">Nothing to check out</h1>
          <p className="mt-1 max-w-sm text-sm text-ink-3">
            Your cart is empty. Add a few demo products first, then come back.
          </p>
          <Link href="/shop" className="mt-5">
            <Button variant="primary">Browse products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-ok/30 bg-ok-soft animate-rise">
            <CheckCircle2 className="h-10 w-10 text-ok" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Order received
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-2">
            Your demo order has been created successfully. No payment was processed — this is a
            front-end simulation.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-edge bg-surface px-4 py-4">
            <span className="text-[13px] text-ink-3">Order</span>
            <span className="rounded-lg bg-accent-soft px-2.5 py-1 font-mono text-[15px] font-bold text-accent">
              {placed.id}
            </span>
            <span className="rounded-lg bg-surface-2 px-2 py-1 text-[12px] font-semibold tabular-nums text-ink-2">
              {money(total)}
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/admin" className="sm:hidden">
              <Button size="lg" className="w-full">
                Track in admin demo
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-[12px] text-ink-3">
            Your cart was cleared locally after placing the order. The order is not stored
            anywhere — it&apos;s a visual demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <Link href="/cart" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-1 text-[13px] text-ink-3">
          Demo flow — no real data leaves this browser.
        </p>
      </div>

      <ol className="mb-8 flex items-center gap-2" aria-label="Checkout progress">
        {STEPS.map((label, i) => {
          const current = step === (i as StepIndex);
          const done = (step as number) > i;
          const idx = i as StepIndex;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (done || current) setStep(idx);
                }}
                disabled={!done && !current}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition-colors",
                  current
                    ? "border-accent/40 bg-accent-soft text-accent"
                    : done
                      ? "border-edge bg-surface-2 text-ok"
                      : "border-edge bg-surface text-ink-3"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                    current ? "bg-accent text-white" : done ? "bg-ok/20 text-ok" : "bg-surface-3 text-ink-3"
                  )}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {idx < 2 && <span className="h-px flex-1 bg-edge" />}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          {step === 0 && (
            <div className="card animate-fade-in space-y-4 p-6" key="contact">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <h2 className="text-[15px] font-semibold text-ink">Contact information</h2>
              </div>
              <Field label="Email" hint={errors.email ? undefined : "Where the (fake) receipt would go"}>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  className={errors.email ? "border-danger/50" : undefined}
                />
              </Field>
              {errors.email && <ErrorNote>{errors.email}</ErrorNote>}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <Input placeholder="Sara" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />
                </Field>
                <Field label="Last name">
                  <Input placeholder="Movahed" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />
                </Field>
              </div>
              {(errors.firstName ?? errors.lastName) && (
                <ErrorNote>{errors.firstName ?? errors.lastName}</ErrorNote>
              )}
              <div className="flex justify-end pt-1">
                <Button variant="primary" onClick={next}>
                  Continue to shipping
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="card animate-fade-in space-y-4 p-6" key="shipping">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <h2 className="text-[15px] font-semibold text-ink">Shipping information</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Street address">
                    <Input placeholder="123 Demo Street" value={form.address} onChange={(e) => setField("address", e.target.value)} />
                  </Field>
                </div>
                <Field label="City">
                  <Input placeholder="Tehran" value={form.city} onChange={(e) => setField("city", e.target.value)} />
                </Field>
                <Field label="Postal code">
                  <Input placeholder="12345" value={form.postal} onChange={(e) => setField("postal", e.target.value)} />
                </Field>
              </div>
              {(errors.address ?? errors.city ?? errors.postal) && (
                <ErrorNote>{errors.address ?? errors.city ?? errors.postal}</ErrorNote>
              )}
              <Field label="Country">
                <Select value={form.country} onChange={(e) => setField("country", e.target.value)}>
                  {["United States", "Germany", "Iran", "Japan", "United Kingdom", "Other"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="primary" onClick={next}>
                  Continue to payment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card animate-fade-in space-y-4 p-6" key="payment">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-accent" />
                <h2 className="text-[15px] font-semibold text-ink">Payment method</h2>
              </div>

              <div className="space-y-2.5">
                {PAY_METHODS.map((m) => {
                  const active = form.method === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setField("method", m.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                        active ? "border-accent/50 bg-accent-soft" : "border-edge bg-surface-2 hover:border-edge-strong"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg border",
                          active ? "border-accent/40 bg-accent/20" : "border-edge bg-surface"
                        )}
                      >
                        <m.icon className="h-4.5 w-4.5 text-accent" />
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                          {m.title}
                          <Badge tone="warn">Demo</Badge>
                        </span>
                        <span className="text-[12.5px] text-ink-3">{m.desc}</span>
                      </span>
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          active ? "border-accent bg-accent text-white" : "border-edge-strong"
                        )}
                      >
                        {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.method && <ErrorNote>{errors.method}</ErrorNote>}

              <div className="flex items-start gap-2.5 rounded-xl border border-warn/25 bg-warn-soft p-3.5 text-[12.5px] leading-relaxed text-warn">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong>Demo payment only.</strong> No card numbers, no wallets, no billing —
                  this step is purely visual. Nothing is collected or sent anywhere.
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="primary" size="lg" onClick={placeOrder}>
                  <Send className="h-4 w-4" />
                  Place Demo Order
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="card sticky top-24 p-5">
            <h2 className="font-display text-base font-semibold text-ink">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.map(({ product, qty, color }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-edge">
                    <ProductArt product={product} className="h-full w-full" iconSize={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-ink">{product.name}</p>
                    <p className="text-[11px] text-ink-3">
                      {color ? `${color} · ` : ""}×{qty}
                    </p>
                  </div>
                  <span className="text-[12.5px] font-semibold tabular-nums text-ink">
                    {money(product.price * qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-edge" />
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-ink-3">Subtotal</span>
                <span className="text-ink">{money(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-ink-3">Discount</span>
                  <span className="text-ok">−{money(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink-3">Shipping</span>
                <span className="text-ok">Free (demo)</span>
              </div>
            </div>
            <div className="my-4 h-px bg-edge" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Total</span>
              <span className="text-xl font-bold tabular-nums text-ink">{money(total)}</span>
            </div>
            <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-3">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Demo checkout only. Featured in this portfolio as an interaction showcase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[12px] font-medium text-danger">
      <AlertCircle className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}