"use client";

import { useSubscription } from "@/components/subscription-provider";

export function SubscriptionButton() {
  const { isSubscribed, isPending, subscribe, unsubscribe } = useSubscription();

  if (isSubscribed) {
    return (
      <button
        onClick={unsubscribe}
        disabled={isPending}
        className="rounded-full bg-black/5 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        Subscribed
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      disabled={isPending}
      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50"
    >
      Subscribe
    </button>
  );
}
