/**
 * One-off: create login accounts for the three demo artisans, link each to
 * their storefront, and move all seed photos (avatars + product images) from
 * /public into Supabase Storage. Prints the generated passwords.
 *
 * Run: node --env-file=.env.local scripts/link-artisans.mjs
 */
import { readFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
const BUCKET = "product-images";
const publicDir = join(process.cwd(), "public");

const artisans = [
  { sellerId: "ada-mensah", username: "ada_mensah", name: "Ada Mensah" },
  { sellerId: "john-kimani", username: "john_kimani", name: "John Kimani" },
  { sellerId: "sara-chen", username: "sara_chen", name: "Sara Chen" },
];

function newPassword() {
  return randomBytes(6).toString("base64url"); // ~8 readable chars
}

const creds = [];

// 1) accounts + ownership
for (const a of artisans) {
  const password = newPassword();
  const passwordHash = await bcrypt.hash(password, 10);
  const { error: uErr } = await s
    .from("users")
    .upsert(
      { username: a.username, name: a.name, password_hash: passwordHash },
      { onConflict: "username" },
    );
  if (uErr) throw new Error(`user ${a.username}: ${uErr.message}`);

  const { error: sErr } = await s
    .from("sellers")
    .update({ owner_username: a.username })
    .eq("id", a.sellerId);
  if (sErr) throw new Error(`link ${a.sellerId}: ${sErr.message}`);

  creds.push({ artisan: a.name, username: a.username, password });
}

// 2) move photos to Storage
const { data: products } = await s.from("products").select("slug, image");
const { data: sellers } = await s.from("sellers").select("id, avatar");

const localPaths = new Set();
for (const p of products) if (p.image?.startsWith("/")) localPaths.add(p.image);
for (const se of sellers) if (se.avatar?.startsWith("/")) localPaths.add(se.avatar);

const urlMap = {};
for (const path of localPaths) {
  const bytes = await readFile(join(publicDir, path));
  const storagePath = `seed${path}`; // e.g. seed/products/x.webp
  const { error } = await s.storage
    .from(BUCKET)
    .upload(storagePath, bytes, { contentType: "image/webp", upsert: true });
  if (error) throw new Error(`upload ${path}: ${error.message}`);
  urlMap[path] = s.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

// 3) point rows at the Storage URLs
for (const [path, url] of Object.entries(urlMap)) {
  await s.from("products").update({ image: url }).eq("image", path);
  await s.from("sellers").update({ avatar: url }).eq("avatar", path);
}

console.log(`\nUploaded ${localPaths.size} images to Storage and linked accounts.\n`);
console.log("=== ARTISAN LOGIN CREDENTIALS ===");
for (const c of creds) {
  console.log(`${c.artisan.padEnd(14)} username: ${c.username.padEnd(14)} password: ${c.password}`);
}
console.log("=================================\n");
