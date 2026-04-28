import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";

export async function FeaturedArticles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("articles");

  const articles = await fetchAPI<Article[]>("/articles");

  const displayed = articles.slice(0, 6);

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Latest Articles
          </h2>
          <Link
            href="/search"
            className="text-sm font-medium text-black/60 transition-colors hover:text-black"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
