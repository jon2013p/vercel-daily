"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-black">Something went wrong</h2>
      <p className="mt-2 max-w-md text-black/60">
        We couldn&apos;t load this page. This might be a temporary issue — try
        again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
      >
        Try again
      </button>
    </div>
  );
}
