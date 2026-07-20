import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import StarRating from "@/components/ui/StarRating";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="aspect-square overflow-hidden bg-placeholder">
          <Image
            src={product.image}
            alt={`${product.name} by Handcrafted Haven artisan`}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3">
        <p className="text-xs font-semibold text-primary">{product.category}</p>
        <h3 className="mt-0.5 font-body text-sm font-semibold text-graphite">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-1">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            {priceFormatter.format(product.price)}
          </span>
          <button
            type="button"
            className="rounded-full p-1.5 text-graphite-soft transition-colors hover:bg-cream-deep hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Save ${product.name} to favorites`}
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
