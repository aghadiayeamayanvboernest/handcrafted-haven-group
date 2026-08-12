import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Log In',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-2xl bg-tag p-8 shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-graphite">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-graphite-soft">
          Log in to manage your seller profile and listings.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}