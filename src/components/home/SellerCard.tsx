import Link from "next/link";
import Image from "next/image";
import type { Seller } from "@/types";

interface SellerCardProps {
  seller: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link
      href={`/sellers/${seller.id}`}
      className="flex w-64 shrink-0 items-center gap-4 rounded-[var(--radius)] border border-primary/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
    >
      <Image
        src={seller.avatar}
        alt={`${seller.name}, ${seller.specialty} artisan`}
        width={112}
        height={112}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <span className="min-w-0">
        <span className="block truncate font-body text-base font-semibold text-graphite">
          {seller.name}
        </span>
        <span className="block truncate text-sm text-graphite-soft">
          {seller.specialty} · {seller.location}
        </span>
        <span className="mt-0.5 block text-sm font-semibold text-primary">
          {seller.productCount} products
        </span>
      </span>
    </Link>
  );
}
