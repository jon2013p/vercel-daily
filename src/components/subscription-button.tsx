"use client";

import { useEffect, useState, useTransition } from "react";
import {
  subscribe,
  unsubscribe,
  checkSubscription,
} from "@/app/actions/subscription";

export function SubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    checkSubscription().then(setIsSubscribed);
  }, []);

  function handleClick() {
    startTransition(async () => {
      if (isSubscribed) {
        await unsubscribe();
        setIsSubscribed(false);
      } else {
        await subscribe();
        setIsSubscribed(true);
      }
    });
  }

  if (isSubscribed === null) {
    return (
      <span className="inline-block h-9 w-24 animate-pulse rounded-full bg-black/5" />
    );
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
