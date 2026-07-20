"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend yet — a real subscribe endpoint belongs to a later card.
    setSubmitted(true);
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-cream-deep/50">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <Mail className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <h2
          id="newsletter-heading"
          className="mt-3 text-2xl font-bold text-graphite sm:text-3xl"
        >
          Get first dibs on new arrivals
        </h2>
        <p className="mx-auto mt-2 max-w-md text-graphite-soft">
          Join our newsletter for fresh handmade finds and artisan stories — no
          spam, ever.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary/10 px-4 py-3 font-semibold text-primary"
          >
            <Check className="h-5 w-5" aria-hidden="true" />
            Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[var(--radius)] border border-primary/20 bg-white px-4 py-3 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            <button
              type="submit"
              className="shrink-0 rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
