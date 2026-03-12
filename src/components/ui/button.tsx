import Link from "next/link";

const variants = {
  primary:
    "bg-black text-white hover:bg-black/80",
  secondary:
    "border border-black/15 text-black hover:bg-black/5",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = `rounded-full px-6 py-3 text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
