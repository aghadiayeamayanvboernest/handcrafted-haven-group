import type { Metadata } from "next";
import { Store, DollarSign, Users } from "lucide-react";
import { auth } from "@/auth";
import PageHeader from "@/components/layout/PageHeader";
import SellForm from "@/components/sell/SellForm";

export const metadata: Metadata = {
  title: "Sell",
  description: "Start selling your handcrafted items on Handcrafted Haven.",
};

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

export default async function SellPage() {
  // Route is auth-protected by middleware, so a session is guaranteed here.
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <>
      <PageHeader
        eyebrow="Sell on Handcrafted Haven"
        title={firstName ? `Welcome, ${firstName}` : "Start selling"}
        subtitle="Turn your craft into a storefront. List an item below to get started."
        image="/hero.webp"
      />

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
              List an item
            </h2>
            <SellForm />
          </div>
        </div>
      </div>
    </>
  );
}
