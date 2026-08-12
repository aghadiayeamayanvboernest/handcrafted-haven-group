"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  getUserByUsername,
  updateUserProfile,
  updateUserPassword,
} from "@/lib/db";

export type ProfileState = { error?: string; success?: string } | undefined;

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) return { error: "You must be signed in." };

  const name = String(formData.get("name") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!name) return { error: "Name can't be empty." };

  try {
    await updateUserProfile(username, { name, location, bio });
  } catch {
    return { error: "Could not save your profile. Please try again." };
  }

  revalidatePath("/settings");
  return { success: "Profile updated." };
}

export async function changePasswordAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) return { error: "You must be signed in." };

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < 6) {
    return { error: "New password must be at least 6 characters." };
  }
  if (next !== confirm) {
    return { error: "New passwords don't match." };
  }

  const user = await getUserByUsername(username);
  if (!user) return { error: "Account not found." };

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) return { error: "Your current password is incorrect." };

  const passwordHash = await bcrypt.hash(next, 10);
  try {
    await updateUserPassword(username, passwordHash);
  } catch {
    return { error: "Could not update your password. Please try again." };
  }

  return { success: "Password changed." };
}
