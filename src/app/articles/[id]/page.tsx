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

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = await params;
  const [article, { isSubscribed }] = await Promise.all([
    getArticle(id),
    getSubscription(),
  ]);

  if (!article) notFound();

  return (
    <article className="w-full bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        {isSubscribed ? (
          <>
            <ArticleHeader article={article} />
            <ArticleFeaturedImage src={article.image} alt={article.title} />
            <ArticleContent content={article.content} tags={article.tags} />
          </>
        ) : (
          <ArticlePaywall article={article} />
        )}
        <TrendingArticles />
      </div>
    </article>
  );
}
