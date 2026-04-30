"use client";

import { useRef, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSearchTransition } from "@/components/search-transition-provider";
import { Spinner } from "@/components/spinner";

interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

export function SearchForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPending, startTransition } = useSearchTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router, pathname, searchParams, startTransition],
  );

  function handleInputChange(term: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const hasActiveQuery = !!searchParams.get("q");

    if (term.length >= 3 || (term.length === 0 && hasActiveQuery)) {
      debounceRef.current = setTimeout(() => {
        updateParams({ q: term || null });
      }, 300);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const term = inputRef.current?.value ?? "";
    updateParams({ q: term || null });
  }

  function handleCategoryChange(value: string) {
    updateParams({ category: value || null });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
      <input
        ref={inputRef}
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (debounceRef.current) clearTimeout(debounceRef.current);
          }
        }}
        defaultValue={searchParams.get("q") ?? ""}
        placeholder="Search articles..."
        className="flex-1 rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-black/40"
      />

      <select
        value={searchParams.get("category") ?? ""}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none transition-colors focus:border-black/40"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:opacity-50"
      >
        {isPending && <Spinner className="size-4 border-white/30 border-t-white" />}
        Search
      </button>
    </form>
  );
}
