"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Pencil, Search, Images } from "lucide-react";
import {
  getStoredListings,
  removeStoredListing,
  LISTINGS_CHANGED,
} from "@/lib/listings";
import type { Product } from "@/types";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface MyListingsProps {
  onEditProduct?: (product: Product) => void;
}

export default function MyListings({ onEditProduct }: MyListingsProps) {
  const [listings, setListings] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // localStorage is client-only; both server and first client render start
    // empty (→ null below), so populating here causes no hydration mismatch.
    const refresh = () => setListings(getStoredListings());
    refresh();
    // Keep in sync when listings are added/removed (this tab or another).
    window.addEventListener(LISTINGS_CHANGED, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(LISTINGS_CHANGED, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function handleDelete(product: Product) {
    if (window.confirm(`Delete “${product.name}”? This can't be undone.`)) {
      setListings(removeStoredListing(product.slug));
    }
  }

  if (listings.length === 0) return null;

  const filteredListings = listings.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section aria-labelledby="my-listings-heading" className="mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="my-listings-heading" className="text-2xl font-bold text-graphite">
            Your listings
          </h2>
          <p className="mt-1 text-sm text-graphite-soft">
            {listings.length} {listings.length === 1 ? "item" : "items"} you&apos;ve
            added in this browser.
          </p>
        </div>

        {listings.length > 2 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft" />
            <input
              type="search"
              placeholder="Search your items…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-primary/20 bg-white py-1.5 pl-9 pr-4 text-sm text-graphite placeholder:text-graphite-soft/60 focus:border-primary focus:outline-none"
            />
          </div>
        )}
      </div>

      {filteredListings.length === 0 ? (
        <p className="mt-6 text-sm text-graphite-soft">No listings match &quot;{query}&quot;.</p>
      ) : (
        <ul className="mt-6 divide-y divide-primary/10 overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-white shadow-sm">
          {filteredListings.map((product) => {
            const imgCount = product.images?.length ?? 1;

            return (
              <li key={product.slug} className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-placeholder">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="64px"
                    unoptimized={product.image.startsWith("data:")}
                    className="object-cover"
                  />
                  {imgCount > 1 && (
                    <span className="absolute bottom-1 right-1 flex items-center gap-0.5 rounded bg-black/70 px-1 py-0.5 text-[10px] font-semibold text-white">
                      <Images className="h-2.5 w-2.5" />
                      {imgCount}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-body font-semibold text-graphite">
                    {product.name}
                  </p>
                  <p className="text-sm text-graphite-soft">
                    {product.category} · {priceFormatter.format(product.price)}
                  </p>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="shrink-0 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold text-graphite transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View
                </Link>

                {onEditProduct && (
                  <button
                    type="button"
                    onClick={() => onEditProduct(product)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
