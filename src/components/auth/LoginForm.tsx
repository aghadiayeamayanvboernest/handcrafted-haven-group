'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-semibold text-graphite"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-graphite outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-semibold text-graphite"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-graphite outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
      </div>

      <input type="hidden" name="redirectTo" value="/" />

      <button
        type="submit"
        aria-disabled={isPending}
        className="w-full rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {isPending ? 'Logging in…' : 'Log In'}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      <p className="text-center text-sm text-graphite-soft">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}