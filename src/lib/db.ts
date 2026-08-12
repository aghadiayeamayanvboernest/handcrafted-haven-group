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

/* ---------- cart ---------- */

export interface CartItem {
  product: Product;
  quantity: number;
}

export async function getCart(username: string): Promise<CartItem[]> {
  const { data: rows, error } = await supabaseAdmin
    .from("cart_items")
    .select("product_slug, quantity")
    .eq("username", username.toLowerCase())
    .order("created_at", { ascending: true });
  if (error) throw new Error(`getCart: ${error.message}`);
  if (!rows || rows.length === 0) return [];

  const slugs = rows.map((r) => r.product_slug);
  const { data: prods } = await supabaseAdmin
    .from("products")
    .select("*")
    .in("slug", slugs);
  const bySlug = new Map((prods as ProductRow[]).map((p) => [p.slug, toProduct(p)]));

  return rows
    .filter((r) => bySlug.has(r.product_slug))
    .map((r) => ({ product: bySlug.get(r.product_slug)!, quantity: r.quantity }));
}

export async function getCartCount(username: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("quantity")
    .eq("username", username.toLowerCase());
  if (error) throw new Error(`getCartCount: ${error.message}`);
  return (data ?? []).reduce((sum, r) => sum + r.quantity, 0);
}

export async function addToCart(username: string, slug: string): Promise<void> {
  const uname = username.toLowerCase();
  const { data: existing } = await supabaseAdmin
    .from("cart_items")
    .select("quantity")
    .eq("username", uname)
    .eq("product_slug", slug)
    .maybeSingle();

  const quantity = (existing?.quantity ?? 0) + 1;
  const { error } = await supabaseAdmin
    .from("cart_items")
    .upsert(
      { username: uname, product_slug: slug, quantity },
      { onConflict: "username,product_slug" },
    );
  if (error) throw new Error(`addToCart: ${error.message}`);
}

export async function setCartQuantity(
  username: string,
  slug: string,
  quantity: number,
): Promise<void> {
  const uname = username.toLowerCase();
  if (quantity <= 0) {
    await removeFromCart(uname, slug);
    return;
  }
  const { error } = await supabaseAdmin
    .from("cart_items")
    .update({ quantity })
    .eq("username", uname)
    .eq("product_slug", slug);
  if (error) throw new Error(`setCartQuantity: ${error.message}`);
}

export async function removeFromCart(username: string, slug: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("username", username.toLowerCase())
    .eq("product_slug", slug);
  if (error) throw new Error(`removeFromCart: ${error.message}`);
}

export async function clearCart(username: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("username", username.toLowerCase());
  if (error) throw new Error(`clearCart: ${error.message}`);
}

/* ---------- orders ---------- */

export interface OrderShipping {
  fullName: string;
  address: string;
  city: string;
  country: string;
}

export interface Order {
  id: string;
  createdAt: string;
  total: number;
  shipping: OrderShipping;
  items: { name: string; price: number; quantity: number; slug: string }[];
}

export async function createOrder(
  username: string,
  shipping: OrderShipping,
  items: CartItem[],
): Promise<string> {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      username: username.toLowerCase(),
      full_name: shipping.fullName,
      address: shipping.address,
      city: shipping.city,
      country: shipping.country,
      total,
    })
    .select("id")
    .single();
  if (error) throw new Error(`createOrder: ${error.message}`);

  const rows = items.map((i) => ({
    order_id: order.id,
    product_slug: i.product.slug,
    name: i.product.name,
    price: i.product.price,
    quantity: i.quantity,
  }));
  const { error: iErr } = await supabaseAdmin.from("order_items").insert(rows);
  if (iErr) throw new Error(`createOrder items: ${iErr.message}`);

  return order.id;
}

export async function getOrder(id: string): Promise<Order | null> {
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getOrder: ${error.message}`);
  if (!order) return null;

  const { data: items } = await supabaseAdmin
    .from("order_items")
    .select("name, price, quantity, product_slug")
    .eq("order_id", id);

  return {
    id: order.id,
    createdAt: order.created_at,
    total: Number(order.total),
    shipping: {
      fullName: order.full_name ?? "",
      address: order.address ?? "",
      city: order.city ?? "",
      country: order.country ?? "",
    },
    items: (items ?? []).map((i) => ({
      name: i.name,
      price: Number(i.price),
      quantity: i.quantity,
      slug: i.product_slug,
    })),
  };
}

/* ---------- reviews ---------- */

export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function getReviews(slug: string): Promise<Review[]> {
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("id, username, rating, comment, created_at")
    .eq("product_slug", slug)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getReviews: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id,
    username: r.username,
    rating: r.rating,
    comment: r.comment ?? "",
    createdAt: r.created_at,
  }));
}

/** Add/update a user's review, then recompute the product's rating + count. */
export async function addReview(input: {
  slug: string;
  username: string;
  rating: number;
  comment: string;
}): Promise<void> {
  const { error } = await supabaseAdmin.from("reviews").upsert(
    {
      product_slug: input.slug,
      username: input.username.toLowerCase(),
      rating: input.rating,
      comment: input.comment,
    },
    { onConflict: "product_slug,username" },
  );
  if (error) throw new Error(`addReview: ${error.message}`);

  const { data: all } = await supabaseAdmin
    .from("reviews")
    .select("rating")
    .eq("product_slug", input.slug);
  const ratings = (all ?? []).map((r) => r.rating);
  const count = ratings.length;
  const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
  await supabaseAdmin
    .from("products")
    .update({ rating: Math.round(avg * 10) / 10, review_count: count })
    .eq("slug", input.slug);
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
