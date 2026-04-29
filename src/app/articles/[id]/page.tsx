import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { fetchAPI } from "@/lib/api";
import { getSubscription } from "@/lib/subscription";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Article } from "@/lib/types";
import { ArticleGate } from "@/components/article-gate";
import { TrendingArticles } from "@/components/trending-articles";

type Params = Promise<{ id: string }>;

async function getArticle(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`article-${id}`);

  try {
    return await fetchAPI<Article>(`/articles/${id}`);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

async function ArticleView({ params }: { params: Params }) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const { isSubscribed } = await getSubscription();

  return <ArticleGate article={article} isSubscribed={isSubscribed} />;
}

async function TrendingWithExclusion({ params }: { params: Params }) {
  const { id } = await params;
  return <TrendingArticles excludeId={id} />;
}

export default function ArticlePage({ params }: { params: Params }) {
  return (
    <article className="w-full bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-6">
              <div className="h-6 w-24 rounded-full bg-black/5" />
              <div className="h-10 w-3/4 rounded bg-black/5" />
              <div className="h-4 w-48 rounded bg-black/5" />
              <div className="aspect-video w-full rounded-2xl bg-black/5" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-black/5" />
                <div className="h-4 w-full rounded bg-black/5" />
                <div className="h-4 w-2/3 rounded bg-black/5" />
              </div>
            </div>
          }
        >
          <ArticleView params={params} />
        </Suspense>
        <Suspense
          fallback={
            <div className="mt-16 animate-pulse space-y-6">
              <div className="h-8 w-48 rounded bg-black/5" />
              <div className="grid gap-8 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-black/10"
                  >
                    <div className="aspect-video w-full bg-black/5" />
                    <div className="space-y-3 p-5">
                      <div className="h-4 w-20 rounded-full bg-black/5" />
                      <div className="h-5 w-3/4 rounded bg-black/5" />
                      <div className="h-4 w-full rounded bg-black/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <TrendingWithExclusion params={params} />
        </Suspense>
      </div>
    </article>
  );
}
