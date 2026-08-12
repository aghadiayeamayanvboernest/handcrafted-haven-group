import StarRating from "@/components/ui/StarRating";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {product.category}
      </p>

      <h1 className="font-heading text-3xl leading-tight text-graphite md:text-4xl">
        {product.name}
      </h1>

      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <p className="font-heading text-3xl font-bold text-primary">
        {priceFormatter.format(product.price)}
      </p>

      <p className="text-base leading-relaxed text-graphite-soft">
        {product.description}
      </p>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <AddToCartButton slug={product.slug} className="flex-1" />
        <a
          href="#reviews"
          className="inline-flex items-center justify-center rounded-[var(--radius)] border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Read reviews
        </a>
      </div>
    </div>
  );
}
