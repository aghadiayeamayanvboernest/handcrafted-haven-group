"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  addToCart,
  setCartQuantity,
  removeFromCart,
  clearCart,
  getCart,
  createOrder,
} from "@/lib/db";

async function currentUsername(): Promise<string | null> {
  const session = await auth();
  return session?.user?.email ?? null;
}

export async function addToCartAction(
  slug: string,
): Promise<{ ok: boolean; needsLogin?: boolean }> {
  const username = await currentUsername();
  if (!username) return { ok: false, needsLogin: true };
  await addToCart(username, slug);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setQtyAction(slug: string, quantity: number) {
  const username = await currentUsername();
  if (!username) return;
  await setCartQuantity(username, slug, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeFromCartAction(slug: string) {
  const username = await currentUsername();
  if (!username) return;
  await removeFromCart(username, slug);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function placeOrderAction(formData: FormData) {
  const username = await currentUsername();
  if (!username) redirect("/login?callbackUrl=/checkout");

  const items = await getCart(username);
  if (items.length === 0) redirect("/cart");

  const shipping = {
    fullName: String(formData.get("fullName") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    country: String(formData.get("country") ?? "").trim(),
  };

  const orderId = await createOrder(username, shipping, items);
  await clearCart(username);
  revalidatePath("/", "layout");
  redirect(`/orders/${orderId}`);
}
