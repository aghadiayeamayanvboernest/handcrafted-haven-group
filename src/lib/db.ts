import "server-only";
import { supabaseAdmin, PRODUCT_IMAGES_BUCKET } from "@/lib/supabase/server";
import type { Category, Product, Seller } from "@/types";

/* ---------- row <-> type mapping ---------- */

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  image: string | null;
  rating: number;
  review_count: number;
  seller_id: string | null;
  featured: boolean;
}

interface SellerRow {
  id: string;
  name: string;
  specialty: string | null;
  location: string | null;
  bio: string | null;
  avatar: string | null;
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    category: row.category as Category,
    description: row.description ?? "",
    image: row.image ?? "",
    rating: Number(row.rating),
    reviewCount: row.review_count,
    sellerId: row.seller_id ?? "",
    featured: row.featured,
  };
}

function toSeller(row: SellerRow, productCount: number): Seller {
  return {
    id: row.id,
    name: row.name,
    specialty: (row.specialty as Category) ?? "Art",
    location: row.location ?? "",
    bio: row.bio ?? "",
    avatar: row.avatar ?? "",
    productCount,
  };
}

/* ---------- products ---------- */

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getProducts: ${error.message}`);
  return (data as ProductRow[]).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getProductBySlug: ${error.message}`);
  return data ? toProduct(data as ProductRow) : null;
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getProductsBySeller: ${error.message}`);
  return (data as ProductRow[]).map(toProduct);
}

export async function createProduct(input: {
  slug: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  sellerId: string;
}): Promise<Product> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({
      slug: input.slug,
      name: input.name,
      price: input.price,
      category: input.category,
      description: input.description,
      image: input.image,
      seller_id: input.sellerId,
    })
    .select("*")
    .single();
  if (error) throw new Error(`createProduct: ${error.message}`);
  return toProduct(data as ProductRow);
}

export async function deleteProduct(slug: string, sellerId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("slug", slug)
    .eq("seller_id", sellerId);
  if (error) throw new Error(`deleteProduct: ${error.message}`);
}

/* ---------- sellers ---------- */

export async function getSeller(id: string): Promise<Seller | null> {
  const { data, error } = await supabaseAdmin
    .from("sellers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getSeller: ${error.message}`);
  if (!data) return null;

  const { count } = await supabaseAdmin
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", id);
  return toSeller(data as SellerRow, count ?? 0);
}

export async function upsertSeller(input: {
  id: string;
  name: string;
  specialty?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  ownerUsername?: string;
}): Promise<void> {
  const row: Record<string, unknown> = {
    id: input.id,
    name: input.name,
    specialty: input.specialty ?? null,
    location: input.location ?? null,
    bio: input.bio ?? null,
    avatar: input.avatar ?? null,
  };
  if (input.ownerUsername) row.owner_username = input.ownerUsername.toLowerCase();

  const { error } = await supabaseAdmin
    .from("sellers")
    .upsert(row, { onConflict: "id" });
  if (error) throw new Error(`upsertSeller: ${error.message}`);
}

/** The storefront id owned by a given user (their username), or null. */
export async function getSellerIdByOwner(
  username: string,
): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from("sellers")
    .select("id")
    .eq("owner_username", username.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(`getSellerIdByOwner: ${error.message}`);
  return data?.id ?? null;
}

/* ---------- users (username / password auth) ---------- */

export interface DbUser {
  id: string;
  username: string;
  name: string | null;
  passwordHash: string;
}

export async function getUserByUsername(
  username: string,
): Promise<DbUser | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id, username, name, password_hash")
    .eq("username", username.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(`getUserByUsername: ${error.message}`);
  if (!data) return null;
  return {
    id: data.id,
    username: data.username,
    name: data.name,
    passwordHash: data.password_hash,
  };
}

export async function createUser(input: {
  username: string;
  name: string;
  passwordHash: string;
  location?: string;
}): Promise<{ id: string; username: string; name: string }> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({
      username: input.username.toLowerCase(),
      name: input.name,
      password_hash: input.passwordHash,
      location: input.location ?? null,
    })
    .select("id, username, name")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, username: data.username, name: data.name };
}

export interface UserProfile {
  username: string;
  name: string;
  location: string;
  bio: string;
}

export async function getUserProfile(
  username: string,
): Promise<UserProfile | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("username, name, location, bio")
    .eq("username", username.toLowerCase())
    .maybeSingle();
  if (error) throw new Error(`getUserProfile: ${error.message}`);
  if (!data) return null;
  return {
    username: data.username,
    name: data.name ?? "",
    location: data.location ?? "",
    bio: data.bio ?? "",
  };
}

/** Update a user's profile; also mirror to their storefront if they have one. */
export async function updateUserProfile(
  username: string,
  input: { name: string; location: string; bio: string },
): Promise<void> {
  const uname = username.toLowerCase();
  const { error } = await supabaseAdmin
    .from("users")
    .update({ name: input.name, location: input.location, bio: input.bio })
    .eq("username", uname);
  if (error) throw new Error(`updateUserProfile: ${error.message}`);

  // Keep the public storefront in sync (if this user owns one).
  await supabaseAdmin
    .from("sellers")
    .update({ name: input.name, location: input.location, bio: input.bio })
    .eq("owner_username", uname);
}

export async function updateUserPassword(
  username: string,
  passwordHash: string,
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("users")
    .update({ password_hash: passwordHash })
    .eq("username", username.toLowerCase());
  if (error) throw new Error(`updateUserPassword: ${error.message}`);
}

/* ---------- storage ---------- */

/** Uploads image bytes to Storage and returns the public URL. */
export async function uploadProductImage(
  bytes: ArrayBuffer,
  contentType: string,
  path: string,
): Promise<string> {
  const { error } = await supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, bytes, { contentType, upsert: true });
  if (error) throw new Error(`uploadProductImage: ${error.message}`);

  const { data } = supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}
