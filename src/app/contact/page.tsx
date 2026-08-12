import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Handcrafted Haven team.",
};

const DETAILS = [
  { Icon: Mail, label: "Email", value: "hello@handcraftedhaven.com" },
  { Icon: MapPin, label: "Address", value: "Rexburg, Idaho, USA" },
  { Icon: Clock, label: "Support hours", value: "Mon–Fri, 9am–5pm MST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're here to help"
        title="Get in touch"
        subtitle="Questions, feedback, or need a hand with an order? We'd love to hear from you."
        image="/categories/textiles.webp"
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Details */}
          <aside className="md:col-span-2">
            <h2 className="text-xl font-bold text-graphite">Contact details</h2>
            <ul className="mt-6 space-y-5">
              {DETAILS.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tag text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-graphite">{label}</p>
                    <p className="text-graphite-soft">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Form card */}
          <form
            aria-label="Contact form"
            className="space-y-4 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm md:col-span-3 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-graphite">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-graphite">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-graphite">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-graphite">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[var(--radius)] bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
