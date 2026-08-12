import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. It bypasses Row
 * Level Security, so it must NEVER be imported into a client component.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const PRODUCT_IMAGES_BUCKET = "product-images";
