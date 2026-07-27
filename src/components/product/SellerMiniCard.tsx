import Link from "next/link";
import { initials } from "@/lib/categories";
import type { Seller } from "@/types";

interface SellerMiniCardProps {
  seller: Seller;
}

export default function SellerMiniCard({ seller }: SellerMiniCardProps) {
  return (
    <Link
      href={`/sellers/${seller.id}`}
      className="group flex items-center gap-4 rounded-[var(--radius)] border border-primary/10 bg-white p-4 transition-colors hover:border-primary/30 hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-avatar font-heading text-base font-semibold text-primary"
      >
        {initials(seller.name)}
    </span>

      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-graphite-soft">
          Made by
      </span>
        <span className="font-heading text-base font-semibold text-graphite group-hover:text-primary">
          {seller.name}
      </span>
        <span className="text-xs text-graphite-soft">
          {seller.specialty} · {seller.location}
      </span>
    </div>
  </Link>
  );
}
