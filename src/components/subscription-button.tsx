"use client";

import { useEffect, useOptimistic, useState, useTransition } from "react";
import { subscribe, unsubscribe } from "@/app/actions/subscription";

function readStatusCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c === "subscribed=1");
}

export function SubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [optimistic, setOptimistic] = useOptimistic(isSubscribed);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsSubscribed(readStatusCookie());
  }, []);

  function handleClick() {
    const next = !optimistic;
    startTransition(async () => {
      setOptimistic(next);
      if (optimistic) {
        await unsubscribe();
      } else {
        await subscribe();
      }
      setIsSubscribed(next);
    });
  }

  if (optimistic) {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        Subscribed
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50"
    >
      Subscribe
    </button>
  );
}
