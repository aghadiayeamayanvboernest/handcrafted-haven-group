"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addReview } from "@/lib/db";

export type ReviewState = { error?: string; success?: string } | undefined;

export async function addReviewAction(
  _prev: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) return { error: "You must be signed in to review." };

  const slug = String(formData.get("slug") ?? "");
  const rating = Number(formData.get("rating") ?? 0);
  const comment = String(formData.get("comment") ?? "").trim();

  if (!slug) return { error: "Missing product." };
  if (!(rating >= 1 && rating <= 5)) {
    return { error: "Please choose a rating from 1 to 5 stars." };
  }

  try {
    await addReview({ slug, username, rating, comment });
  } catch {
    return { error: "Could not save your review. Please try again." };
  }

  revalidatePath(`/products/${slug}`);
  return { success: "Thanks for your review!" };
}
