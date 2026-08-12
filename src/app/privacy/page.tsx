import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Handcrafted Haven collects, uses, and protects your data.",
};

const SECTIONS = [
  {
    heading: "Overview",
    body: "Handcrafted Haven respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. This is a student project and the policy is provided for demonstration purposes.",
  },
  {
    heading: "Information we collect",
    list: [
      "Account details — when you sign in with Google or GitHub, we receive your name, email, and profile photo.",
      "Usage data — basic, non-identifying analytics about how the site is used.",
    ],
  },
  {
    heading: "How we use your information",
    body: "We use your information to provide and improve the marketplace, personalize your experience, and keep your account secure. We do not sell your personal data.",
  },
  {
    heading: "Your choices",
    body: "You can sign out at any time, and you may request that we remove your account information by contacting us.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Last updated: July 2026"
        title="Privacy policy"
        subtitle="Your trust matters. Here's how we handle your information."
        image="/categories/art.webp"
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-graphite">
                {section.heading}
              </h2>
              {section.body && (
                <p className="mt-2 text-graphite-soft">{section.body}</p>
              )}
              {section.list && (
                <ul className="mt-2 space-y-2 text-graphite-soft">
                  {section.list.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-xl font-bold text-graphite">Contact</h2>
            <p className="mt-2 text-graphite-soft">
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:hello@handcraftedhaven.com"
                className="font-semibold text-primary hover:underline"
              >
                hello@handcraftedhaven.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
