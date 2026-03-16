import type { Article } from "@/lib/types";
import { ArticleHeader } from "@/components/article-header";
import { ArticleFeaturedImage } from "@/components/article-featured-image";
import { SubscribeCTA } from "@/components/subscribe-cta";

export function ArticlePaywall({ article }: { article: Article }) {
  return (
    <div>
      <ArticleHeader article={article} />
      <ArticleFeaturedImage src={article.image} alt={article.title} />

      <div className="relative">
        <p className="leading-relaxed text-black/70">
          {article.content[0]?.type === "paragraph"
            ? article.content[0].text
            : article.excerpt}
        </p>

        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-t from-white to-transparent" />
      </div>

      <SubscribeCTA />
    </div>
  );
}
