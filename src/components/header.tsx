import Link from "next/link";
import Image from "next/image";
import { getSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscription-button";

const links = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Search",
    href: "/search",
  },
];

export async function Header() {
  const { isSubscribed } = await getSubscription();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white py-6">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/vercel-daily-logo.png"
            alt="Vercel Daily"
            width={140}
            height={32}
            priority
          />
        </Link>

        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-md font-bold text-black transition-colors hover:text-black/60"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <SubscriptionButton isSubscribed={isSubscribed} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
