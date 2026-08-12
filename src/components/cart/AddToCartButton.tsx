"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Check } from "lucide-react";
import { addToCartAction } from "@/app/actions/cart";

export default function AddToCartButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    startTransition(async () => {
      const res = await addToCartAction(slug);
      if (res.needsLogin) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }
      setAdded(true);
      router.refresh();
      setTimeout(() => setAdded(false), 1600);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 ${className}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {pending ? "Adding…" : "Add to cart"}
        </>
      )}
    </button>
  );
}
