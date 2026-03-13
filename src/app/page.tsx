import { Banner } from "@/components/banner";
import { Hero } from "@/components/hero";
import { FeaturedArticles } from "@/components/featured-articles";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <Hero />
        <FeaturedArticles />
      </main>
    </div>
  );
}
