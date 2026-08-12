"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { deriveSellerId } from "@/lib/seller-identity";
import {
  createProduct,
  deleteProduct,
  uploadProductImage,
} from "@/lib/db";
import { upsertSeller } from "@/lib/db";
import type { Category } from "@/types";

const CATEGORIES = ["Jewelry", "Pottery", "Textiles", "Candles", "Art"];

function slugify(name: string): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "listing";
  return `${base}-${randomUUID().slice(0, 6)}`;
}

type CreateResult =
  | { ok: true; slug: string; sellerId: string }
  | { ok: false; error: string };

export async function createListingAction(
  formData: FormData,
): Promise<CreateResult> {
  const session = await auth();
  const user = session?.user;
  if (!user) return { ok: false, error: "You must be signed in to sell." };

  const name = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "") as Category;
  const price = Number(formData.get("price") ?? 0);
  const description = String(formData.get("description") ?? "").trim();
  const photo = formData.get("photo");

  if (!name || !CATEGORIES.includes(category) || !(price > 0) || !description) {
    return { ok: false, error: "Please fill in all fields correctly." };
  }

  const sellerId = deriveSellerId(user);
  const slug = slugify(name);

  // Ensure this user has a seller row (their storefront).
  await upsertSeller({
    id: sellerId,
    name: user.name ?? "Artisan",
    specialty: category,
    avatar: user.image ?? undefined,
  });

  // Upload the photo to Storage, or fall back to a category image.
  let image = `/categories/${category.toLowerCase()}.webp`;
  if (photo instanceof File && photo.size > 0) {
    const ext = photo.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const bytes = await photo.arrayBuffer();
    image = await uploadProductImage(bytes, photo.type, `${sellerId}/${slug}.${ext}`);
  }

  try {
    await createProduct({ slug, name, price, category, description, image, sellerId });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to save listing." };
  }

  revalidatePath("/browse");
  revalidatePath("/sell");
  revalidatePath(`/products/${slug}`);
  revalidatePath(`/sellers/${sellerId}`);
  return { ok: true, slug, sellerId };
}

export async function deleteListingAction(
  slug: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  const user = session?.user;
  if (!user) return { ok: false, error: "Not signed in." };

  const sellerId = deriveSellerId(user);
  try {
    await deleteProduct(slug, sellerId);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Delete failed." };
  }

  revalidatePath("/browse");
  revalidatePath("/sell");
  revalidatePath(`/sellers/${sellerId}`);
  return { ok: true };
}
