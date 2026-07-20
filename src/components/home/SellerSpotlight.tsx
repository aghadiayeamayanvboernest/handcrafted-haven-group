import { sellers } from "@/lib/data";
import SellerCard from "./SellerCard";
import SectionHeader from "./SectionHeader";

export default function SellerSpotlight() {
  return (
    <section
      aria-labelledby="artisans-heading"
      className="bg-cream-deep/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div id="artisans-heading">
          <SectionHeader
            title="Meet the artisans"
            linkHref="/sellers"
            linkLabel="View all sellers"
          />
        </div>

        {/* Horizontal scroll on mobile, 3-col grid from sm up */}
        <ul className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {sellers.map((seller) => (
            <li key={seller.id} className="sm:min-w-0">
              <SellerCard seller={seller} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
