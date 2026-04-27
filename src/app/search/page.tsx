import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { SearchResultsSkeleton } from "@/components/search-results-skeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles, tutorials, and updates across Vercel Daily.",
  openGraph: {
    title: "Search",
    description:
      "Search articles, tutorials, and updates across Vercel Daily.",
  },
};

interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

type SearchParams = Promise<{ q?: string; category?: string }>;

async function getCategories() {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  return fetchAPI<Category[]>("/categories");
}

async function SearchContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", category = "" } = await searchParams;
  const categories = await getCategories();

  return (
    <>
      <div className="mb-10">
        <SearchForm
          initialQuery={q}
          initialCategory={category}
          categories={categories}
        />
      </div>

      <Suspense key={`${q}-${category}`} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={q} category={category} />
      </Suspense>
    </>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-12 flex-1 rounded-xl bg-black/5" />
        <div className="h-12 w-48 rounded-xl bg-black/5" />
      </div>
      <SearchResultsSkeleton />
    </div>
  );
}

export default function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-black">
          Search Articles
        </h1>

        <Suspense fallback={<SearchPageSkeleton />}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
