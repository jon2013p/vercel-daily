# Vercel Daily

A news publication app built with **Next.js 16** and **React 19**, showcasing modern patterns like Cache Components (`"use cache"`), `proxy.ts`, `after()`, optimistic UI, and Suspense-driven streaming.

## Overview

Vercel Daily is a demo news site with:

- **Home page** — Breaking news banner, hero section, and a featured articles grid.
- **Article pages** — Full article view with trending sidebar; gated behind a soft paywall for non-subscribers.
- **Search** — Debounced full-text search with category filtering and URL state sync.
- **Subscription system** — Cookie-based subscription flow with optimistic UI, server actions, and background activation via `after()`.

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, SubscriptionProvider
│   ├── page.tsx                # Home: Banner, Hero, FeaturedArticles (Suspense)
│   ├── not-found.tsx           # Global 404
│   ├── error.tsx               # Global error boundary
│   ├── actions/
│   │   └── subscription.ts    # Server actions: subscribe / unsubscribe
│   ├── search/
│   │   └── page.tsx           # Search page with category filter
│   └── articles/
│       └── [id]/
│           ├── page.tsx       # Dynamic article page with generateMetadata
│           └── error.tsx      # Article-level error boundary
├── components/
│   ├── subscription-provider.tsx  # Client context: cookie read + optimistic state
│   ├── article-gate.tsx           # Paywall vs full content switch
│   ├── article-paywall.tsx        # Teaser + gradient + subscribe CTA
│   ├── search-form.tsx            # Debounced search input + category select
│   └── ...                        # Header, Footer, cards, skeletons, etc.
├── lib/
│   ├── api.ts                 # Centralized fetch wrapper for content API
│   └── subscription.ts        # Subscription API calls + cookie helpers
└── proxy.ts                   # Next.js 16 proxy (replaces middleware)
```

### Data flow

All content and subscription data comes from an external REST API (`API_BASE_URL`). There are no internal API route handlers — the app uses **server actions** for mutations and **`fetch` with `"use cache"`** for reads.

## Key Features & Configuration

### Cache Components

Enabled via `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
};
```

Components and functions opt in with `"use cache"` and fine-tune staleness with `cacheLife` / `cacheTag`:

| Component / Function   | Cache Profile | Cache Tag         |
| ---------------------- | ------------- | ----------------- |
| Header, Hero           | `days`        | —                 |
| Banner (breaking news) | `minutes`     | `breaking-news`   |
| Featured Articles      | `minutes`     | `articles`        |
| Trending Articles      | `minutes`     | `trending`        |
| Search Results         | `hours`       | `search-results`  |
| Categories             | `hours`       | `categories`      |
| Article (by ID)        | `hours`       | `article-${id}`   |
| verifySubscription     | custom stale/revalidate/expire | — |

### Proxy (`proxy.ts`)

Replaces the legacy `middleware.ts` pattern. Runs on `/articles/*` requests and injects subscription-related headers (`x-subscription-status`, `x-subscription-token`) into the forwarded request.

### Subscription Flow

1. User clicks **Subscribe** (header or paywall CTA).
2. The `subscribe()` server action creates a subscription token via the API if one doesn't exist, then sets two cookies:
   - `subscription_token` — httpOnly, 24h TTL. Holds the token.
   - `subscribed` — client-readable, 24h TTL. Signals active status to the browser.
3. `after()` fires a non-blocking background task to **activate** the subscription and **verify** it against the API.
4. `revalidatePath("/", "layout")` refreshes the cached layout tree.
5. On the client, `SubscriptionProvider` reads `subscribed=1` from `document.cookie` and exposes `isSubscribed` (optimistic) and `confirmedSubscribed` (post-action truth) via React context.
6. `ArticleGate` renders full content or the paywall based on `confirmedSubscribed`.

### Suspense & Streaming

The home page and layout wrap async components in `<Suspense>` with skeleton fallbacks, enabling progressive streaming of the shell, header, banner, articles, and footer.

### Styling

Tailwind CSS v4 via PostCSS — utility classes only, no CSS Modules.

### Images

Served from Vercel Blob Storage, configured in `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { hostname: "*.public.blob.vercel-storage.com" },
  ],
},
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn / bun)

### Environment Variables

Create a `.env.local` file:

```env
API_BASE_URL=<backend REST API base URL>
X_VERCEL_PROTECTION_BYPASS=<optional Vercel deployment protection bypass token>
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Deployment

Deploy on [Vercel](https://vercel.com/new) — set the environment variables above in the project settings. The app works out of the box with Vercel's edge network, caching, and image optimization.
