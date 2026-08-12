"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { createUser, getUserByUsername } from "@/lib/db";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

type FormState = { error?: string } | undefined;

const USERNAME_RE = /^[a-zA-Z0-9_@.-]{3,20}$/;

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/") || "/";

  if (!username || !password) {
    return { error: "Please enter your username and password." };
  }

  try {
    await signIn("credentials", { username, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password." };
    }
    throw error; // re-throw the redirect
  }
  return undefined;
}

export async function registerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const callbackUrl = String(formData.get("callbackUrl") ?? "/") || "/";

  if (!name) return { error: "Please enter your name." };
  if (!USERNAME_RE.test(username)) {
    return { error: "Username must be 3–20 characters (letters, numbers, or _ @ . -)." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const existing = await getUserByUsername(username);
  if (existing) return { error: "That username is already taken." };

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await createUser({ username, name, passwordHash, location });
  } catch {
    return { error: "Could not create your account. Please try again." };
  }

  try {
    await signIn("credentials", { username, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but automatic sign-in failed. Please log in." };
    }
    throw error; // re-throw the redirect
  }
  return undefined;
}
