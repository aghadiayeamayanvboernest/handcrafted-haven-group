import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SellerCta() {
  return (
    <section aria-labelledby="seller-cta-heading" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-[var(--radius)] bg-primary px-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-xl">
          <h2
            id="seller-cta-heading"
            className="text-2xl font-bold text-cream sm:text-3xl"
          >
            Are you a maker?
          </h2>
          <p className="mt-2 text-cream/80">
            Open your shop on Handcrafted Haven and share your craft with buyers
            who value the handmade.
          </p>
        </div>
        <Link
          href="/sell"
          className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          Start selling
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
