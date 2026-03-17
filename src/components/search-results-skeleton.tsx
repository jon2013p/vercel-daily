function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="aspect-video w-full animate-pulse bg-black/5" />
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <div className="h-5 w-20 animate-pulse rounded-full bg-black/5" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-black/5" />
        </div>
        <div className="h-5 w-3/4 animate-pulse rounded bg-black/5" />
        <div className="h-4 w-full animate-pulse rounded bg-black/5" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-black/5" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
