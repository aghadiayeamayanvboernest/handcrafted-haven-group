import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCart } from "@/lib/db";
import { placeOrderAction } from "@/app/actions/cart";

export const metadata: Metadata = { title: "Checkout" };

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default async function CheckoutPage() {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) redirect("/login?callbackUrl=/checkout");

  const items = await getCart(username);
  if (items.length === 0) redirect("/cart");
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const field =
    "mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-graphite sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form action={placeOrderAction} className="space-y-4 lg:col-span-2">
          <div className="rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-graphite">Shipping details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-graphite">Full name</label>
                <input id="fullName" name="fullName" required className={field} />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-graphite">Address</label>
                <input id="address" name="address" required className={field} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-graphite">City</label>
                  <input id="city" name="city" required className={field} />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-graphite">Country</label>
                  <input id="country" name="country" required className={field} />
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-[var(--radius)] bg-cream-deep/40 px-4 py-3 text-sm text-graphite-soft">
              This is a demo — no payment is taken and nothing ships.
            </p>
            <button
              type="submit"
              className="mt-6 w-full rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Place order — {money.format(total)}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-graphite">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <li key={product.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-graphite-soft">
                  {product.name} × {quantity}
                </span>
                <span className="shrink-0 font-semibold text-graphite">
                  {money.format(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-primary/10 pt-3 text-base">
            <span className="font-bold text-graphite">Total</span>
            <span className="font-bold text-primary">{money.format(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
