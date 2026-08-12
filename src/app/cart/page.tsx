import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { auth } from "@/auth";
import { getCart } from "@/lib/db";
import CartControls from "@/components/cart/CartControls";

export const metadata: Metadata = { title: "Cart" };

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default async function CartPage() {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) redirect("/login?callbackUrl=/cart");

  const items = await getCart(username);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-graphite sm:text-4xl">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius)] border border-dashed border-primary/20 py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-graphite-soft" aria-hidden="true" />
          <p className="mt-3 font-heading text-lg text-graphite">Your cart is empty</p>
          <Link
            href="/browse"
            className="mt-6 inline-block rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <ul className="divide-y divide-primary/10 overflow-hidden rounded-[var(--radius)] border border-primary/10 bg-white shadow-sm lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <li key={product.slug} className="flex items-center gap-4 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-placeholder">
                  <Image src={product.image} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-body font-semibold text-graphite hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-graphite-soft">{money.format(product.price)}</p>
                  <div className="mt-2">
                    <CartControls slug={product.slug} quantity={quantity} />
                  </div>
                </div>
                <p className="font-semibold text-primary">
                  {money.format(product.price * quantity)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-graphite">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-graphite-soft">Subtotal</dt>
                <dd className="font-semibold text-graphite">{money.format(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-graphite-soft">Shipping</dt>
                <dd className="font-semibold text-graphite">Free</dd>
              </div>
              <div className="flex justify-between border-t border-primary/10 pt-2 text-base">
                <dt className="font-bold text-graphite">Total</dt>
                <dd className="font-bold text-primary">{money.format(total)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="mt-6 block rounded-[var(--radius)] bg-primary px-6 py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
