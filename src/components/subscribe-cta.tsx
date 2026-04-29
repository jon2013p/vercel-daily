"use client";

import { useSubscription } from "@/components/subscription-provider";
import { Spinner } from "@/components/spinner";

export function SubscribeCTA() {
  const { isSubscribed, isPending, subscribe, unsubscribe } = useSubscription();

  return (
    <div className="mt-12 rounded-2xl border border-black/10 bg-black p-8 text-center sm:p-10">
      <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
        Stay up to date
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-white/60">
        Get the latest articles, changelogs, and engineering deep dives.
        Subscribe to unlock full access.
      </p>
      {isSubscribed ? (
        <button
          onClick={unsubscribe}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
        >
          {isPending && <Spinner className="size-4 border-white/30 border-t-white" />}
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={subscribe}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-50"
        >
          {isPending && <Spinner className="size-4" />}
          Subscribe to Vercel Daily
        </button>
      )}
    </div>
  );
}
