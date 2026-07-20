import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

/**
 * Category shortcuts shown on the homepage. These link into Browse — the
 * actual filtering logic lives in the Product Browse & Filter card.
 */
export default function CategoryChips() {
  return (
    <nav aria-label="Shop by category" className="border-b border-primary/10 bg-cream">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <li>
          <Link
            href="/browse"
            className="inline-block whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            All items
          </Link>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/browse?category=${category.toLowerCase()}`}
              className="inline-block whitespace-nowrap rounded-full border border-primary/20 px-4 py-1.5 text-xs font-semibold text-graphite-soft transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
