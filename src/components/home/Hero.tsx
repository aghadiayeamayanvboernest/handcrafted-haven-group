import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-linen" aria-labelledby="hero-heading">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 sm:px-6 md:flex-row md:justify-between md:py-20 lg:px-8">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-tag px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Handmade with love
          </span>

          <h1
            id="hero-heading"
            className="mt-4 text-4xl font-bold leading-tight text-graphite sm:text-5xl"
          >
            Discover Unique
            <br />
            Handcrafted Treasures
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-graphite-soft md:mx-0">
            Connect with talented artisans. Find one-of-a-kind items crafted with
            care and passion.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="/browse"
              className="rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Shop now
            </Link>
            <Link
              href="/sell"
              className="rounded-[var(--radius)] border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start selling
            </Link>
          </div>
        </div>

        <div className="hidden shrink-0 md:block">
          <Image
            src="/hero.webp"
            alt="A collection of handcrafted artisan goods"
            width={480}
            height={270}
            priority
            className="h-64 w-80 rounded-[var(--radius)] object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
