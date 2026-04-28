import { cacheLife } from "next/cache";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/components/subscription-button";

export async function Hero() {
  "use cache";
  cacheLife("days");

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <span className="text-sm font-semibold uppercase tracking-widest text-black/40">
          The Vercel Daily
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
          News and insights for modern web developers.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-black/60">
          Changelogs, engineering deep dives, customer stories, and community
          updates &mdash; all in one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button href="/search">Browse Articles</Button>
          <SubscriptionButton />
        </div>
      </div>
    </section>
  );
}
