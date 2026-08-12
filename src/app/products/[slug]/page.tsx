import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SellerMiniCard from "@/components/product/SellerMiniCard";
import RelatedProducts from "@/components/product/RelatedProducts";
import ReviewsSection from "@/components/product/ReviewsSection";
import { getProductBySlug, getProducts, getSeller, getReviews } from "@/lib/db";
import { auth } from "@/auth";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [seller, all, reviews, session] = await Promise.all([
    getSeller(product.sellerId),
    getProducts(),
    getReviews(slug),
    auth(),
  ]);
  const related = all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
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
        <ProductGallery
          src={product.image}
          alt={`${product.name} by ${seller?.name ?? "a Handcrafted Haven artisan"}`}
        />
        <ProductInfo product={product} />
      </div>

      {seller && (
        <div className="mt-10">
          <SellerMiniCard seller={seller} />
        </div>
      )}

      <ReviewsSection
        slug={slug}
        reviews={reviews}
        canReview={Boolean(session?.user)}
      />

      <RelatedProducts products={related} />
    </div>
  );
}
