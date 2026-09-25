"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductPatch, Toast } from "@/lib/types";
import { products as seedProducts } from "@/lib/data";

const CART_KEY = "nexastore-cart";
const WISHLIST_KEY = "nexastore-wishlist";

interface CommerceValue {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  toasts: Toast[];
  cartOpen: boolean;
  search: string;
  cartCount: number;
  subtotal: number;
  discount: number;
  addToCart: (
    product: Product,
    opts?: { qty?: number; color?: string; openDrawer?: boolean }
  ) => void;
  updateQty: (productId: string, delta: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  moveToCart: (product: Product) => void;
  setCartOpen: (open: boolean) => void;
  toast: (title: string, opts?: { desc?: string; variant?: Toast["variant"] }) => void;
  dismissToast: (id: number) => void;
  setSearch: (query: string) => void;
  updateProduct: (id: string, patch: ProductPatch) => void;
}

const CommerceContext = createContext<CommerceValue | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toastId = useRef(0);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setCart(readJSON<CartItem[]>(CART_KEY, []));
      setWishlist(readJSON<string[]>(WISHLIST_KEY, []));
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (title: string, opts?: { desc?: string; variant?: Toast["variant"] }) => {
      const id = ++toastId.current;
      const t: Toast = {
        id,
        title,
        desc: opts?.desc,
        variant: opts?.variant ?? "success",
      };
      setToasts((prev) => [...prev.slice(-3), t]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 3200);
    },
    []
  );

  const addToCart = useCallback(
    (product: Product, opts?: { qty?: number; color?: string; openDrawer?: boolean }) => {
      const qty = opts?.qty ?? 1;
      const color = opts?.color;
      setCart((prev) => {
        const existing = prev.find((c) => c.productId === product.id);
        if (existing) {
          return prev.map((c) =>
            c.productId === product.id ? { ...c, qty: c.qty + qty, color: color ?? c.color } : c
          );
        }
        return [...prev, { productId: product.id, qty, color }];
      });
      if (opts?.openDrawer !== false) setCartOpen(true);
      toast("Added to cart", { desc: product.name });
    },
    [toast]
  );

  const updateQty = useCallback((productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.productId === productId ? { ...c, qty: Math.max(0, c.qty + delta) } : c
        )
        .filter((c) => c.qty > 0)
    );
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setCart((prev) =>
      prev
        .filter((c) => c.productId !== productId || qty > 0)
        .map((c) => (c.productId === productId ? { ...c, qty: Math.min(99, qty) } : c))
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const has = prev.includes(product.id);
        const next = has ? prev.filter((id) => id !== product.id) : [...prev, product.id];
        toast(
          has ? "Removed from wishlist" : "Saved to wishlist",
          { desc: product.name, variant: has ? "info" : "success" }
        );
        return next;
      });
    },
    [toast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const moveToCart = useCallback(
    (product: Product) => {
      addToCart(product, { openDrawer: false });
      setWishlist((prev) => prev.filter((id) => id !== product.id));
    },
    [addToCart]
  );

  const updateProduct = useCallback((id: string, patch: ProductPatch) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, c) => sum + c.qty, 0), [cart]);

  const { subtotal, discount } = useMemo(() => {
    let s = 0;
    let d = 0;
    for (const item of cart) {
      const p = products.find((x) => x.id === item.productId);
      if (!p) continue;
      s += p.price * item.qty;
      if (p.oldPrice && p.oldPrice > p.price) {
        d += (p.oldPrice - p.price) * item.qty;
      }
    }
    return { subtotal: s, discount: d };
  }, [cart, products]);

  const value = useMemo<CommerceValue>(
    () => ({
      products,
      cart,
      wishlist,
      toasts,
      cartOpen,
      search,
      cartCount,
      subtotal,
      discount,
      addToCart,
      updateQty,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      moveToCart,
      setCartOpen,
      toast,
      dismissToast,
      setSearch,
      updateProduct,
    }),
    [
      products,
      cart,
      wishlist,
      toasts,
      cartOpen,
      search,
      cartCount,
      subtotal,
      discount,
      addToCart,
      updateQty,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      moveToCart,
      toast,
      dismissToast,
      updateProduct,
    ]
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce(): CommerceValue {
  const ctx = useContext(CommerceContext);
  if (!ctx) throw new Error("useCommerce must be used within CommerceProvider");
  return ctx;
}