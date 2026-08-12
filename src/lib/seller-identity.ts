import "server-only";
import { createHash } from "node:crypto";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "seller"
  );
}

/**
 * A stable seller id for a logged-in user, derived from their email so the
 * same person always maps to the same storefront (e.g. "ada-mensah-3f9c1a").
 */
export function deriveSellerId(user: SessionUser): string {
  const key = user.email ?? user.name ?? "anon";
  const hash = createHash("sha256").update(key).digest("hex").slice(0, 6);
  const base = slugifyName(user.name ?? "seller");
  return `${base}-${hash}`;
}
