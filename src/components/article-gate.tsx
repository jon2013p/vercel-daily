"use client";

import { useSubscription } from "@/components/subscription-provider";
import { ArticleHeader } from "@/components/article-header";
import { ArticleFeaturedImage } from "@/components/article-featured-image";
import { ArticleContent } from "@/components/article-content";
import { ArticlePaywall } from "@/components/article-paywall";
import type { Article } from "@/lib/types";

export function ArticleGate({
  article,
  isSubscribed: serverIsSubscribed,
}: {
  article: Article;
  isSubscribed: boolean;
}) {
  const { isSubscribed } = useSubscription();

  if (isSubscribed || serverIsSubscribed) {
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
