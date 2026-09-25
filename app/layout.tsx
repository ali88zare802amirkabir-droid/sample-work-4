import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CommerceProvider } from "@/lib/store";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ToastHost } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NexaStore — Modern tech & lifestyle",
    template: "%s · NexaStore",
  },
  description:
    "NexaStore is a polished e-commerce UI demo — a portfolio prototype showing a modern product store: browsing, filtering, wishlist, cart and a demo checkout.",
};

export const viewport: Viewport = {
  themeColor: "#090d13",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body>
        <div className="app-bg" aria-hidden />
        <CommerceProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
          <ToastHost />
        </CommerceProvider>
      </body>
    </html>
  );
}