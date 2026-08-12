import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Join Handcrafted Haven to shop and sell handmade goods.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/" } = await searchParams;

  const session = await auth();
  if (session?.user) redirect(callbackUrl);

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div className="rounded-[var(--radius)] border border-primary/10 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-graphite">
          Create your account
        </h1>
        <p className="mt-2 text-center text-graphite-soft">
          Join Handcrafted Haven to shop and start selling.
        </p>
        <RegisterForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
