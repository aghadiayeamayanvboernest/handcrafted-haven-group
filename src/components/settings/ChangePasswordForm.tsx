"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { changePasswordAction } from "@/app/actions/profile";
import PasswordField from "@/components/auth/PasswordField";

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, undefined);

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p role="alert" className="flex items-start gap-2 rounded-[var(--radius)] bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="flex items-start gap-2 rounded-[var(--radius)] bg-primary/10 p-3 text-sm font-semibold text-primary">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.success}
        </p>
      )}

      <div>
        <label htmlFor="current" className="block text-sm font-semibold text-graphite">
          Current password
        </label>
        <input
          id="current"
          name="current"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <PasswordField
        id="password"
        label="New password"
        autoComplete="new-password"
        minLength={6}
        helpText="At least 6 characters."
      />

      <div>
        <label htmlFor="confirm" className="block text-sm font-semibold text-graphite">
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius)] bg-primary px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {pending ? "Updating…" : "Change password"}
      </button>
    </form>
  );
}
