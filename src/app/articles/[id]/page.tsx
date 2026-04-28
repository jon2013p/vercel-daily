import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";
import { fetchAPI } from "@/lib/api";
import { getSubscription } from "@/lib/subscription";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Article } from "@/lib/types";
import { ArticleHeader } from "@/components/article-header";
import { ArticleFeaturedImage } from "@/components/article-featured-image";
import { ArticleContent } from "@/components/article-content";
import { ArticlePaywall } from "@/components/article-paywall";
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
  const reqHeaders = await headers();
  const status = reqHeaders.get("x-subscription-status");

  const article = await getArticle(id);
  if (!article) notFound();

  if (status === "anonymous") {
    return <ArticlePaywall article={article} />;
  }

  const { isSubscribed } = await getSubscription();

  if (isSubscribed) {
    return (
      <>
        <ArticleHeader article={article} />
        <ArticleFeaturedImage src={article.image} alt={article.title} />
        <ArticleContent content={article.content} tags={article.tags} />
      </>
    );
  }

  return <ArticlePaywall article={article} />;
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = await params;

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
          <TrendingArticles excludeId={id} />
        </Suspense>
      </div>
    </article>
  );
}
