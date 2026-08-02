import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed background photo */}
      <Image
        src="/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Scrim for text contrast — darker on the left where the copy sits */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-graphite/80 via-graphite/55 to-graphite/25"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/40 bg-cream/10 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Handmade with love
          </span>

          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold leading-tight text-cream drop-shadow-sm sm:text-5xl lg:text-6xl"
          >
            Discover Unique
            <br />
            Handcrafted Treasures
          </h1>

          <p className="mt-4 max-w-md text-base text-cream/90 sm:text-lg">
            Connect with talented artisans. Find one-of-a-kind items crafted with
            care and passion.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/browse"
              className="rounded-[var(--radius)] bg-primary px-6 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Shop now
            </Link>
            <Link
              href="/sell"
              className="rounded-[var(--radius)] border border-cream/70 px-6 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Start selling
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
