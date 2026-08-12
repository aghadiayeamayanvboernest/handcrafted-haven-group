import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Package } from "lucide-react";
import { getSeller, getProductsBySeller } from "@/lib/db";
import ProductCard from "@/components/product/ProductCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const seller = await getSeller(id);
  return {
    title: seller ? seller.name : "Seller",
    description: seller?.bio ?? "Meet the artisan behind the craft.",
  };
}

export default async function SellerPage({ params }: PageProps) {
  const { id } = await params;
  const seller = await getSeller(id);

  if (!seller) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-heading text-3xl text-graphite">Seller not found</h1>
        <p className="mt-2 text-graphite-soft">
          This storefront doesn&apos;t exist yet.
        </p>
        <Link
          href="/browse"
          className="mt-6 inline-block rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const products = await getProductsBySeller(id);
  const coverImage = `/categories/${(seller.specialty || "art").toLowerCase()}.webp`;

  return (
    <div>
      {/* Cover banner */}
      <div className="relative h-40 w-full overflow-hidden sm:h-56">
        <Image src={coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-graphite/40" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: avatar + info pulled up over the cover */}
        <div className="-mt-12 flex flex-col items-start gap-4 sm:-mt-14 sm:flex-row sm:items-end">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-cream bg-avatar sm:h-28 sm:w-28">
            {seller.avatar && (
              <Image src={seller.avatar} alt={seller.name} fill sizes="112px" className="object-cover" />
            )}
          </div>
          <div className="pb-1">
            <h1 className="font-heading text-3xl font-bold text-graphite">
              {seller.name}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-graphite-soft">
              <span className="font-semibold text-primary">{seller.specialty}</span>
              {seller.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {seller.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Package className="h-4 w-4" aria-hidden="true" />
                {seller.productCount} {seller.productCount === 1 ? "product" : "products"}
              </span>
            </p>
          </div>
        </div>

        {seller.bio && (
          <p className="mt-6 max-w-2xl text-graphite-soft">{seller.bio}</p>
        )}

        {/* Products */}
        <h2 className="mt-12 text-2xl font-bold text-graphite">
          Products by {seller.name.split(" ")[0]}
        </h2>
        {products.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 pb-16 text-graphite-soft">
            No products listed yet.
          </p>
        )}
      </div>
    </div>
  );
}
