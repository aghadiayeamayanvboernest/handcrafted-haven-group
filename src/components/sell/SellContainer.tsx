"use client";

import { useState } from "react";
import { Store, DollarSign, Users } from "lucide-react";
import SellForm from "@/components/sell/SellForm";
import MyListings from "@/components/sell/MyListings";
import type { Product } from "@/types";

const BENEFITS = [
  {
    Icon: Store,
    title: "Your own storefront",
    body: "Showcase your craft with a beautiful seller profile and product pages.",
  },
  {
    Icon: DollarSign,
    title: "Keep more of each sale",
    body: "Fair, transparent pricing that puts makers first — no hidden fees.",
  },
  {
    Icon: Users,
    title: "Reach the right buyers",
    body: "Connect with shoppers who value handmade quality and one-of-a-kind design.",
  },
];

export default function SellContainer() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  function handleEditProduct(product: Product) {
    setEditingProduct(product);
    window.scrollTo({ top: 350, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Benefits */}
        <aside className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-graphite">
            Why sell with us
          </h2>
          <ul className="mt-6 space-y-6">
            {BENEFITS.map(({ Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tag text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-body text-base font-semibold text-graphite">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-graphite-soft">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Listing form */}
        <div className="lg:col-span-3">
          <h2 className="mb-6 text-2xl font-bold text-graphite">
            {editingProduct ? "Edit listing" : "List an item"}
          </h2>
          <SellForm
            initialProduct={editingProduct}
            onCancelEdit={() => setEditingProduct(null)}
            onSuccess={() => setEditingProduct(null)}
          />
        </div>
      </div>

      <MyListings onEditProduct={handleEditProduct} />
    </div>
  );
}
