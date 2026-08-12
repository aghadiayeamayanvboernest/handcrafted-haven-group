"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Category, Product } from "@/types";
import { CATEGORIES } from "@/lib/categories";
import { getStoredListings } from "@/lib/listings";
import ProductCard from "@/components/product/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

interface ProductBrowserProps {
  products: Product[];
  /** Pre-selected category from the URL (?category=jewelry). */
  initialCategory?: Category | "All";
}

export default function ProductBrowser({
  products,
  initialCategory = "All",
}: ProductBrowserProps) {
  const [category, setCategory] = useState<Category | "All">(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  // Merge in seller-created listings from this browser (localStorage).
  const [listings, setListings] = useState<Product[]>([]);
  useEffect(() => {
    // localStorage is client-only, so it must be read after mount (not in SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setListings(getStoredListings());
  }, []);

  const allProducts = useMemo(() => {
    const seen = new Set(products.map((p) => p.slug));
    return [...listings.filter((p) => !seen.has(p.slug)), ...products];
  }, [products, listings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = allProducts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return [...result].sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
        );
    }
  }, [allProducts, category, query, sort]);

  const tabs: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs sm:flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft"
            aria-hidden="true"
          />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-primary/20 bg-white py-2 pl-9 pr-4 text-sm text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-graphite-soft"
            aria-hidden="true"
          />
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {tabs.map((tab) => {
          const active = tab === category;
          return (
            <button
              key={tab}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                active
                  ? "bg-primary text-cream"
                  : "border border-primary/20 text-graphite-soft hover:border-primary hover:text-primary"
              }`}
            >
              {tab === "All" ? "All items" : tab}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-graphite-soft" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
        {category !== "All" && ` in ${category}`}
      </p>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[var(--radius)] border border-dashed border-primary/20 py-16 text-center">
          <p className="font-heading text-lg text-graphite">No items found</p>
          <p className="mt-1 text-sm text-graphite-soft">
            Try a different category or search term.
          </p>
        </div>
      )}
    </div>
  );
}
