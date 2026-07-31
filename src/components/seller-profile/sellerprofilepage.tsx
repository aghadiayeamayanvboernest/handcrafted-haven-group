"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  MapPin,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

/**
 * Seller Profile Page — Handcrafted Haven
 * 
 * Comprehensive seller profile showcasing artisan info, products, reviews,
 * and action-oriented CTAs. Follows the established design system:
 * - Color palette: Toffee Brown (#8B5E3C), Honey Bronze (#E8A838), Cream (#FFEEDB)
 * - Typography: Playfair (headings), Inter (body)
 * - Layout: Max-width container with consistent spacing
 */

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
}

// Mock data
const seller = {
  id: "sophia-ceramics",
  name: "Sophia Chen",
  specialty: "Ceramic Artist",
  location: "Portland, OR",
  avatar: "/sellers/sophia.jpg",
  coverImage: "/sellers/sophia-cover.jpg",
  joinDate: "Joined March 2023",
  description:
    "Welcome to my studio! I craft handmade ceramics inspired by natural forms and traditional techniques. Each piece is one-of-a-kind, made with locally-sourced clay and glazes.",
  stats: {
    followers: 2840,
    products: 48,
    averageRating: 4.9,
    responseTime: "< 2 hours",
  },
  featuredProducts: [
    {
      id: "1",
      name: "Textured Raku Bowl",
      image: "/products/bowl-1.jpg",
      price: 85,
      rating: 5,
      reviewCount: 23,
    },
    {
      id: "2",
      name: "Minimalist Vase Set",
      image: "/products/vase-1.jpg",
      price: 120,
      rating: 4.8,
      reviewCount: 18,
    },
    {
      id: "3",
      name: "Glazed Dinnerware",
      image: "/products/dinnerware-1.jpg",
      price: 65,
      rating: 5,
      reviewCount: 31,
    },
    {
      id: "4",
      name: "Sculptural Planter",
      image: "/products/planter-1.jpg",
      price: 95,
      rating: 4.9,
      reviewCount: 12,
    },
  ],
  reviews: [
    {
      id: "r1",
      author: "Emma L.",
      rating: 5,
      text: "The bowl arrived in perfect condition and is even more beautiful in person. Sophia's attention to detail is incredible. Highly recommend!",
      date: "2 weeks ago",
      avatar: "/avatars/emma.jpg",
    },
    {
      id: "r2",
      author: "Marcus T.",
      rating: 5,
      text: "Exactly as described. The glazing is stunning and each piece feels special. Great communication throughout the process.",
      date: "1 month ago",
      avatar: "/avatars/marcus.jpg",
    },
    {
      id: "r3",
      author: "Jasmine K.",
      rating: 4.5,
      text: "Love this vase. Shipping took a bit longer than expected but it arrived safely. Definitely will order again.",
      date: "6 weeks ago",
      avatar: "/avatars/jasmine.jpg",
    },
  ],
};

function RatingStars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? "fill-accent text-accent"
              : "text-graphite-soft/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function SellerProfilePage() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "reviews">("products");

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero / Cover Section */}
      <section className="relative h-48 overflow-hidden bg-gradient-to-r from-primary/10 to-accent/10 md:h-64">
        <Image
          src={seller.coverImage}
          alt={`${seller.name}'s seller profile cover`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 via-transparent to-transparent" />
      </section>

      {/* Profile Header */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Avatar & Info — negative margin pulls up over hero */}
          <div className="relative -mt-20 mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex gap-6">
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border-4 border-cream object-cover shadow-md"
              />
              <div className="pt-6">
                <h1 className="text-3xl font-bold text-graphite sm:text-4xl">
                  {seller.name}
                </h1>
                <p className="mt-1 text-base text-primary font-semibold">
                  {seller.specialty}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-graphite-soft">
                  <MapPin className="h-4 w-4" />
                  {seller.location}
                </div>
                <p className="mt-1 text-xs text-graphite-soft/80">
                  {seller.joinDate}
                </p>
              </div>
            </div>

            {/* CTA Buttons — Right aligned on desktop */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center justify-center rounded-[var(--radius)] border border-primary/30 bg-white p-3 text-graphite transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={isSaved ? "Remove from saved" : "Save this seller"}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isSaved ? "fill-accent text-accent" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <button
                className="flex items-center justify-center rounded-[var(--radius)] border border-primary/30 bg-white p-3 text-graphite transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Share this seller"
              >
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </button>
              <Link
                href={`/sellers/${seller.id}/contact`}
                className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Message</span>
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 border-y border-primary/10 py-6 sm:grid-cols-4">
            <div>
              <p className="text-sm text-graphite-soft">Followers</p>
              <p className="mt-1 text-2xl font-bold text-graphite">
                {seller.stats.followers.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-graphite-soft">Products</p>
              <p className="mt-1 text-2xl font-bold text-graphite">
                {seller.stats.products}
              </p>
            </div>
            <div>
              <p className="text-sm text-graphite-soft">Average Rating</p>
              <div className="mt-1 flex items-center gap-2">
                <RatingStars rating={seller.stats.averageRating} size="md" />
                <span className="text-sm font-semibold text-graphite">
                  {seller.stats.averageRating}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-graphite-soft">Response Time</p>
              <p className="mt-1 text-sm font-bold text-primary">
                {seller.stats.responseTime}
              </p>
            </div>
          </div>

          {/* Bio & Trust Badges */}
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-graphite">About</h2>
              <p className="mt-3 text-graphite-soft leading-relaxed">
                {seller.description}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-graphite">Verified Seller</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-graphite-soft">
                  <Shield className="h-4 w-4 shrink-0 text-primary" />
                  <span>Identity verified</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-graphite-soft">
                  <Zap className="h-4 w-4 shrink-0 text-primary" />
                  <span>Quick responder</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-graphite-soft">
                  <Star className="h-4 w-4 shrink-0 fill-accent text-accent" />
                  <span>Top-rated artisan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="border-t border-primary/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-8 flex gap-8 border-b border-primary/10">
            <button
              onClick={() => setActiveTab("products")}
              className={`relative pb-4 text-base font-semibold transition-colors ${
                activeTab === "products"
                  ? "text-primary"
                  : "text-graphite-soft hover:text-graphite"
              }`}
            >
              Featured Products
              {activeTab === "products" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`relative pb-4 text-base font-semibold transition-colors ${
                activeTab === "reviews"
                  ? "text-primary"
                  : "text-graphite-soft hover:text-graphite"
              }`}
            >
              Reviews
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
          </div>

          {/* Featured Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-8">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {seller.featuredProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/sellers/${seller.id}/products/${product.id}`}
                      className="group flex flex-col overflow-hidden rounded-[var(--radius)] border border-primary/10 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-placeholder">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 bg-white p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold text-graphite">
                          {product.name}
                        </h3>
                        <div className="mt-auto flex items-center justify-between">
                          <p className="text-base font-bold text-primary">
                            ${product.price}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                            <span className="text-xs font-semibold text-graphite">
                              {product.rating}
                            </span>
                            <span className="text-xs text-graphite-soft/70">
                              ({product.reviewCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View All Products CTA */}
              <div className="mt-10 text-center">
                <Link
                  href={`/sellers/${seller.id}/products`}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cream"
                >
                  View all {seller.stats.products} products
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Review Summary */}
              <div className="rounded-[var(--radius)] border border-primary/10 bg-white p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-graphite-soft">Overall Rating</p>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="text-3xl font-bold text-primary">
                        {seller.stats.averageRating}
                      </div>
                      <div className="flex flex-col gap-1">
                        <RatingStars rating={seller.stats.averageRating} size="md" />
                        <p className="text-xs text-graphite-soft">
                          Based on 150+ reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <ul className="space-y-6">
                {seller.reviews.map((review) => (
                  <li
                    key={review.id}
                    className="border-b border-primary/10 pb-6 last:border-b-0"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-semibold text-graphite">
                              {review.author}
                            </h3>
                            <p className="text-xs text-graphite-soft">
                              {review.date}
                            </p>
                          </div>
                          <RatingStars rating={review.rating} />
                        </div>
                        <p className="mt-2 text-sm text-graphite-soft leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Load More Reviews */}
              <div className="text-center">
                <button className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cream">
                  View all 150+ reviews
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Follow / Contact CTA Section */}
      <section className="border-t border-primary/10 bg-cream-deep/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[var(--radius)] bg-white p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-graphite sm:text-3xl">
              Love {seller.name.split(" ")[0]}'s work?
            </h2>
            <p className="mt-3 text-graphite-soft">
              Get notified about new pieces and behind-the-scenes studio updates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-cream-deep">
                <Heart className="h-4 w-4" />
                Follow this seller
              </button>
              <Link
                href={`/sellers/${seller.id}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark"
              >
                <MessageCircle className="h-4 w-4" />
                Send a custom request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Sellers Section */}
      <section className="border-t border-primary/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-graphite sm:text-3xl">
              More artisans to discover
            </h2>
            <Link
              href="/sellers"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              View all sellers
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related Sellers Grid — could be populated with actual data */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Link
                key={i}
                href="#"
                className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-primary/10 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-video bg-placeholder" />
                <div className="flex flex-col gap-2 bg-white p-4">
                  <h3 className="font-semibold text-graphite">Artist Name</h3>
                  <p className="text-xs text-graphite-soft">Specialty · Location</p>
                  <p className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    4.8 (120 reviews)
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}