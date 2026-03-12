import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-black/40">
            The Vercel Daily
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
            News and insights for modern web developers.
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-black/60">
            Changelogs, engineering deep dives, customer stories, and community
            updates - all in one place.
          </p>
          <div className="flex gap-4 pt-2">
            <Button href="/search">Browse Articles</Button>
            <Button href="/subscribe" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-black/5">
          <Image
            src="/daily-preview-logo.png"
            alt="Featured story"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
