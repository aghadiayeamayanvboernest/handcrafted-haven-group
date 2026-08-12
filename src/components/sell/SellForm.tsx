"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, UploadCloud, X, Star, AlertCircle } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { addStoredListing, updateStoredListing } from "@/lib/listings";
import type { Category, Product } from "@/types";

interface SellFormProps {
  initialProduct?: Product | null;
  onCancelEdit?: () => void;
  onSuccess?: () => void;
}

/** Read a File into a data URL so it can be stored + rendered directly. */
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function SellForm({ initialProduct, onCancelEdit, onSuccess }: SellFormProps) {
  const [title, setTitle] = useState(initialProduct?.name ?? "");
  const [category, setCategory] = useState<Category | "">(initialProduct?.category ?? "");
  const [price, setPrice] = useState(initialProduct ? String(initialProduct.price) : "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [images, setImages] = useState<string[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : initialProduct?.image
      ? [initialProduct.image]
      : []
  );

  const [created, setCreated] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(String(initialProduct.price));
      setDescription(initialProduct.description);
      setImages(
        initialProduct.images && initialProduct.images.length > 0
          ? initialProduct.images
          : initialProduct.image
          ? [initialProduct.image]
          : []
      );
      setCreated(null);
      setErrorMsg(null);
    }
  }, [initialProduct]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setSaving(true);
    try {
      const readPromises = Array.from(files).map((f) => readFileAsDataUrl(f));
      const newImages = await Promise.all(readPromises);
      setImages((prev) => [...prev, ...newImages]);
    } catch {
      setErrorMsg("Failed to read image file(s). Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleMakePrimary(index: number) {
    if (index === 0) return;
    setImages((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg(null);

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();
    const numericPrice = parseFloat(price);

    if (!trimmedTitle) {
      setErrorMsg("Item name is required.");
      return;
    }
    if (!category) {
      setErrorMsg("Please select a category.");
      return;
    }
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setErrorMsg("Price must be a positive number.");
      return;
    }
    if (!trimmedDesc) {
      setErrorMsg("Description is required.");
      return;
    }

    setSaving(true);

    const fallbackCategoryImg = category ? `/categories/${category.toLowerCase()}.webp` : "/categories/art.webp";
    const finalImages = images.length > 0 ? images : [fallbackCategoryImg];
    const primaryImage = finalImages[0];

    try {
      let resultProduct: Product | undefined;
      if (initialProduct) {
        resultProduct = updateStoredListing(initialProduct.slug, {
          name: trimmedTitle,
          category: category as Category,
          price: numericPrice,
          description: trimmedDesc,
          image: primaryImage,
          images: finalImages,
        });
      } else {
        resultProduct = addStoredListing({
          name: trimmedTitle,
          category: category as Category,
          price: numericPrice,
          description: trimmedDesc,
          image: primaryImage,
          images: finalImages,
        });
      }

      setSaving(false);
      if (resultProduct) {
        setCreated(resultProduct);
        if (onSuccess) onSuccess();
      } else {
        setErrorMsg("Could not update listing.");
      }
    } catch {
      setSaving(false);
      setErrorMsg("An unexpected error occurred while saving.");
    }
  }

  function resetForm() {
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImages([]);
    setCreated(null);
    setErrorMsg(null);
  }

  if (created && !initialProduct) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius)] border border-primary/10 bg-white p-8 text-center shadow-sm"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-graphite">
          Your listing is live!
        </h2>
        <p className="mt-2 text-graphite-soft">
          <strong>{created.name}</strong> has been added with {created.images?.length ?? 1} photo(s).
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/products/${created.slug}`}
            className="rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View your listing
          </Link>
          <Link
            href="/browse"
            className="rounded-[var(--radius)] border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go to Browse
          </Link>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="mt-4 text-sm font-semibold text-graphite-soft underline hover:text-primary"
        >
          List another item
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-8"
      aria-label={initialProduct ? "Edit listing" : "List an item"}
    >
      {initialProduct && (
        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
          <h3 className="font-heading text-lg font-bold text-graphite">
            Editing: {initialProduct.name}
          </h3>
          {onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="text-xs font-semibold text-graphite-soft hover:text-primary underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="title" className="block text-sm font-semibold text-graphite">
            Item name
          </label>
          <span className="text-xs text-graphite-soft">{title.length}/100</span>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          maxLength={100}
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Hand-thrown ceramic mug"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-graphite">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <option value="" disabled>
              Choose a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-graphite">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="description" className="block text-sm font-semibold text-graphite">
            Description
          </label>
          <span className="text-xs text-graphite-soft">{description.length}/1000</span>
        </div>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={1000}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your item, the materials, and how it's made…"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <span className="block text-sm font-semibold text-graphite">
            Product photos ({images.length})
          </span>
          <span className="text-xs text-graphite-soft">First photo is cover image</span>
        </div>

        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((img, idx) => (
              <div
                key={`${idx}-${img.slice(0, 20)}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-primary/20 bg-cream/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Product upload ${idx + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Cover badge */}
                {idx === 0 ? (
                  <span className="absolute top-1 left-1 inline-flex items-center gap-1 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    <Star className="h-3 w-3 fill-current" /> Cover
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMakePrimary(idx)}
                    className="absolute top-1 left-1 hidden rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white group-hover:block hover:bg-primary"
                  >
                    Set cover
                  </button>
                )}

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  aria-label="Remove photo"
                  className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          htmlFor="photos"
          className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] border border-dashed border-primary/30 bg-cream/40 px-4 py-6 text-center text-graphite-soft transition-colors hover:border-primary hover:text-primary"
        >
          <UploadCloud className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-semibold">
            {images.length > 0 ? "Add more photos" : "Click to upload photos"}
          </span>
          <span className="text-xs">PNG, JPG or WEBP, multiple files supported</span>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>

      <div className="flex gap-3 pt-2">
        {initialProduct && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 rounded-[var(--radius)] border border-primary/30 px-6 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-cream-deep"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
        >
          {saving
            ? "Saving…"
            : initialProduct
            ? "Update listing"
            : "Publish listing"}
        </button>
      </div>
    </form>
  );
}
