import { fetchAPI } from "@/lib/api";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";

function matchesQuery(article: Article, query: string): boolean {
  const q = query.toLowerCase();
  return (
    article.title.toLowerCase().includes(q) ||
    article.excerpt.toLowerCase().includes(q) ||
    article.category.toLowerCase().includes(q) ||
    article.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export async function SearchResults({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const params: Record<string, string> = {};
  if (category) params.category = category;

  const articles = await fetchAPI<Article[]>("/articles", params);

  const filtered = query
    ? articles.filter((a) => matchesQuery(a, query))
    : articles;

  const displayed = filtered.slice(0, 5);

  if (displayed.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-black/60">
          No articles found for your search.
        </p>
        <p className="mt-2 text-sm text-black/40">
          Try a different query or category.
        </p>
      </div>
    );
  }

  const isDefault = !query && !category;

  return (
    <div>
      {isDefault && (
        <p className="mb-6 text-sm text-black/40">
          Showing recent articles. Use the search to find something specific.
        </p>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
