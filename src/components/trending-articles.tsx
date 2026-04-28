import { cacheLife, cacheTag } from "next/cache";
import { fetchAPI } from "@/lib/api";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";

async function getTrendingArticles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("trending");

  return fetchAPI<Article[]>("/articles/trending");
}

export async function TrendingArticles({
  excludeId,
}: {
  excludeId?: string;
}) {
  const allArticles = await getTrendingArticles();
  const articles = excludeId
    ? allArticles.filter((a) => a.id !== excludeId)
    : allArticles;

  if (!articles.length) return null;

  return (
    <section className="w-full bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-black">
          Trending Now
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
