"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, UploadCloud } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { createListingAction } from "@/app/actions/listings";

export default function SellForm() {
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [createdName, setCreatedName] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("title") ?? "");

    const result = await createListingAction(data);
    setSaving(false);

    if (result.ok) {
      setCreatedName(name);
      setCreatedSlug(result.slug);
      setPreview(null);
      form.reset();
    } else {
      setError(result.error);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  if (createdSlug) {
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
          <strong>{createdName}</strong> was published to the marketplace —
          anyone can see it now.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/products/${createdSlug}`}
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
          onClick={() => setCreatedSlug(null)}
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
      aria-label="List an item"
    >
      {error && (
        <p role="alert" className="rounded-[var(--radius)] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-graphite">
          Item name
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
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
            defaultValue=""
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
            min="1"
            step="0.01"
            required
            placeholder="0.00"
            className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-graphite">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          placeholder="Describe your item, the materials, and how it's made…"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <span className="block text-sm font-semibold text-graphite">
          Product photo
        </span>
        <label
          htmlFor="photo"
          className="mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] border border-dashed border-primary/30 bg-cream/40 px-4 py-8 text-center text-graphite-soft transition-colors hover:border-primary hover:text-primary"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Selected product preview"
              className="max-h-48 w-auto rounded-md object-contain"
            />
          ) : (
            <>
              <UploadCloud className="h-6 w-6" aria-hidden="true" />
              <span className="text-sm font-semibold">Click to upload a photo</span>
              <span className="text-xs">PNG, JPG or WEBP, up to 5MB</span>
            </>
          )}
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {saving ? "Publishing…" : "Publish listing"}
      </button>
    </form>
  );
}
