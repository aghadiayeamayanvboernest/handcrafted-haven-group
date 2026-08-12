/**
 * Seeds the demo sellers + products into Supabase. Idempotent (upserts).
 * Run: npm run db:seed
 */
import pg from "pg";

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Missing SUPABASE_DB_URL in .env.local");
  process.exit(1);
}

const sellers = [
  { id: "ada-mensah", name: "Ada Mensah", specialty: "Jewelry", location: "Accra, Ghana", bio: "Hand-formed clay jewelry inspired by West African patterns.", avatar: "/sellers/ada-mensah.webp" },
  { id: "john-kimani", name: "John Kimani", specialty: "Pottery", location: "Nairobi, Kenya", bio: "Wheel-thrown stoneware for everyday rituals.", avatar: "/sellers/john-kimani.webp" },
  { id: "sara-chen", name: "Sara Chen", specialty: "Textiles", location: "Taipei", bio: "Naturally dyed, hand-woven home textiles.", avatar: "/sellers/sara-chen.webp" },
];

const products = [
  { slug: "handmade-clay-earrings", name: "Handmade clay earrings", price: 24, category: "Jewelry", description: "Lightweight polymer-clay earrings, hand-shaped and finished with hypoallergenic hooks.", image: "/products/handmade-clay-earrings.webp", rating: 5, review_count: 42, seller_id: "ada-mensah", featured: true },
  { slug: "ceramic-coffee-mug", name: "Ceramic coffee mug", price: 38, category: "Pottery", description: "Wheel-thrown stoneware mug with a speckled reactive glaze. Holds 12 oz.", image: "/products/ceramic-coffee-mug.webp", rating: 4.5, review_count: 18, seller_id: "john-kimani", featured: true },
  { slug: "hand-woven-basket", name: "Hand-woven basket", price: 55, category: "Textiles", description: "Durable seagrass basket, tightly woven by hand — perfect for storage or plants.", image: "/products/hand-woven-basket.webp", rating: 5, review_count: 67, seller_id: "sara-chen", featured: true },
  { slug: "natural-soy-candle", name: "Natural soy candle", price: 18, category: "Candles", description: "Hand-poured soy wax candle with a cotton wick and warm amber scent. 40-hour burn.", image: "/products/natural-soy-candle.webp", rating: 4.5, review_count: 31, seller_id: "sara-chen", featured: true },
  { slug: "brass-hoop-earrings", name: "Brass hoop earrings", price: 32, category: "Jewelry", description: "Hand-hammered brass hoops with a warm matte finish. Lightweight and everyday-wearable.", image: "/categories/jewelry.webp", rating: 4.5, review_count: 26, seller_id: "ada-mensah", featured: false },
  { slug: "silver-pendant-necklace", name: "Silver pendant necklace", price: 48, category: "Jewelry", description: "Delicate sterling-silver chain with a hand-cast geometric pendant.", image: "/categories/jewelry.webp", rating: 5, review_count: 15, seller_id: "ada-mensah", featured: false },
  { slug: "speckled-stoneware-bowl", name: "Speckled stoneware bowl", price: 42, category: "Pottery", description: "Wheel-thrown serving bowl with a speckled oatmeal glaze. Food-safe and dishwasher-friendly.", image: "/categories/pottery.webp", rating: 4.5, review_count: 22, seller_id: "john-kimani", featured: false },
  { slug: "glazed-ceramic-pitcher", name: "Glazed ceramic pitcher", price: 68, category: "Pottery", description: "Reactive green-glaze pitcher, thrown and trimmed by hand. Holds 1 litre.", image: "/categories/pottery.webp", rating: 5, review_count: 9, seller_id: "john-kimani", featured: false },
  { slug: "indigo-linen-throw", name: "Indigo linen throw", price: 72, category: "Textiles", description: "Naturally indigo-dyed linen throw, hand-loomed with a soft stonewashed finish.", image: "/categories/textiles.webp", rating: 5, review_count: 40, seller_id: "sara-chen", featured: false },
  { slug: "woven-wall-hanging", name: "Woven wall hanging", price: 60, category: "Textiles", description: "Textured wall hanging woven from undyed cotton and terracotta wool on a wooden dowel.", image: "/categories/textiles.webp", rating: 4.5, review_count: 12, seller_id: "sara-chen", featured: false },
  { slug: "lavender-travel-candle", name: "Lavender travel candle", price: 16, category: "Candles", description: "Pocket-sized soy candle in a reusable tin with a calming lavender scent. 20-hour burn.", image: "/categories/candles.webp", rating: 4, review_count: 20, seller_id: "sara-chen", featured: false },
  { slug: "botanical-watercolor-print", name: "Botanical watercolor print", price: 28, category: "Art", description: "Giclée print of an original watercolor botanical study on archival cotton paper. A4 size.", image: "/categories/art.webp", rating: 5, review_count: 8, seller_id: "ada-mensah", featured: false },
  { slug: "ceramic-sculpture-vase", name: "Ceramic sculpture vase", price: 95, category: "Art", description: "One-of-a-kind sculptural vase, hand-built and finished with a matte speckled glaze.", image: "/categories/art.webp", rating: 4.5, review_count: 6, seller_id: "john-kimani", featured: false },
];

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();

  for (const s of sellers) {
    await client.query(
      `insert into public.sellers (id, name, specialty, location, bio, avatar)
       values ($1,$2,$3,$4,$5,$6)
       on conflict (id) do update set
         name=excluded.name, specialty=excluded.specialty, location=excluded.location,
         bio=excluded.bio, avatar=excluded.avatar`,
      [s.id, s.name, s.specialty, s.location, s.bio, s.avatar],
    );
  }

  for (const p of products) {
    await client.query(
      `insert into public.products (slug, name, price, category, description, image, rating, review_count, seller_id, featured)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       on conflict (slug) do update set
         name=excluded.name, price=excluded.price, category=excluded.category,
         description=excluded.description, image=excluded.image, rating=excluded.rating,
         review_count=excluded.review_count, seller_id=excluded.seller_id, featured=excluded.featured`,
      [p.slug, p.name, p.price, p.category, p.description, p.image, p.rating, p.review_count, p.seller_id, p.featured],
    );
  }

  const { rows } = await client.query(
    "select (select count(*) from public.sellers) as sellers, (select count(*) from public.products) as products",
  );
  console.log(`Seeded ✓ sellers: ${rows[0].sellers}, products: ${rows[0].products}`);
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exit(2);
} finally {
  await client.end();
}
