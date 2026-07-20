import type { Product, Seller } from "@/types";

/**
 * Demo content for the homepage. This is intentionally static mock data —
 * a real data layer (DB / API) belongs to later cards. Keep the shape
 * aligned with `@/types` so it can be swapped out cleanly.
 */

export const sellers: Seller[] = [
  {
    id: "ada-mensah",
    name: "Ada Mensah",
    specialty: "Jewelry",
    location: "Accra, Ghana",
    productCount: 42,
    bio: "Hand-formed clay jewelry inspired by West African patterns.",
    avatar: "/sellers/ada-mensah.webp",
  },
  {
    id: "john-kimani",
    name: "John Kimani",
    specialty: "Pottery",
    location: "Nairobi, Kenya",
    productCount: 28,
    bio: "Wheel-thrown stoneware for everyday rituals.",
    avatar: "/sellers/john-kimani.webp",
  },
  {
    id: "sara-chen",
    name: "Sara Chen",
    specialty: "Textiles",
    location: "Taipei",
    productCount: 35,
    bio: "Naturally dyed, hand-woven home textiles.",
    avatar: "/sellers/sara-chen.webp",
  },
];

export const products: Product[] = [
  {
    id: "clay-earrings",
    name: "Handmade clay earrings",
    slug: "handmade-clay-earrings",
    price: 24,
    category: "Jewelry",
    rating: 5,
    reviewCount: 42,
    sellerId: "ada-mensah",
    description:
      "Lightweight polymer-clay earrings, hand-shaped and finished with hypoallergenic hooks.",
    image: "/products/handmade-clay-earrings.webp",
    featured: true,
  },
  {
    id: "ceramic-mug",
    name: "Ceramic coffee mug",
    slug: "ceramic-coffee-mug",
    price: 38,
    category: "Pottery",
    rating: 4.5,
    reviewCount: 18,
    sellerId: "john-kimani",
    description:
      "Wheel-thrown stoneware mug with a speckled reactive glaze. Holds 12 oz.",
    image: "/products/ceramic-coffee-mug.webp",
    featured: true,
  },
  {
    id: "woven-basket",
    name: "Hand-woven basket",
    slug: "hand-woven-basket",
    price: 55,
    category: "Textiles",
    rating: 5,
    reviewCount: 67,
    sellerId: "sara-chen",
    description:
      "Durable seagrass basket, tightly woven by hand — perfect for storage or plants.",
    image: "/products/hand-woven-basket.webp",
    featured: true,
  },
  {
    id: "soy-candle",
    name: "Natural soy candle",
    slug: "natural-soy-candle",
    price: 18,
    category: "Candles",
    rating: 4.5,
    reviewCount: 31,
    sellerId: "sara-chen",
    description:
      "Hand-poured soy wax candle with a cotton wick and warm amber scent. 40-hour burn.",
    image: "/products/natural-soy-candle.webp",
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getSeller(id: string): Seller | undefined {
  return sellers.find((s) => s.id === id);
}
