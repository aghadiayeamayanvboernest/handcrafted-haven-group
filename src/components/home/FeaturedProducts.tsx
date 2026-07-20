import { featuredProducts } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "./SectionHeader";

export default function FeaturedProducts() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div id="featured-heading">
        <SectionHeader
          title="Featured products"
          linkHref="/browse"
          linkLabel="View all products"
        />
      </div>

      {/* 4 cols desktop, 3 tablet, 2 mobile — per design doc + wireframe */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
