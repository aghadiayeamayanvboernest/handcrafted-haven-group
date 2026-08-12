"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { setQtyAction, removeFromCartAction } from "@/app/actions/cart";

export default function CartControls({
  slug,
  quantity,
}: {
  slug: string;
  quantity: number;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function change(next: number) {
    startTransition(async () => {
      await setQtyAction(slug, next);
      router.refresh();
    });
  }
  function remove() {
    startTransition(async () => {
      await removeFromCartAction(slug);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center rounded-full border border-primary/20">
        <button
          type="button"
          onClick={() => change(quantity - 1)}
          disabled={pending}
          aria-label="Decrease quantity"
          className="flex h-8 w-8 items-center justify-center rounded-full text-graphite hover:bg-cream-deep disabled:opacity-50"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-graphite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => change(quantity + 1)}
          disabled={pending}
          aria-label="Increase quantity"
          className="flex h-8 w-8 items-center justify-center rounded-full text-graphite hover:bg-cream-deep disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        aria-label="Remove item"
        className="text-graphite-soft transition-colors hover:text-red-700 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
