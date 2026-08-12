"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { products } from "@/lib/data";
import { getStoredListingBySlug } from "@/lib/listings";
import type { Product } from "@/types";

type State =
  | { status: "loading" }
  | { status: "found"; product: Product }
  | { status: "missing" };

/**
 * Renders a seller-created listing (stored in this browser's localStorage).
 * Used as a fallback when a slug isn't part of the statically-known catalog.
 */
export default function ClientListingDetail({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const product = getStoredListingBySlug(slug);
    // localStorage is client-only, so it must be read after mount (not in SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(product ? { status: "found", product } : { status: "missing" });
  }, [slug]);

  if (state.status === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-graphite-soft">
        Loading…
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl text-graphite">
          Product not found
        </h1>
        <p className="mt-2 text-graphite-soft">
          This item doesn&apos;t exist or was created in a different browser.
        </p>
        <Link
          href="/browse"
          className="mt-6 inline-block rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  const { product } = state;
  const related = products
    .filter((p) => p.category === product.category)
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: product.category, href: `/browse?category=${product.category.toLowerCase()}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery src={product.image} alt={product.name} images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-8 rounded-[var(--radius)] border border-primary/10 bg-cream-deep/40 px-4 py-3 text-sm text-graphite-soft">
        This is your listing, visible in this browser. Publishing to everyone
        needs a shared database — a future enhancement.
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
