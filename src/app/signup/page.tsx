import type { Metadata } from 'next';
import SignupForm from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignupPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-2xl bg-tag p-8 shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-graphite">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-graphite-soft">
          Sign up to start selling your handcrafted items.
        </p>
        <SignupForm />
      </div>
    </main>
  );
}