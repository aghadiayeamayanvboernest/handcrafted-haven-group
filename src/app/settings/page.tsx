import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserProfile } from "@/lib/db";
import ProfileForm from "@/components/settings/ProfileForm";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Handcrafted Haven profile and password.",
};

export default async function SettingsPage() {
  const session = await auth();
  const username = session?.user?.email;
  if (!username) redirect("/login?callbackUrl=/settings");

  const profile = (await getUserProfile(username)) ?? {
    username,
    name: session.user?.name ?? "",
    location: "",
    bio: "",
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-graphite sm:text-4xl">Settings</h1>
      <p className="mt-2 text-graphite-soft">
        Manage your profile and account.
      </p>

      <section
        aria-labelledby="profile-heading"
        className="mt-10 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 id="profile-heading" className="text-xl font-bold text-graphite">
          Profile
        </h2>
        <p className="mt-1 text-sm text-graphite-soft">
          Your name, location, and bio appear on your public seller page.
        </p>
        <div className="mt-6">
          <ProfileForm profile={profile} />
        </div>
      </section>

      <section
        aria-labelledby="password-heading"
        className="mt-8 rounded-[var(--radius)] border border-primary/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 id="password-heading" className="text-xl font-bold text-graphite">
          Change password
        </h2>
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </section>
    </div>
  );
}
