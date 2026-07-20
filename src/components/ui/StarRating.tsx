import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  /** Average rating, 0–5. */
  rating: number;
  /** Optional review count shown next to the stars. */
  reviewCount?: number;
  className?: string;
}

/**
 * Renders 5 stars filled to `rating`, with an accessible text label.
 * The stars themselves are decorative; screen readers get the label.
 */
export default function StarRating({
  rating,
  reviewCount,
  className = "",
}: StarRatingProps) {
  const label =
    `Rated ${rating} out of 5` +
    (reviewCount !== undefined ? `, ${reviewCount} reviews` : "");

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="flex text-accent" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const position = i + 1;
          if (rating >= position) {
            return <Star key={i} className="h-3.5 w-3.5 fill-current" />;
          }
          if (rating >= position - 0.5) {
            return <StarHalf key={i} className="h-3.5 w-3.5 fill-current" />;
          }
          return <Star key={i} className="h-3.5 w-3.5 text-accent/30" />;
        })}
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-graphite-soft" aria-hidden="true">
          ({reviewCount})
        </span>
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
