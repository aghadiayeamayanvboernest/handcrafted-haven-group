"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { updateProfileAction } from "@/app/actions/profile";
import type { UserProfile } from "@/lib/db";

export default function ProfileForm({ profile }: { profile: UserProfile }) {
  const [state, action, pending] = useActionState(updateProfileAction, undefined);

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
        <label htmlFor="p-username" className="block text-sm font-semibold text-graphite">
          Username
        </label>
        <input
          id="p-username"
          type="text"
          value={profile.username}
          disabled
          className="mt-1 w-full cursor-not-allowed rounded-[var(--radius)] border border-primary/10 bg-cream-deep/40 px-4 py-2.5 text-graphite-soft"
        />
        <p className="mt-1 text-xs text-graphite-soft">Usernames can&apos;t be changed.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-graphite">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={profile.name}
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-semibold text-graphite">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={profile.location}
          placeholder="e.g. Accra, Ghana"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-semibold text-graphite">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={profile.bio}
          placeholder="Tell shoppers a little about you and your craft…"
          className="mt-1 w-full rounded-[var(--radius)] border border-primary/20 bg-cream/40 px-4 py-2.5 text-graphite placeholder:text-graphite-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <p className="mt-1 text-xs text-graphite-soft">
          Shown on your public seller page.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius)] bg-primary px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
