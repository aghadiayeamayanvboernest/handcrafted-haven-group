/**
 * Generates warm, neutral-background placeholder images into /public so the
 * site renders with real image files (not remote deps). Replace any file at
 * the same path with real photography and everything keeps working.
 *
 * Run: node scripts/generate-placeholder-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

// Brand palette
const CREAM = "#FFEEDB";
const LINEN = "#FAF0E6";
const PLACEHOLDER = "#F5E6D3";
const INK = "#C4956A";
const PRIMARY = "#8B5E3C";
const AVATAR = "#E8C99A";

// Simple lucide-style icon paths (stroke), drawn centered in a 24x24 box.
const ICONS = {
  Jewelry: "M6 3h12l4 6-10 13L2 9Z M11 3 8 9l4 13 4-13-3-6 M2 9h20",
  Pottery:
    "M17 8h1a4 4 0 1 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z M6 2v2 M10 2v2 M14 2v2",
  Textiles:
    "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z",
  Candles:
    "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z",
  Art: "M12 2a10 10 0 1 0 0 20 2 2 0 0 0 2-2c0-.51-.2-.98-.53-1.34A2 2 0 0 1 15 15.34h2.5c1.66 0 3-1.34 3-3A9 9 0 0 0 12 2Z",
};

/** Square product placeholder: warm gradient, spotlight, category motif. */
function productSVG(category, size = 800) {
  const c = size / 2;
  const iconScale = size / 24 / 4.5; // icon ~ 22% of frame
  const iconTranslate = c - (24 * iconScale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${LINEN}"/>
        <stop offset="1" stop-color="${PLACEHOLDER}"/>
      </linearGradient>
      <radialGradient id="spot" cx="50%" cy="42%" r="55%">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#bg)"/>
    <rect width="${size}" height="${size}" fill="url(#spot)"/>
    <ellipse cx="${c}" cy="${size * 0.74}" rx="${size * 0.28}" ry="${size * 0.05}" fill="${INK}" opacity="0.12"/>
    <g transform="translate(${iconTranslate} ${iconTranslate - size * 0.04}) scale(${iconScale})"
       fill="none" stroke="${PRIMARY}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
      <path d="${ICONS[category]}"/>
    </g>
    <text x="${c}" y="${size * 0.9}" text-anchor="middle" font-family="Georgia, serif"
      font-size="${size * 0.032}" fill="${PRIMARY}" opacity="0.5" letter-spacing="1">Handcrafted Haven</text>
  </svg>`;
}

/** Circular-ready seller avatar: warm gradient + initials. */
function avatarSVG(initials, size = 400) {
  const c = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="av" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${AVATAR}"/>
        <stop offset="1" stop-color="${PLACEHOLDER}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#av)"/>
    <text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="central"
      font-family="Georgia, serif" font-weight="700" font-size="${size * 0.4}" fill="${PRIMARY}">${initials}</text>
  </svg>`;
}

/** Category tile: warm gradient + large centered category motif. */
function categorySVG(category, width = 600, height = 400) {
  const cx = width / 2;
  const cy = height / 2;
  const iconScale = (height / 24) * 0.42;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${LINEN}"/>
        <stop offset="1" stop-color="${AVATAR}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#cbg)"/>
    <g transform="translate(${cx} ${cy}) scale(${iconScale}) translate(-12 -12)"
       fill="none" stroke="${PRIMARY}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0.75">
      <path d="${ICONS[category]}"/>
    </g>
  </svg>`;
}

/** Wide hero backdrop with a soft arrangement of craft motifs. */
function heroSVG(width = 1600, height = 900) {
  const motifs = ["Pottery", "Jewelry", "Textiles"]
    .map((cat, i) => {
      const x = width * (0.34 + i * 0.18);
      const y = height * (0.5 + (i % 2 === 0 ? -0.06 : 0.06));
      const scale = (height / 24) * 0.5;
      return `<g transform="translate(${x} ${y}) scale(${scale}) translate(-12 -12)"
        fill="none" stroke="${PRIMARY}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6">
        <path d="${ICONS[cat]}"/></g>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="hbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${CREAM}"/>
        <stop offset="1" stop-color="${AVATAR}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#hbg)"/>
    ${motifs}
  </svg>`;
}

async function toWebp(svg, outPath) {
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(outPath);
  console.log("wrote", outPath.replace(root + "/", ""));
}

// Keep these in sync with src/lib/data.ts
const PRODUCTS = [
  { slug: "handmade-clay-earrings", category: "Jewelry" },
  { slug: "ceramic-coffee-mug", category: "Pottery" },
  { slug: "hand-woven-basket", category: "Textiles" },
  { slug: "natural-soy-candle", category: "Candles" },
];
const SELLERS = [
  { id: "ada-mensah", initials: "AM" },
  { id: "john-kimani", initials: "JK" },
  { id: "sara-chen", initials: "SC" },
];

const CATEGORIES = ["Jewelry", "Pottery", "Textiles", "Candles", "Art"];

await mkdir(join(publicDir, "products"), { recursive: true });
await mkdir(join(publicDir, "sellers"), { recursive: true });
await mkdir(join(publicDir, "categories"), { recursive: true });

for (const p of PRODUCTS) {
  await toWebp(productSVG(p.category), join(publicDir, "products", `${p.slug}.webp`));
}
for (const s of SELLERS) {
  await toWebp(avatarSVG(s.initials), join(publicDir, "sellers", `${s.id}.webp`));
}
for (const c of CATEGORIES) {
  await toWebp(categorySVG(c), join(publicDir, "categories", `${c.toLowerCase()}.webp`));
}
await toWebp(heroSVG(), join(publicDir, "hero.webp"));

console.log("Done.");
