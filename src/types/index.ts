export type Category =
  | "Jewelry"
  | "Pottery"
  | "Textiles"
  | "Candles"
  | "Art";

export interface Seller {
  id: string;
  name: string;
  specialty: Category;
  location: string;
  productCount: number;
  bio: string;
  /** Path under /public, e.g. "/sellers/ada-mensah.webp". */
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // USD
  category: Category;
  rating: number; // average, 0–5
  reviewCount: number;
  sellerId: string;
  description: string;
  /** Path under /public, e.g. "/products/ceramic-coffee-mug.webp". */
  image: string;
  featured?: boolean;
}
