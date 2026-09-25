"use client";

import { useState } from "react";
import {
  Boxes,
  ClipboardList,
  DollarSign,
  LayoutDashboard,
  Pencil,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useCommerce } from "@/lib/store";
import { categories, categoryById, customers, orders } from "@/lib/data";
import type { CategoryId, Product } from "@/lib/types";
import { money, cn, initials, fmtDate } from "@/lib/utils";
import { ProductArt } from "@/components/ui/product-art";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Field, Input, Select } from "@/components/ui/input";

type Tab = "dashboard" | "products" | "orders" | "customers";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Boxes },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "customers", label: "Customers", icon: Users },
];

const ORDER_STATUS_TONE: Record<string, "ok" | "info" | "warn" | "muted"> = {
  Delivered: "ok",
  Shipped: "info",
  Processing: "warn",
  Pending: "muted",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[12px] text-ink-3">
            NexaStore
            <Badge tone="warn">Local demo admin</Badge>
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Admin dashboard
          </h1>
          <p className="mt-1 text-[13px] text-ink-3">
            A front-end concept — editing products updates the live shop instantly, in memory
            only. No backend.
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-edge bg-surface p-1 no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors",
              tab === t.id ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
            )}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {tab === "dashboard" && <DashboardTab onNavigate={setTab} />}
      {tab === "products" && <ProductsTab onEdit={setEditing} />}
      {tab === "orders" && <OrdersTab />}
      {tab === "customers" && <CustomersTab />}

      {editing && (
        <EditProductModal product={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

/* --------------------------------- dashboard --------------------------------- */

function DashboardTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const { products } = useCommerce();

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const series = useChartSeries();

  const kpis = [
    { label: "Products", value: String(products.length), icon: Boxes, accent: "#55a1ff" },
    { label: "Orders", value: String(totalOrders), icon: ShoppingCart, accent: "#38d3f0" },
    { label: "Revenue", value: money(revenue), icon: DollarSign, accent: "#34d399" },
    { label: "Customers", value: String(customers.length), icon: Users, accent: "#a78bfa" },
  ];

  const top = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-medium text-ink-3">{k.label}</p>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10"
                style={{ background: `color-mix(in srgb, ${k.accent} 16%, transparent)` }}
              >
                <k.icon className="h-4 w-4" style={{ color: k.accent }} />
              </span>
            </div>
            <p className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">{k.value}</p>
            <p className="mt-1 text-[11px] text-ink-3">demo data</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="card p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">Sales chart</h2>
            <Badge tone="muted">
              <TrendingUp className="h-3 w-3" /> weekly
            </Badge>
          </div>
          <SalesChart data={series} />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-[15px] font-semibold text-ink">Top products</h2>
          <div className="space-y-3">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-4 text-center font-mono text-[11px] text-ink-3">
                  {i + 1}
                </span>
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-edge">
                  <ProductArt product={p} className="h-full w-full" iconSize={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-ink">{p.name}</p>
                  <p className="text-[11px] text-ink-3">{p.rating.toFixed(1)} ★ · {p.reviewCount} reviews</p>
                </div>
                <span className="text-[12.5px] font-semibold tabular-nums text-ink">{money(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-edge px-5 py-4">
          <h2 className="text-[15px] font-semibold text-ink">Recent orders</h2>
          <button type="button" onClick={() => onNavigate("orders")} className="text-[12.5px] font-medium text-accent hover:text-cyan">
            View all
          </button>
        </div>
        <OrderTable rows={orders.slice(0, 5)} />
      </div>
    </div>
  );
}

function SalesChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex h-44 items-end gap-2 sm:gap-3">
        {data.map((d, i) => (
          <div key={i} className="group flex flex-1 items-end justify-center" title={`${d.label}: ${money(d.value)}`}>
            <div
              className="w-full max-w-10 rounded-t-md transition-all duration-200 group-hover:opacity-90"
              style={{
                height: `${Math.max(4, (d.value / max) * 100)}%`,
                background: `linear-gradient(180deg, #55a1ff, color-mix(in srgb, #55a1ff 45%, #38d3f0))`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {data.map((d, i) => (
          <span key={i} className="flex-1 text-center text-[10px] font-medium uppercase tracking-wider text-ink-3">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- products ---------------------------------- */

function ProductsTab({ onEdit }: { onEdit: (p: Product) => void }) {
  const { products } = useCommerce();

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-edge text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              <th className="px-5 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const status = p.inactive
                ? "Hidden"
                : p.stock <= 0
                  ? "Out of stock"
                  : "Active";
              return (
                <tr key={p.id} className="border-b border-edge/50 transition-colors hover:bg-surface-2/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-edge">
                        <ProductArt product={p} className="h-full w-full" iconSize={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold text-ink">{p.name}</p>
                        <p className="text-[11px] text-ink-3">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-ink-2">{categoryById(p.category).name}</td>
                  <td className="px-4 py-3 text-[12.5px] font-semibold tabular-nums text-ink">{money(p.price)}</td>
                  <td className="px-4 py-3 text-[12.5px] tabular-nums text-ink-2">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Badge tone={status === "Active" ? "ok" : status === "Hidden" ? "muted" : "danger"}>
                      {status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="secondary" onClick={() => onEdit(p)}>
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { updateProduct, toast } = useCommerce();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [category, setCategory] = useState<CategoryId>(product.category);
  const [status, setStatus] = useState<"active" | "hidden">(product.inactive ? "hidden" : "active");

  const save = () => {
    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (!name.trim() || Number.isNaN(priceNum) || priceNum < 0 || Number.isNaN(stockNum) || stockNum < 0) {
      toast("Check the form", { desc: "Name, price and stock need valid values.", variant: "danger" });
      return;
    }
    updateProduct(product.id, {
      name: name.trim(),
      price: priceNum,
      stock: Math.floor(stockNum),
      category,
      inactive: status === "hidden",
    });
    toast("Product updated", { desc: name.trim(), variant: "success" });
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Edit product" size="sm">
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-edge">
            <ProductArt product={{ ...product, name, price: Number(price) || 0, stock: Number(stock) || 0 }} className="h-full w-full" iconSize={22} />
          </div>
          <p className="text-[12px] text-ink-3">
            Edits apply instantly to the demo shop, in memory only. Nothing persists.
          </p>
        </div>
        <Field label="Product name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (USD)">
            <Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
          </Field>
          <Field label="Stock">
            <Input value={stock} onChange={(e) => setStock(e.target.value)} inputMode="numeric" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <Select value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onChange={(e) => setStatus(e.target.value as "active" | "hidden")}>
              <option value="active">Active</option>
              <option value="hidden">Hidden</option>
            </Select>
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save}>Save changes</Button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------ orders ----------------------------------- */

function OrdersTab() {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <OrderTable rows={orders} />
      </div>
      <p className="border-t border-edge px-5 py-3 text-[12px] text-ink-3">
        Sample order history for the demo — {orders.length} orders, all fictional.
      </p>
    </div>
  );
}

function OrderTable({ rows }: { rows: typeof orders }) {
  return (
    <table className="w-full min-w-[700px] text-left">
      <thead>
        <tr className="border-b border-edge text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          <th className="px-5 py-3">Order</th>
          <th className="px-4 py-3">Customer</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((o) => (
          <tr key={o.id} className="border-b border-edge/50 transition-colors hover:bg-surface-2/50">
            <td className="px-5 py-3">
              <span className="font-mono text-[12.5px] font-semibold text-accent">{o.id}</span>
              <span className="ml-2 text-[11px] text-ink-3">{o.items} items · {o.payment}</span>
            </td>
            <td className="px-4 py-3 text-[12.5px] text-ink-2">{o.customer}</td>
            <td className="px-4 py-3 text-[12.5px] text-ink-2">{fmtDate(o.date)}</td>
            <td className="px-4 py-3">
              <Badge tone={ORDER_STATUS_TONE[o.status] ?? "muted"}>{o.status}</Badge>
            </td>
            <td className="px-4 py-3 text-right text-[12.5px] font-semibold tabular-nums text-ink">
              {money(o.total)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------------------------------- customers ---------------------------------- */

function CustomersTab() {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-edge text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              <th className="px-5 py-3">Customer</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Spent</th>
              <th className="px-4 py-3">Tier</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-edge/50 transition-colors hover:bg-surface-2/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-surface-3 to-surface-2 text-[11px] font-bold text-ink-2">
                      {initials(c.name)}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                      <p className="text-[11px] text-ink-3">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[12.5px] text-ink-2">{fmtDate(c.joined)}</td>
                <td className="px-4 py-3 text-[12.5px] tabular-nums text-ink-2">{c.orders}</td>
                <td className="px-4 py-3 text-[12.5px] font-semibold tabular-nums text-ink">{money(c.spent)}</td>
                <td className="px-4 py-3">
                  <Badge tone={c.tier === "Pro" ? "accent" : c.tier === "Plus" ? "info" : "muted"}>{c.tier}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ----------------------------------- helpers ----------------------------------- */

function useChartSeries(): { label: string; value: number }[] {
  const today = new Date();
  const buckets = Array.from({ length: 6 }, () => 0);
  for (const o of orders) {
    const d = new Date(`${o.date}T00:00:00`);
    const diffDays = Math.max(0, Math.floor((today.getTime() - d.getTime()) / 86400000));
    const idx = Math.min(5, Math.floor(diffDays / 7));
    buckets[idx] += o.total;
  }
  return buckets
    .map((v, i) => ({ label: `W${6 - i}`, value: v }))
    .filter((b) => b.value > 0);
}