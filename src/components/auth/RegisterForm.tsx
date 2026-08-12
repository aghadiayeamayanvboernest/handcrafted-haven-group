"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { registerAction } from "@/app/actions/auth";
import PasswordField from "@/components/auth/PasswordField";

export default function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, action, pending] = useActionState(registerAction, undefined);

  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state?.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-graphite">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-semibold text-graphite">
          Location <span className="font-normal text-graphite-soft">(optional)</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          autoComplete="address-level2"
          placeholder="e.g. Accra, Ghana"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-semibold text-graphite">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          pattern="[a-zA-Z0-9_@.\-]{3,20}"
          title="3–20 characters: letters, numbers, or _ @ . -"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <p className="mt-1 text-xs text-graphite-soft">
          3–20 characters — letters, numbers, or _ @ . -
        </p>
      </div>

      <PasswordField
        id="password"
        label="Password"
        autoComplete="new-password"
        minLength={6}
        helpText="At least 6 characters."
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[var(--radius)] bg-primary px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-graphite-soft">
        Already have an account?{" "}
        <Link
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
