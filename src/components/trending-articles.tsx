import { fetchAPI } from "@/lib/api";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";

export async function TrendingArticles() {
  const articles = await fetchAPI<Article[]>("/articles/trending");

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
