import type { Category, Product } from "@/types";

/**
 * Client-side store for seller-created listings, persisted to localStorage.
 * This is a demo layer — listings live only in the current browser. Swapping
 * to a real API/database later means reimplementing these four functions.
 */
const LISTINGS_KEY = "hh:listings";

/** Event name fired whenever the stored listings change. */
export const LISTINGS_CHANGED = "hh:listings-changed";

function notifyChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LISTINGS_CHANGED));
  }
}

/** URL-safe slug from a product name (with a short suffix for uniqueness). */
export function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const suffix = Math.abs(hashString(name + String(Date.now()))).toString(36).slice(0, 5);
  return `${base || "listing"}-${suffix}`;
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

export function getStoredListings(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LISTINGS_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export function getStoredListingBySlug(slug: string): Product | undefined {
  return getStoredListings().find((p) => p.slug === slug);
}

/** Remove a listing by slug; returns the remaining listings. */
export function removeStoredListing(slug: string): Product[] {
  const remaining = getStoredListings().filter((p) => p.slug !== slug);
  window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(remaining));
  notifyChange();
  return remaining;
}

export function addStoredListing(input: {
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  images?: string[];
  sellerName?: string;
}): Product {
  const slug = slugify(input.name);
  const images = input.images && input.images.length > 0 ? input.images : [input.image];
  const product: Product = {
    id: slug,
    slug,
    name: input.name,
    category: input.category,
    price: input.price,
    description: input.description,
    image: images[0] || input.image,
    images,
    rating: 0,
    reviewCount: 0,
    sellerId: "you",
  };

  const existing = getStoredListings();
  window.localStorage.setItem(
    LISTINGS_KEY,
    JSON.stringify([product, ...existing]),
  );
  notifyChange();
  return product;
}

export function updateStoredListing(
  slug: string,
  updatedData: {
    name: string;
    category: Category;
    price: number;
    description: string;
    image: string;
    images?: string[];
  }
): Product | undefined {
  const existing = getStoredListings();
  const index = existing.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;

  const current = existing[index];
  const images = updatedData.images && updatedData.images.length > 0 ? updatedData.images : [updatedData.image];

  const updatedProduct: Product = {
    ...current,
    name: updatedData.name,
    category: updatedData.category,
    price: updatedData.price,
    description: updatedData.description,
    image: images[0] || updatedData.image,
    images,
  };

  existing[index] = updatedProduct;
  window.localStorage.setItem(LISTINGS_KEY, JSON.stringify(existing));
  notifyChange();
  return updatedProduct;
}
