"use client";

import { useState } from "react";
import { Check, UploadCloud } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export default function SellForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend yet — persisting listings needs a database (future card).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius)] border border-primary/10 bg-white p-8 text-center shadow-sm"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-graphite">
          Listing submitted!
        </h2>
        <p className="mt-2 text-graphite-soft">
          Thanks — your item has been received. (This is a demo; listings
          aren&apos;t saved yet.)
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
        <label htmlFor="photo" className="block text-sm font-semibold text-graphite">
          Product photo
        </label>
        <label
          htmlFor="photo"
          className="mt-1 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-primary/30 bg-cream/40 px-4 py-8 text-center text-graphite-soft transition-colors hover:border-primary hover:text-primary"
        >
          <UploadCloud className="h-6 w-6" aria-hidden="true" />
          <span className="text-sm font-semibold">
            Click to upload a photo
          </span>
          <span className="text-xs">PNG, JPG or WEBP, up to 5MB</span>
        </label>
        <input id="photo" name="photo" type="file" accept="image/*" className="sr-only" />
      </div>

      <button
        type="submit"
        className="w-full rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Publish listing
      </button>
    </form>
  );
}
