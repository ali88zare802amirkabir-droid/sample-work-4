import type {
  Category,
  CategoryId,
  Customer,
  Order,
  Product,
  Review,
  SortKey,
} from "@/lib/types";

/* ---------------------------------- categories ---------------------------------- */

export const categories: Category[] = [
  {
    id: "audio",
    name: "Audio",
    tagline: "Sound that surrounds",
    blurb: "Headphones, earbuds and speakers tuned for every moment.",
    from: "#22d3ee",
    to: "#3b82f6",
  },
  {
    id: "desk",
    name: "Desk Setup",
    tagline: "Build a better workspace",
    blurb: "Keyboards, docks and tools that make your desk feel premium.",
    from: "#34d399",
    to: "#14b8a6",
  },
  {
    id: "wearables",
    name: "Wearables",
    tagline: "Tech that travels with you",
    blurb: "Watches and trackers designed to stay out of your way.",
    from: "#fbbf24",
    to: "#f97316",
  },
  {
    id: "gaming",
    name: "Gaming",
    tagline: "Play at your peak",
    blurb: "Controllers and peripherals built for long sessions.",
    from: "#a78bfa",
    to: "#e879f9",
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "The finishing touches",
    blurb: "Everyday carry and power essentials with premium detail.",
    from: "#fb7185",
    to: "#f472b6",
  },
];

export function categoryById(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

/* ----------------------------------- products ----------------------------------- */

export const products: Product[] = [
  {
    id: "aerowave-a1",
    name: "Aerowave A1 Wireless Headphones",
    category: "audio",
    brand: "Aerowave",
    price: 249,
    oldPrice: 329,
    rating: 4.8,
    reviewCount: 412,
    description: "Studio-grade over-ear headphones with adaptive noise cancelling.",
    longDescription:
      "The Aerowave A1 wraps around you with 40mm custom drivers, adaptive ANC that reads your environment in real time, and a 40-hour battery that keeps the music moving. Plush memory-foam cushions make all-day listening feel weightless.",
    colors: [
      { name: "Midnight", hex: "#1c2330" },
      { name: "Cloud", hex: "#e8ecf3" },
    ],
    stock: 42,
    featured: true,
    bestseller: true,
    art: "headphones",
    specs: [
      ["Driver", "40mm custom dynamic"],
      ["Battery", "40h (ANC on)"],
      ["ANC", "Adaptive, up to -42dB"],
      ["Connectivity", "Bluetooth 5.3, multipoint"],
      ["Weight", "248g"],
    ],
    tags: ["wireless", "anc", "over-ear"],
  },
  {
    id: "pulsefloat-pro",
    name: "PulseFloat Earbuds Pro",
    category: "audio",
    brand: "PulseWave",
    price: 159,
    oldPrice: 199,
    rating: 4.6,
    reviewCount: 268,
    description: "Compact earbuds with spatial audio and wireless charging.",
    longDescription:
      "PulseFloat Pro brings spatial audio to a featherlight earbud. Six-mic beamforming keeps calls crisp in any environment, while the pocketable case adds 24 hours of total playtime with wireless charging.",
    colors: [
      { name: "Obsidian", hex: "#16181d" },
      { name: "Arctic", hex: "#dbe6f2" },
    ],
    stock: 87,
    featured: true,
    isNew: true,
    art: "earbuds",
    specs: [
      ["Driver", "11mm dynamic"],
      ["ANC", "Hybrid, up to -38dB"],
      ["Battery", "8h + 24h case"],
      ["Charging", "USB-C + Qi"],
      ["Water rating", "IPX5"],
    ],
    tags: ["wireless", "spatial-audio", "earbuds"],
  },
  {
    id: "boombox-mini",
    name: "BoomBox Mini Speaker",
    category: "audio",
    brand: "Aerowave",
    price: 89,
    oldPrice: 119,
    rating: 4.4,
    reviewCount: 187,
    description: "Pocket-sized speaker with surprisingly big bass.",
    longDescription:
      "Don't let the size fool you. BoomBox Mini pushes room-filling 360° sound through a passive radiator, pairs two for stereo, and survives poolside splashes with an IPX7 rating.",
    colors: [
      { name: "Storm", hex: "#232a36" },
      { name: "Sage", hex: "#8fa98a" },
    ],
    stock: 120,
    bestseller: true,
    art: "speaker",
    specs: [
      ["Output", "15W RMS 360°"],
      ["Battery", "14h"],
      ["Water rating", "IPX7"],
      ["Pairing", "TWS stereo link"],
      ["Driver", "52mm + passive radiator"],
    ],
    tags: ["bluetooth", "portable", "speaker"],
  },
  {
    id: "studiocloud-mic",
    name: "StudioCloud Desk Microphone",
    category: "audio",
    brand: "NexLab",
    price: 129,
    rating: 4.7,
    reviewCount: 143,
    description: "Broadcast-grade condenser mic with tap-to-mute.",
    longDescription:
      "StudioCloud captures warm, broadcast-ready vocals with a cardioid capsule and 24-bit/96kHz output. The tap-to-mute touch bar and two gain presets make it effortless to look and sound professional.",
    colors: [{ name: "Graphite", hex: "#2b2f36" }],
    stock: 54,
    isNew: true,
    art: "mic",
    specs: [
      ["Polar pattern", "Cardioid"],
      ["Sample rate", "24-bit / 96kHz"],
      ["Gain", "-12dB to +48dB"],
      ["Monitoring", "3.5mm headphone out"],
      ["Mount", "Integrated shock mount"],
    ],
    tags: ["podcast", "usb", "streaming"],
  },
  {
    id: "novabeat-anc",
    name: "NovaBeat ANC Headphones",
    category: "audio",
    brand: "PulseWave",
    price: 329,
    rating: 4.9,
    reviewCount: 96,
    description: "Flagship headphones with lossless wireless audio.",
    longDescription:
      "NovaBeat is the flagship of the PulseWave line — lossless 24-bit audio over Bluetooth, five-band EQ tuned by ear, and a class-leading 60-hour battery. Pure, effortless, immersive.",
    colors: [
      { name: "Slate", hex: "#3b4252" },
      { name: "Pearl", hex: "#eef1f6" },
    ],
    stock: 23,
    featured: true,
    isNew: true,
    art: "headphones",
    specs: [
      ["Audio", "24-bit lossless"],
      ["Battery", "60h"],
      ["ANC", "Adaptive, up to -45dB"],
      ["EQ", "5-band custom"],
      ["Multipoint", "3 devices"],
    ],
    tags: ["flagship", "lossless", "anc"],
  },
  {
    id: "keytype-k87",
    name: "KeyType K87 Mechanical Keyboard",
    category: "desk",
    brand: "KeyType",
    price: 149,
    oldPrice: 179,
    rating: 4.7,
    reviewCount: 331,
    description: "Hot-swappable 87-key board with creamy linear switches.",
    longDescription:
      "The K87 pairs a CNC-milled aluminum frame with gasket-mounted pre-lubed switches for a deep, satisfying thock. Hot-swap sockets, South-facing RGB and tri-mode connectivity cover every setup.",
    colors: [
      { name: "Space Gray", hex: "#2e323c" },
      { name: "Ivory", hex: "#e9e4d8" },
    ],
    stock: 63,
    featured: true,
    bestseller: true,
    art: "keyboard",
    specs: [
      ["Layout", "87-key TKL"],
      ["Switches", "Hot-swap, pre-lubed"],
      ["Connection", "USB-C / BT 5.1 / 2.4G"],
      ["Case", "Gasket-mounted aluminum"],
      ["Battery", "4000mAh"],
    ],
    tags: ["mechanical", "rgb", "tkl"],
  },
  {
    id: "glidepoint-mouse",
    name: "GlidePoint Wireless Mouse",
    category: "desk",
    brand: "Glide",
    price: 59,
    oldPrice: 79,
    rating: 4.5,
    reviewCount: 254,
    description: "Silent-click ergonomic mouse with 160 hours of battery.",
    longDescription:
      "GlidePoint is built for marathon workdays — a sculpted right-hand curve, whisper-quiet switches and a 160-hour battery that charges in two minutes for a week. Triple modes cover every device.",
    colors: [
      { name: "Graphite", hex: "#2c313a" },
      { name: "Frost", hex: "#dfe8f2" },
    ],
    stock: 140,
    bestseller: true,
    art: "mouse",
    specs: [
      ["Sensor", "26K DPI optical"],
      ["Battery", "160h"],
      ["Buttons", "6, silent"],
      ["Connection", "USB-C dongle / BT"],
    ],
    tags: ["ergonomic", "wireless", "quiet"],
  },
  {
    id: "terrahub-dock",
    name: "TerraHub 7-in-1 USB-C Dock",
    category: "desk",
    brand: "Terra",
    price: 99,
    rating: 4.6,
    reviewCount: 178,
    description: "One cable for display, data, charging and ethernet.",
    longDescription:
      "TerraHub turns a single USB-C port into a full workstation — dual 4K60 displays, 85W pass-through charging, 10Gbps data and gigabit ethernet, all in a brushed aluminum wedge.",
    colors: [{ name: "Titanium", hex: "#50555c" }],
    stock: 71,
    isNew: true,
    art: "hub",
    specs: [
      ["Video", "2× HDMI 4K60"],
      ["Data", "2× USB-A + 1× USB-C 10Gbps"],
      ["Charging", "85W pass-through"],
      ["Network", "Gigabit ethernet"],
      ["Drivers", "Zero-install"],
    ],
    tags: ["dock", "usb-c", "4k"],
  },
  {
    id: "liftup-stand",
    name: "LiftUp Aluminum Laptop Stand",
    category: "desk",
    brand: "Terra",
    price: 69,
    rating: 4.3,
    reviewCount: 94,
    description: "Folding aluminum stand with silent airflow pass-through.",
    longDescription:
      "LiftUp angles your laptop to eye level while its open design feeds airflow to the chassis. Folded flat in a second, it disappears into any bag.",
    colors: [
      { name: "Silver", hex: "#c3cbd6" },
      { name: "Space Gray", hex: "#3d4350" },
    ],
    stock: 110,
    art: "stand",
    specs: [
      ["Material", "Aircraft-grade aluminum"],
      ["Compatibility", "11\"–17\""],
      ["Height", "9 adjustable stops"],
      ["Weight", "640g"],
    ],
    tags: ["ergonomics", "aluminum", "portable"],
  },
  {
    id: "lumaglow-lamp",
    name: "LumaGlow Smart Desk Lamp",
    category: "desk",
    brand: "NexLab",
    price: 79,
    oldPrice: 99,
    rating: 4.5,
    reviewCount: 132,
    description: "Full-spectrum lamp with scene presets and wireless charging.",
    longDescription:
      "LumaGlow balances 3000K–6500K full-spectrum light with five quick presets — Focus, Relax, Warm, Neon, Night. A discreet 15W pad on the base tops up your phone while you read.",
    colors: [{ name: "Matte Black", hex: "#1f2329" }],
    stock: 48,
    art: "lamp",
    specs: [
      ["Output", "800 lux at 30cm"],
      ["Color temp", "3000K–6500K"],
      ["Presets", "5 scenes"],
      ["Extras", "15W Qi pad"],
    ],
    tags: ["lighting", "qi", "presets"],
  },
  {
    id: "visionclear-webcam",
    name: "VisionClear 4K Webcam",
    category: "desk",
    brand: "Vision",
    price: 139,
    rating: 4.4,
    reviewCount: 107,
    description: "4K webcam with automatic framing and dual mics.",
    longDescription:
      "VisionClear delivers crisp 4K at 30fps with AutoFrame that keeps you centered as you move. Dual noise-cancelling mics and a physical privacy shutter round out a pro-grade home studio.",
    colors: [{ name: "Obsidian", hex: "#17191d" }],
    stock: 66,
    isNew: true,
    art: "webcam",
    specs: [
      ["Resolution", "4K @ 30fps"],
      ["Framing", "AutoFrame"],
      ["Mics", "2× noise-cancelling"],
      ["Mount", "Universal clip + thread"],
      ["Privacy", "Physical shutter"],
    ],
    tags: ["4k", "video-call", "streaming"],
  },
  {
    id: "pixeledge-27",
    name: "PixelEdge 27\" 4K Monitor",
    category: "desk",
    brand: "Vision",
    price: 449,
    oldPrice: 529,
    rating: 4.7,
    reviewCount: 219,
    description: "27-inch 4K IPS panel with 98% DCI-P3 coverage.",
    longDescription:
      "PixelEdge pairs a 27-inch 4K IPS panel with factory-calibrated 98% DCI-P3 color. A single USB-C cable powers, displays and docks your laptop at up to 90W.",
    colors: [{ name: "Carbon", hex: "#20242b" }],
    stock: 19,
    featured: true,
    bestseller: true,
    art: "monitor",
    specs: [
      ["Panel", "27\" 4K IPS"],
      ["Color", "98% DCI-P3"],
      ["Ports", "2× HDMI, DP, USB-C 90W"],
      ["Stand", "Height/pivot adjustable"],
    ],
    tags: ["4k", "usb-c", "ips"],
  },
  {
    id: "orbit-watch",
    name: "Orbit Smart Watch",
    category: "wearables",
    brand: "Orbit",
    price: 299,
    oldPrice: 359,
    rating: 4.6,
    reviewCount: 388,
    description: "AMOLED smart watch with 10-day battery.",
    longDescription:
      "Orbit pairs a bright always-on AMOLED with dual-band GPS, 5ATM water resistance and a 10-day battery on a single charge. Health sensing covers heart, sleep, SpO2 and skin temperature.",
    colors: [
      { name: "Midnight", hex: "#20242c" },
      { name: "Silver", hex: "#c9d0da" },
    ],
    stock: 57,
    featured: true,
    bestseller: true,
    art: "watch",
    specs: [
      ["Display", "1.43\" AMOLED, always-on"],
      ["Battery", "10 days"],
      ["GPS", "Dual-band"],
      ["Water rating", "5ATM"],
      ["Health", "HR, SpO2, skin temp, sleep"],
    ],
    tags: ["amoled", "gps", "fitness"],
  },
  {
    id: "pulseband-tracker",
    name: "PulseBand Fitness Tracker",
    category: "wearables",
    brand: "PulseWave",
    price: 99,
    rating: 4.3,
    reviewCount: 156,
    description: "Featherlight tracker with 40+ workout modes.",
    longDescription:
      "PulseBand tracks 40+ workout modes with automatic rep and lap counting, monitors heart rate around the clock, and slips into any pocket at 18 grams. Two-week battery keeps it charging-free.",
    colors: [
      { name: "Charcoal", hex: "#2a2e35" },
      { name: "Mint", hex: "#8fd6b4" },
    ],
    stock: 132,
    isNew: true,
    art: "tracker",
    specs: [
      ["Weight", "18g"],
      ["Battery", "14 days"],
      ["Workouts", "40+ auto-count"],
      ["Water rating", "5ATM"],
    ],
    tags: ["fitness", "heart-rate", "slim"],
  },
  {
    id: "reaperpro-controller",
    name: "ReaperPro Wireless Controller",
    category: "gaming",
    brand: "Reaper",
    price: 79,
    oldPrice: 99,
    rating: 4.7,
    reviewCount: 512,
    description: "Esports controller with hall-effect sticks.",
    longDescription:
      "ReaperPro uses drift-proof hall-effect sticks, an 800Hz polling rate and four remappable back paddles. It pairs with PC, Switch and mobile out of the box — and glows wherever you want.",
    colors: [
      { name: "Phantom Black", hex: "#1c1e22" },
      { name: "Arctic White", hex: "#e6e9ee" },
    ],
    stock: 96,
    bestseller: true,
    art: "controller",
    specs: [
      ["Sticks", "Hall-effect, drift-proof"],
      ["Polling", "800Hz"],
      ["Paddles", "4 remappable"],
      ["Connection", "2.4G / BT / USB-C"],
      ["Battery", "30h"],
    ],
    tags: ["controller", "pc", "switch"],
  },
  {
    id: "clutchpad-mouse",
    name: "ClutchPad Gaming Mouse",
    category: "gaming",
    brand: "Reaper",
    price: 69,
    oldPrice: 89,
    rating: 4.5,
    reviewCount: 274,
    description: "58g ultralight mouse with 30K sensor.",
    longDescription:
      "At 58 grams with a 30,000-DPI optical sensor and 4KHz polling over the included dongle, ClutchPad is built for flicks that land. Ten programmable buttons cover every binding.",
    colors: [{ name: "Sand", hex: "#2c2f35" }],
    stock: 84,
    art: "gamemouse",
    specs: [
      ["Weight", "58g"],
      ["Sensor", "30K DPI optical"],
      ["Polling", "4kHz wireless"],
      ["Buttons", "10 programmable"],
    ],
    tags: ["esports", "ultralight", "wireless"],
  },
  {
    id: "furyhead-headset",
    name: "FuryHead Gaming Headset",
    category: "gaming",
    brand: "Fury",
    price: 129,
    oldPrice: 159,
    rating: 4.4,
    reviewCount: 203,
    description: "Surround sound headset with flip-to-mute mic.",
    longDescription:
      "FuryHead delivers 7.1 surround on PC with a detachable broadcast-grade mic that flips up to mute. Memory-foam ear cups and a lightweight frame keep you comfortable through long sessions.",
    colors: [
      { name: "Violent", hex: "#211f2d" },
      { name: "Crimson", hex: "#5a2230" },
    ],
    stock: 74,
    art: "headset",
    specs: [
      ["Audio", "7.1 surround (PC)"],
      ["Mic", "Detachable, flip-mute"],
      ["Driver", "50mm neodymium"],
      ["Battery", "20h wireless"],
    ],
    tags: ["headset", "7.1", "wireless"],
  },
  {
    id: "voyage-backpack",
    name: "Voyage 21L Tech Backpack",
    category: "accessories",
    brand: "Voyage",
    price: 119,
    rating: 4.6,
    reviewCount: 142,
    description: "Weatherproof backpack with full laptop access.",
    longDescription:
      "Voyage carries a 16-inch laptop in a padded sleeve that opens flat for airport security, plus a structured tech organizer and a hidden anti-theft pocket. Recycled 900D fabric shrugs off rain.",
    colors: [
      { name: "Graphite", hex: "#30343b" },
      { name: "Olive", hex: "#5c6a52" },
    ],
    stock: 58,
    bestseller: true,
    art: "backpack",
    specs: [
      ["Capacity", "21L"],
      ["Laptop", "Up to 16\""],
      ["Fabric", "Recycled 900D"],
      ["Extras", "Anti-theft pocket, trolley strap"],
    ],
    tags: ["backpack", "edc", "weatherproof"],
  },
  {
    id: "chargesync-charger",
    name: "ChargeSync 65W GaN Charger",
    category: "accessories",
    brand: "ChargeSync",
    price: 49,
    oldPrice: 59,
    rating: 4.4,
    reviewCount: 231,
    description: "Pocket 65W three-port GaN charger.",
    longDescription:
      "ChargeSync packs 65W across two USB-C and one USB-A port into a body smaller than a matchbox. Gallium-nitride internals stay cool while topping laptops, phones and earbuds at once.",
    colors: [{ name: "Midnight", hex: "#1f2329" }],
    stock: 148,
    isNew: true,
    art: "charger",
    specs: [
      ["Output", "65W total"],
      ["Ports", "2× USB-C, 1× USB-A"],
      ["Tech", "GaN II"],
      ["Safety", "Surge + thermal protect"],
    ],
    tags: ["gan", "fast-charge", "travel"],
  },
  {
    id: "rapidcable-2p",
    name: "RapidCable USB-C Braided Cable 2-Pack",
    category: "accessories",
    brand: "Rapid",
    price: 29,
    oldPrice: 39,
    rating: 4.2,
    reviewCount: 187,
    description: "240W braided cables with a 10-year life.",
    longDescription:
      "Two 1.5m nylon-braided cables rated for 240W charging with 48Gbps data. Reinforced joints and 10,000+ bend rating mean they outlive your devices.",
    colors: [{ name: "Black", hex: "#22262c" }],
    stock: 260,
    art: "cable",
    specs: [
      ["Length", "1.5m ×2"],
      ["Power", "240W PD 3.1"],
      ["Data", "48Gbps"],
      ["Bend rating", "10,000+"],
    ],
    tags: ["usb-c", "cable", "240w"],
  },
  {
    id: "powercore-bank",
    name: "PowerCore 10K Power Bank",
    category: "accessories",
    brand: "ChargeSync",
    price: 59,
    oldPrice: 75,
    rating: 4.5,
    reviewCount: 214,
    description: "10,000mAh power bank with a built-in cable.",
    longDescription:
      "PowerCore hides a 10,000mAh cell behind a slim 12mm profile with a retractable USB-C cable and a discreet status display. Two devices charge in parallel, fully, in about an hour.",
    colors: [
      { name: "Slate", hex: "#2f343d" },
      { name: "Frost", hex: "#dfe7f0" },
    ],
    stock: 93,
    bestseller: true,
    art: "powerbank",
    specs: [
      ["Capacity", "10,000mAh"],
      ["Output", "22.5W max"],
      ["Cable", "Retractable USB-C"],
      ["Display", "LED status"],
    ],
    tags: ["power-bank", "pd", "travel"],
  },
];

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/* ------------------------------------ reviews ----------------------------------- */

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "aerowave-a1",
    author: "Sara M.",
    rating: 5,
    date: "2026-08-14",
    title: "Silence you can feel",
    body: "The ANC honestly surprised me — the bus disappears. Bass is deep without drowning vocals.",
    verified: true,
  },
  {
    id: "r2",
    productId: "aerowave-a1",
    author: "Daniel K.",
    rating: 5,
    date: "2026-09-02",
    title: "All-day comfort",
    body: "Wore them for a full workday and forgot they were on. Battery outlasts my week.",
    verified: true,
  },
  {
    id: "r3",
    productId: "aerowave-a1",
    author: "Leyla T.",
    rating: 4,
    date: "2026-07-20",
    title: "Great, slightly bulky case",
    body: "Sound and ANC are fantastic. The case is a little chunky vs competitors, that's my only nit.",
    verified: true,
  },
  {
    id: "r4",
    productId: "keytype-k87",
    author: "Omid R.",
    rating: 5,
    date: "2026-08-01",
    title: "Thocky and solid",
    body: "Gasket mount does its job — the feel is deep and uniform. Hot swap sockets are clean.",
    verified: true,
  },
  {
    id: "r5",
    productId: "keytype-k87",
    author: "Jin W.",
    rating: 4,
    date: "2026-09-11",
    title: "Nearly perfect",
    body: "Typing feel is excellent. Wish the aluminum came in more colors, but the board itself is top tier.",
    verified: true,
  },
  {
    id: "r6",
    productId: "orbit-watch",
    author: "Mike H.",
    rating: 5,
    date: "2026-06-28",
    title: "Finally a 10-day smartwatch",
    body: "I stopped charging my watch in the morning because it just never dies. GPS locks fast.",
    verified: true,
  },
  {
    id: "r7",
    productId: "orbit-watch",
    author: "Nadia P.",
    rating: 4,
    date: "2026-09-05",
    title: "Bright and accurate",
    body: "Screen is gorgeous outdoors. Sleep tracking is decent; Apple's is more granular.",
    verified: true,
  },
  {
    id: "r8",
    productId: "reaperpro-controller",
    author: "Alex B.",
    rating: 5,
    date: "2026-07-17",
    title: "No drift, period",
    body: "Hall-effect sticks are the real deal. Latency over the dongle feels wired.",
    verified: true,
  },
  {
    id: "r9",
    productId: "reaperpro-controller",
    author: "Farid A.",
    rating: 5,
    date: "2026-08-22",
    title: "Back paddles are game changers",
    body: "Remapping takes a minute and then you don't want to go back. Great build quality.",
    verified: true,
  },
  {
    id: "r10",
    productId: "boombox-mini",
    author: "Emma S.",
    rating: 4,
    date: "2026-09-14",
    title: "Bass is real",
    body: "Shockingly low for this size. Pairing two makes a great little stereo for the patio.",
    verified: true,
  },
  {
    id: "r11",
    productId: "pixeledge-27",
    author: "Tomas V.",
    rating: 5,
    date: "2026-05-30",
    title: "Color out of the box",
    body: "Display calibration is excellent. The USB-C one-cable setup cleans my desk entirely.",
    verified: true,
  },
  {
    id: "r12",
    productId: "voyage-backpack",
    author: "Anya L.",
    rating: 5,
    date: "2026-08-09",
    title: "Airport proof",
    body: "The flat-open laptop sleeve is brilliant at security. Fabric feels tough and premium.",
    verified: true,
  },
];

export function reviewsFor(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

/* ------------------------------------- orders ------------------------------------ */

export const orders: Order[] = [
  {
    id: "NX-2048",
    customer: "Sara Movahed",
    email: "sara@example.com",
    date: "2026-09-23",
    status: "Delivered",
    total: 408,
    items: 2,
    payment: "Card",
  },
  {
    id: "NX-2047",
    customer: "Daniel Kim",
    email: "daniel@example.com",
    date: "2026-09-21",
    status: "Shipped",
    total: 149,
    items: 1,
    payment: "PayPal",
  },
  {
    id: "NX-2046",
    customer: "Nadia Parsa",
    email: "nadia@example.com",
    date: "2026-09-19",
    status: "Processing",
    total: 598,
    items: 2,
    payment: "Card",
  },
  {
    id: "NX-2045",
    customer: "Alex Brody",
    email: "alex@example.com",
    date: "2026-09-16",
    status: "Delivered",
    total: 79,
    items: 1,
    payment: "Demo",
  },
  {
    id: "NX-2044",
    customer: "Emma Stone",
    email: "emma@example.com",
    date: "2026-09-12",
    status: "Delivered",
    total: 188,
    items: 3,
    payment: "Apple Pay",
  },
  {
    id: "NX-2043",
    customer: "Tomas Varga",
    email: "tomas@example.com",
    date: "2026-09-08",
    status: "Delivered",
    total: 449,
    items: 1,
    payment: "Card",
  },
  {
    id: "NX-2042",
    customer: "Anya Levine",
    email: "anya@example.com",
    date: "2026-09-03",
    status: "Shipped",
    total: 119,
    items: 1,
    payment: "PayPal",
  },
  {
    id: "NX-2041",
    customer: "Omid Rahimi",
    email: "omid@example.com",
    date: "2026-08-28",
    status: "Delivered",
    total: 296,
    items: 2,
    payment: "Card",
  },
];

/* ------------------------------------ customers --------------------------------- */

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Sara Movahed",
    email: "sara@example.com",
    joined: "2025-11-02",
    orders: 12,
    spent: 2140,
    tier: "Pro",
  },
  {
    id: "c2",
    name: "Daniel Kim",
    email: "daniel@example.com",
    joined: "2026-01-17",
    orders: 6,
    spent: 890,
    tier: "Plus",
  },
  {
    id: "c3",
    name: "Nadia Parsa",
    email: "nadia@example.com",
    joined: "2026-03-05",
    orders: 9,
    spent: 1675,
    tier: "Pro",
  },
  {
    id: "c4",
    name: "Alex Brody",
    email: "alex@example.com",
    joined: "2026-02-20",
    orders: 3,
    spent: 410,
    tier: "Standard",
  },
  {
    id: "c5",
    name: "Emma Stone",
    email: "emma@example.com",
    joined: "2025-12-09",
    orders: 7,
    spent: 1220,
    tier: "Plus",
  },
  {
    id: "c6",
    name: "Tomas Varga",
    email: "tomas@example.com",
    joined: "2026-04-14",
    orders: 4,
    spent: 760,
    tier: "Standard",
  },
];

/* ----------------------------------- helpers ------------------------------------ */

export function searchProducts(list: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) =>
    [p.name, p.brand, p.description, p.category, ...p.tags]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export interface ProductFilters {
  query?: string;
  category?: CategoryId | "all";
  minPrice?: number | null;
  maxPrice?: number | null;
  minRating?: number | null;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sort?: SortKey;
}

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rated", label: "Top Rated" },
];

export function filterProducts(list: Product[], filters: ProductFilters = {}): Product[] {
  let result = searchProducts(list, filters.query ?? "");

  if (filters.category && filters.category !== "all") {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= (filters.minPrice as number));
  }
  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= (filters.maxPrice as number));
  }
  if (filters.minRating != null) {
    result = result.filter((p) => p.rating >= (filters.minRating as number));
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.stock > 0);
  }
  if (filters.onSaleOnly) {
    result = result.filter((p) => (p.oldPrice ?? 0) > p.price);
  }

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rated":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      result = [...result].sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured)
      );
  }
  return result;
}

export function relatedProducts(list: Product[], product: Product, count = 4): Product[] {
  const sameCategory = list.filter((p) => p.id !== product.id && p.category === product.category);
  const others = list.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, count);
}

export const PRICE_BUCKETS: { label: string; min: number | null; max: number | null }[] = [
  { label: "Under $50", min: null, max: 49 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $250", min: 101, max: 250 },
  { label: "Over $250", min: 251, max: null },
];