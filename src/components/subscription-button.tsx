"use client";

import { useSubscription } from "@/components/subscription-provider";
import { Spinner } from "@/components/spinner";

export function SubscriptionButton() {
  const { isSubscribed, isPending, subscribe, unsubscribe } = useSubscription();

  if (isSubscribed) {
    return (
      <button
        onClick={unsubscribe}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
      >
        {isPending && <Spinner className="size-4" />}
        Unsubscribe
      </button>
    );
  }

  return (
    <button
      onClick={subscribe}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50"
    >
      {isPending && <Spinner className="size-4" />}
      Subscribe
    </button>
  );
}
