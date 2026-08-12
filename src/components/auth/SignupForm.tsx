'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerUser, type SignupState } from '@/lib/actions';

export default function SignupForm() {
  const initialState: SignupState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-graphite">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Jane Artisan"
          className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-graphite outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name?.map((error) => (
            <p className="mt-1 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-graphite">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-graphite outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-describedby="email-error"
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email?.map((error) => (
            <p className="mt-1 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-graphite">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-graphite outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-describedby="password-error"
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password?.map((error) => (
            <p className="mt-1 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <button
        type="submit"
        aria-disabled={isPending}
        className="w-full rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isPending ? 'Creating account…' : 'Sign Up'}
      </button>

      {state.message && (
        <p className="text-sm text-red-600" aria-live="polite">
          {state.message}
        </p>
      )}

      <p className="text-center text-sm text-graphite-soft">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}