import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, HandHeart, ShieldCheck, Globe } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Handcrafted Haven connects independent artisans with people who value handmade quality.",
};

const VALUES = [
  { Icon: Sparkles, title: "Genuinely handmade", body: "Every item is crafted by hand — never mass-produced." },
  { Icon: HandHeart, title: "Maker-first", body: "Fair, transparent pricing that puts artisans first." },
  { Icon: ShieldCheck, title: "Shop with trust", body: "Vetted sellers and secure, protected checkout." },
  { Icon: Globe, title: "Global craft", body: "Discover makers and traditions from around the world." },
];

const STATS = [
  { value: "200+", label: "Independent artisans" },
  { value: "30", label: "Countries represented" },
  { value: "12k+", label: "Treasures sold" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Handmade, with heart"
        subtitle="A marketplace built to celebrate the makers behind the goods."
        image="/hero.webp"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro + image */}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-graphite sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-graphite-soft">
              Handcrafted Haven gives craftspeople a beautiful, trustworthy place
              to showcase and sell their work, and helps shoppers discover pieces
              made with care — not stamped out on an assembly line.
            </p>
            <p className="mt-4 text-graphite-soft">
              Every purchase supports a real person practicing their craft, and
              every item carries the story of the hands that made it.
            </p>
            <Link
              href="/browse"
              className="mt-6 inline-block rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore the marketplace
            </Link>
          </div>
          <div className="overflow-hidden rounded-[var(--radius)] shadow-sm">
            <Image
              src="/categories/pottery.webp"
              alt="An artisan's handmade ceramics"
              width={900}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 rounded-[var(--radius)] bg-cream-deep/50 px-6 py-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-graphite-soft">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-graphite sm:text-3xl">
            What we stand for
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="rounded-[var(--radius)] border border-primary/10 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tag text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-body text-base font-semibold text-graphite">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-graphite-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
