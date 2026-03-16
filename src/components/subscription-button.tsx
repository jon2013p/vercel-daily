"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { subscribe, unsubscribe } from "@/app/actions/subscription";

export function SubscriptionButton({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      if (isSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }
      router.refresh();
    });
  }

  if (isSubscribed) {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        {isPending ? "..." : "Subscribed"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50"
    >
      {isPending ? "..." : "Subscribe"}
    </button>
  );
}
