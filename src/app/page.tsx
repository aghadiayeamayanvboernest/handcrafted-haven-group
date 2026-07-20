import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import SellerSpotlight from "@/components/home/SellerSpotlight";
import SellerCta from "@/components/home/SellerCta";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <FeaturedProducts />
      <CategoryShowcase />
      <SellerSpotlight />
      <SellerCta />
      <Newsletter />
    </>
  );
}
