import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
