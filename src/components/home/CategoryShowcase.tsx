import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import SectionHeader from "./SectionHeader";

export default function CategoryShowcase() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div id="categories-heading">
        <SectionHeader
          title="Shop by category"
          linkHref="/browse"
          linkLabel="Browse all"
        />
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/browse?category=${category.toLowerCase()}`}
              className="group block overflow-hidden rounded-[var(--radius)] border border-primary/10 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-placeholder">
                <Image
                  src={`/categories/${category.toLowerCase()}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/70 to-transparent p-3">
                  <span className="font-body text-sm font-semibold text-cream">
                    {category}
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
