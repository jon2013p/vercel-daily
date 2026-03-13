import type { ContentBlock } from "@/lib/types";

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = (
        { 2: "h2", 3: "h3", 4: "h4" } as Record<number, "h2" | "h3" | "h4">
      )[block.level] ?? "h2";
      return (
        <HeadingTag
          key={index}
          className="mt-8 mb-4 text-2xl font-bold text-black"
        >
          {block.text}
        </HeadingTag>
      );
    }
    case "paragraph":
      return (
        <p key={index} className="leading-relaxed text-black/70">
          {block.text}
        </p>
      );
    case "unordered-list":
      return (
        <ul key={index} className="list-disc space-y-2 pl-6 text-black/70">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={index} className="list-decimal space-y-2 pl-6 text-black/70">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export function ArticleContent({ content, tags }: { content: ContentBlock[]; tags: string[] }) {
  return (
    <>
      <div className="prose-lg space-y-6">
        {content.map((block, i) => renderBlock(block, i))}
      </div>

      {tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-black/10 pt-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
