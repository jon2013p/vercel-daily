"use client";

import Link from "next/link";

export default function ArticleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-black">
        Unable to load article
      </h2>
      <p className="mt-2 max-w-md text-black/60">
        Something went wrong while fetching this article. It may have been
        removed or the server is temporarily unavailable.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full bg-black/5 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/10"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
