import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to Handcrafted Haven to shop and sell handmade goods.",
};

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-5 6.7-5Z" />
    </svg>
  );
}

const AUTH_ERRORS: Record<string, string> = {
  OAuthSignin: "Could not start sign-in. Please try again.",
  OAuthCallback: "Sign-in was cancelled or failed. Please try again.",
  Configuration:
    "Sign-in is not fully configured yet. An OAuth app credential is missing.",
  AccessDenied: "Access was denied. Please try a different account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl = "/", error } = await searchParams;

  // Already signed in? Send them where they were going.
  const session = await auth();
  if (session?.user) redirect(callbackUrl);

  const errorMessage = error
    ? AUTH_ERRORS[error] ?? "Something went wrong signing in. Please try again."
    : null;

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="rounded-[var(--radius)] border border-primary/10 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-graphite">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-graphite-soft">
          Sign in to shop and sell handcrafted treasures.
        </p>

        {errorMessage && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        )}

        <div className="mt-8 space-y-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: callbackUrl });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-[var(--radius)] bg-graphite px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-graphite/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <GitHubMark />
              Continue with GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: callbackUrl });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-[var(--radius)] border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <GoogleMark />
              Continue with Google
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-graphite-soft">
          By continuing you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
