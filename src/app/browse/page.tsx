import type { Metadata } from "next";
import { getProducts } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import type { Category } from "@/types";
import ProductBrowser from "@/components/product/ProductBrowser";

export const metadata: Metadata = {
  title: "Browse",
  description:
    "Browse handcrafted treasures from independent artisans — filter by category, search, and sort.",
};

interface BrowsePageProps {
  searchParams: Promise<{ category?: string }>;
}

/** Resolve a raw ?category value to a valid Category, else "All". */
function resolveCategory(raw?: string): Category | "All" {
  if (!raw) return "All";
  const match = CATEGORIES.find((c) => c.toLowerCase() === raw.toLowerCase());
  return match ?? "All";
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const { category } = await searchParams;
  const initialCategory = resolveCategory(category);
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-graphite sm:text-4xl">
          Browse handcrafted treasures
        </h1>
        <p className="mt-2 max-w-2xl text-graphite-soft">
          Explore one-of-a-kind pieces from independent makers. Filter by
          category, search, or sort to find your next treasure.
        </p>
      </header>

      <ProductBrowser products={products} initialCategory={initialCategory} />
    </div>
  );
}
