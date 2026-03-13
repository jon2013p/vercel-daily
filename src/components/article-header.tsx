import Image from "next/image";
import type { Article } from "@/lib/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <div className="mb-8 flex items-center gap-3 text-sm">
        <span className="rounded-full bg-black/5 px-3 py-1 font-semibold uppercase tracking-wider text-black/60">
          {article.category}
        </span>
        <time className="text-black/40" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
        {article.title}
      </h1>

      <p className="mb-10 text-lg leading-relaxed text-black/60">
        {article.excerpt}
      </p>

      {article.author?.name && (
        <div className="mb-10 flex items-center gap-3 border-b border-black/10 pb-8">
          {article.author.avatar && (
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="text-sm font-medium text-black">
            {article.author.name}
          </span>
        </div>
      )}
    </header>
  );
}
