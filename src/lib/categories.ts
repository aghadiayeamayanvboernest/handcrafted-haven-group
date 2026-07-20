import { Gem, Coffee, Shirt, Flame, Palette, type LucideIcon } from "lucide-react";
import type { Category } from "@/types";

/** Icon used for a category's tinted placeholder box (matches wireframe). */
export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Jewelry: Gem,
  Pottery: Coffee,
  Textiles: Shirt,
  Candles: Flame,
  Art: Palette,
};

/** Ordered category list for the homepage chip row. */
export const CATEGORIES: Category[] = [
  "Jewelry",
  "Pottery",
  "Textiles",
  "Candles",
  "Art",
];

/** Two-letter initials from a name, e.g. "Ada Mensah" -> "AM". */
export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
