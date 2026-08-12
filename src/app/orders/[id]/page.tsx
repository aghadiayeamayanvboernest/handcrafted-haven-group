import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getOrder } from "@/lib/db";

export const metadata: Metadata = { title: "Order confirmed" };

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold text-graphite">Thank you for your order!</h1>
        <p className="mt-2 text-graphite-soft">
          Order <span className="font-mono text-sm">{order.id.slice(0, 8)}</span> is
          confirmed. (This is a demo — no payment was taken.)
        </p>
      </div>

      <div className="mt-10 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-graphite">Order summary</h2>
        <ul className="mt-4 divide-y divide-primary/10">
          {order.items.map((item) => (
            <li key={item.slug} className="flex justify-between gap-3 py-3 text-sm">
              <span className="text-graphite">
                {item.name} <span className="text-graphite-soft">× {item.quantity}</span>
              </span>
              <span className="shrink-0 font-semibold text-graphite">
                {money.format(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-primary/10 pt-3 text-base">
          <span className="font-bold text-graphite">Total</span>
          <span className="font-bold text-primary">{money.format(order.total)}</span>
        </div>

        <div className="mt-6 text-sm text-graphite-soft">
          <p className="font-semibold text-graphite">Shipping to</p>
          <p>{order.shipping.fullName}</p>
          <p>{order.shipping.address}</p>
          <p>
            {order.shipping.city}, {order.shipping.country}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/browse"
          className="inline-block rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
