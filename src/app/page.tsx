import { Suspense } from "react";
import { Banner } from "@/components/banner";
import { Hero } from "@/components/hero";
import { FeaturedArticles } from "@/components/featured-articles";

function BannerSkeleton() {
  return (
    <div className="w-full bg-black px-4 py-3">
      <div className="mx-auto flex items-center justify-center gap-3">
        <div className="h-5 w-16 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-64 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-6">
          <div className="h-4 w-32 animate-pulse rounded bg-black/5" />
          <div className="space-y-3">
            <div className="h-10 w-full animate-pulse rounded bg-black/5" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-black/5" />
          </div>
          <div className="h-5 w-full max-w-lg animate-pulse rounded bg-black/5" />
          <div className="flex gap-4 pt-2">
            <div className="h-10 w-36 animate-pulse rounded-full bg-black/5" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-black/5" />
          </div>
        </div>
        <div className="aspect-4/3 w-full animate-pulse rounded-2xl bg-black/5" />
      </div>
    </section>
  );
}

function FeaturedArticlesSkeleton() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 h-8 w-48 animate-pulse rounded bg-black/5" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-black/10"
            >
              <div className="aspect-video w-full animate-pulse bg-black/5" />
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-20 animate-pulse rounded-full bg-black/5" />
                  <div className="h-4 w-24 animate-pulse rounded-full bg-black/5" />
                </div>
                <div className="h-5 w-3/4 animate-pulse rounded bg-black/5" />
                <div className="h-4 w-full animate-pulse rounded bg-black/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <main>
        <Suspense fallback={<BannerSkeleton />}>
          <Banner />
        </Suspense>
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <FeaturedArticles />
        </Suspense>
      </main>
    </div>
  );
}
