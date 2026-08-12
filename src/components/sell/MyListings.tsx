"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { deleteListingAction } from "@/app/actions/listings";
import type { Product } from "@/types";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function MyListings({ listings }: { listings: Product[] }) {
  const [items, setItems] = useState<Product[]>(listings);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete “${product.name}”? This can't be undone.`)) return;
    setDeleting(product.slug);
    const result = await deleteListingAction(product.slug);
    setDeleting(null);
    if (result.ok) {
      setItems((prev) => prev.filter((p) => p.slug !== product.slug));
    } else {
      window.alert(result.error ?? "Delete failed.");
    }
  }

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="my-listings-heading" className="mt-16">
      <h2 id="my-listings-heading" className="text-2xl font-bold text-graphite">
        Your listings
      </h2>
      <p className="mt-1 text-sm text-graphite-soft">
        {items.length} {items.length === 1 ? "item" : "items"} you&apos;ve
        published.
      </p>

      <ul className="mt-6 divide-y divide-primary/10 overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-white shadow-sm">
        {items.map((product) => (
          <li key={product.slug} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-placeholder">
              <Image
                src={product.image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
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

            <button
              type="button"
              onClick={() => handleDelete(product)}
              disabled={deleting === product.slug}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 px-4 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-50"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {deleting === product.slug ? "Deleting…" : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
