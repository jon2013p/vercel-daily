import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-white py-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/vercel-daily-logo.png"
            alt="Vercel Daily"
            width={120}
            height={28}
          />
        </Link>

        <p className="text-sm text-black/60">
          &copy; 2026 Vercel Daily. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
