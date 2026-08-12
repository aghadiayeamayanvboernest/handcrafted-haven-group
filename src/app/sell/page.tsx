import type { Metadata } from "next";
import { auth } from "@/auth";
import PageHeader from "@/components/layout/PageHeader";
import SellContainer from "@/components/sell/SellContainer";

export const metadata: Metadata = {
  title: "Sell",
  description: "Start selling your handcrafted items on Handcrafted Haven.",
};

export default async function SellPage() {
  // Route is auth-protected by middleware, so a session is guaranteed here.
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <>
      <PageHeader
        eyebrow="Sell on Handcrafted Haven"
        title={firstName ? `Welcome, ${firstName}` : "Start selling"}
        subtitle="Turn your craft into a storefront. List an item below to get started."
        image="/hero.webp"
      />

      <SellContainer />
    </>
  );
}
