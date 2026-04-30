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
        className="appearance-none rounded-full border border-black/15 bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_14px_center] bg-no-repeat py-3 pl-5 pr-10 text-sm text-black outline-none transition-colors focus:border-black/40"
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
