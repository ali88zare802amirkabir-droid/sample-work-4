export type CategoryId =
  | "audio"
  | "desk"
  | "wearables"
  | "gaming"
  | "accessories";

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rated";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  blurb: string;
  /** primary accent hex used for CSS-derived visuals */
  from: string;
  /** secondary accent hex used for CSS-derived visuals */
  to: string;
}

export type ProductArt =
  | "headphones"
  | "earbuds"
  | "speaker"
  | "mic"
  | "keyboard"
  | "mouse"
  | "hub"
  | "stand"
  | "lamp"
  | "webcam"
  | "monitor"
  | "watch"
  | "tracker"
  | "controller"
  | "gamemouse"
  | "headset"
  | "backpack"
  | "charger"
  | "cable"
  | "sleeve"
  | "powerbank";

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  colors: { name: string; hex: string }[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  art: ProductArt;
  specs: [string, string][];
  tags: string[];
  inactive?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
  payment: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  joined: string;
  orders: number;
  spent: number;
  tier: "Standard" | "Plus" | "Pro";
}

export interface CartItem {
  productId: string;
  qty: number;
  color?: string;
}

export interface Toast {
  id: number;
  title: string;
  desc?: string;
  variant: "success" | "info" | "danger";
}

export interface ProductPatch {
  name?: string;
  price?: number;
  stock?: number;
  category?: CategoryId;
  inactive?: boolean;
}