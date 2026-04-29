import { Suspense } from "react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscriptionProvider } from "@/components/subscription-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vercel Daily",
    template: "%s | Vercel Daily",
  },
  description:
    "Stay up to date with the latest news, tutorials, and updates from the Vercel ecosystem.",
  metadataBase: new URL("https://vercel-daily-five.vercel.app"),
  openGraph: {
    title: "Vercel Daily",
    description:
      "Stay up to date with the latest news, tutorials, and updates from the Vercel ecosystem.",
    siteName: "Vercel Daily",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/daily-preview-logo.png",
        alt: "Vercel Daily",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Daily",
    description:
      "Stay up to date with the latest news, tutorials, and updates from the Vercel ecosystem.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialSubscribed = cookieStore.get("subscribed")?.value === "1";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SubscriptionProvider initialSubscribed={initialSubscribed}>
        <Suspense
          fallback={
            <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white py-6">
              <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="h-8 w-[140px] animate-pulse rounded bg-black/5" />
                <div className="flex items-center gap-8">
                  <div className="h-5 w-12 animate-pulse rounded bg-black/5" />
                  <div className="h-5 w-14 animate-pulse rounded bg-black/5" />
                  <div className="h-9 w-24 animate-pulse rounded-full bg-black/5" />
                </div>
              </nav>
            </header>
          }
        >
          <Header />
        </Suspense>
        {children}
        <Footer />
        </SubscriptionProvider>
      </body>
    </html>
  );
}
