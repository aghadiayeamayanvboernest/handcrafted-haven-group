"use client";

import { useActionState, useState } from "react";
import { Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { addReviewAction } from "@/app/actions/reviews";

export default function ReviewForm({ slug }: { slug: string }) {
  const [state, action, pending] = useActionState(addReviewAction, undefined);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <form action={action} className="rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-graphite">Write a review</h3>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="rating" value={rating} />

      {state?.error && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="mt-4 flex items-start gap-2 rounded-[var(--radius)] bg-primary/10 p-3 text-sm font-semibold text-primary">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.success}
        </p>
      )}

      <div className="mt-4">
        <span className="block text-sm font-semibold text-graphite">Your rating</span>
        <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="rounded p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Star
                className={`h-7 w-7 ${
                  n <= (hover || rating) ? "fill-accent text-accent" : "text-accent/30"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="comment" className="block text-sm font-semibold text-graphite">
          Your review <span className="font-normal text-graphite-soft">(optional)</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          placeholder="What did you think of this item?"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-[var(--radius)] bg-primary px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
