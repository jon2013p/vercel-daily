import { Button } from "@/components/ui/button";

export function SubscribeCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-black/10 bg-black p-8 text-center sm:p-10">
      <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
        Stay up to date
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-white/60">
        Get the latest articles, changelogs, and engineering deep dives
        delivered straight to your inbox.
      </p>
      <Button href="/subscribe" variant="secondary" className="border-white/20 bg-white text-black hover:bg-white/90">
        Subscribe to Vercel Daily
      </Button>
    </div>
  );
}
