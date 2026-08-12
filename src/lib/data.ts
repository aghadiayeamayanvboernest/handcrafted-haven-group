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
  {
    id: "brass-hoop-earrings",
    name: "Brass hoop earrings",
    slug: "brass-hoop-earrings",
    price: 32,
    category: "Jewelry",
    rating: 4.5,
    reviewCount: 26,
    sellerId: "ada-mensah",
    description:
      "Hand-hammered brass hoops with a warm matte finish. Lightweight and everyday-wearable.",
    image: "/categories/jewelry.webp",
  },
  {
    id: "silver-pendant-necklace",
    name: "Silver pendant necklace",
    slug: "silver-pendant-necklace",
    price: 48,
    category: "Jewelry",
    rating: 5,
    reviewCount: 15,
    sellerId: "ada-mensah",
    description:
      "Delicate sterling-silver chain with a hand-cast geometric pendant.",
    image: "/categories/jewelry.webp",
  },
  {
    id: "stoneware-bowl",
    name: "Speckled stoneware bowl",
    slug: "speckled-stoneware-bowl",
    price: 42,
    category: "Pottery",
    rating: 4.5,
    reviewCount: 22,
    sellerId: "john-kimani",
    description:
      "Wheel-thrown serving bowl with a speckled oatmeal glaze. Food-safe and dishwasher-friendly.",
    image: "/categories/pottery.webp",
  },
  {
    id: "ceramic-pitcher",
    name: "Glazed ceramic pitcher",
    slug: "glazed-ceramic-pitcher",
    price: 68,
    category: "Pottery",
    rating: 5,
    reviewCount: 9,
    sellerId: "john-kimani",
    description:
      "Reactive green-glaze pitcher, thrown and trimmed by hand. Holds 1 litre.",
    image: "/categories/pottery.webp",
  },
  {
    id: "linen-throw",
    name: "Indigo linen throw",
    slug: "indigo-linen-throw",
    price: 72,
    category: "Textiles",
    rating: 5,
    reviewCount: 40,
    sellerId: "sara-chen",
    description:
      "Naturally indigo-dyed linen throw, hand-loomed with a soft stonewashed finish.",
    image: "/categories/textiles.webp",
  },
  {
    id: "wall-hanging",
    name: "Woven wall hanging",
    slug: "woven-wall-hanging",
    price: 60,
    category: "Textiles",
    rating: 4.5,
    reviewCount: 12,
    sellerId: "sara-chen",
    description:
      "Textured wall hanging woven from undyed cotton and terracotta wool on a wooden dowel.",
    image: "/categories/textiles.webp",
  },
  {
    id: "travel-candle",
    name: "Lavender travel candle",
    slug: "lavender-travel-candle",
    price: 16,
    category: "Candles",
    rating: 4,
    reviewCount: 20,
    sellerId: "sara-chen",
    description:
      "Pocket-sized soy candle in a reusable tin with a calming lavender scent. 20-hour burn.",
    image: "/categories/candles.webp",
  },
  {
    id: "botanical-print",
    name: "Botanical watercolor print",
    slug: "botanical-watercolor-print",
    price: 28,
    category: "Art",
    rating: 5,
    reviewCount: 8,
    sellerId: "ada-mensah",
    description:
      "Giclée print of an original watercolor botanical study on archival cotton paper. A4 size.",
    image: "/categories/art.webp",
  },
  {
    id: "sculpture-vase",
    name: "Ceramic sculpture vase",
    slug: "ceramic-sculpture-vase",
    price: 95,
    category: "Art",
    rating: 4.5,
    reviewCount: 6,
    sellerId: "john-kimani",
    description:
      "One-of-a-kind sculptural vase, hand-built and finished with a matte speckled glaze.",
    image: "/categories/art.webp",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getSeller(id: string): Seller | undefined {
  return sellers.find((s) => s.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
