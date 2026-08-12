import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import ReviewForm from "@/components/product/ReviewForm";
import type { Review } from "@/lib/db";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function ReviewsSection({
  slug,
  reviews,
  canReview,
}: {
  slug: string;
  reviews: Review[];
  canReview: boolean;
}) {
  const count = reviews.length;
  const avg =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mt-16 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="reviews-heading" className="text-2xl font-bold text-graphite">
          Reviews
        </h2>
        {count > 0 && (
          <span className="flex items-center gap-2 text-sm text-graphite-soft">
            <StarRating rating={Math.round(avg * 10) / 10} />
            {(Math.round(avg * 10) / 10).toFixed(1)} · {count}{" "}
            {count === 1 ? "review" : "reviews"}
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* List */}
        <div>
          {count === 0 ? (
            <p className="text-graphite-soft">
              No reviews yet — be the first to share your thoughts.
            </p>
          ) : (
            <ul className="space-y-5">
              {reviews.map((r) => (
                <li key={r.id} className="border-b border-primary/10 pb-5 last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body font-semibold text-graphite">
                      {r.username}
                    </span>
                    <span className="text-xs text-graphite-soft">
                      {dateFmt.format(new Date(r.createdAt))}
                    </span>
                  </div>
                  <div className="mt-1">
                    <StarRating rating={r.rating} />
                  </div>
                  {r.comment && (
                    <p className="mt-2 text-sm text-graphite-soft">{r.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Form or sign-in prompt */}
        <div>
          {canReview ? (
            <ReviewForm slug={slug} />
          ) : (
            <div className="rounded-[var(--radius)] border border-dashed border-primary/20 p-6 text-center">
              <p className="text-graphite-soft">
                <Link
                  href={`/login?callbackUrl=/products/${slug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </Link>{" "}
                to write a review.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
