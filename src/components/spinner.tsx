export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current/30 border-t-current ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
