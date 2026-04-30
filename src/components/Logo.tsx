import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-xl font-semibold text-[color:var(--primary)]",
        className,
      )}
    >
      <LogoMark className="h-7 w-7" />
      <span>FreeRider</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="FreeRider"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="#1F4D2B" />
      <path
        d="M9 21c2-6 6-9 14-9-2 6-6 9-14 9z"
        fill="#A8D5A8"
      />
      <path
        d="M9 21c4-1 8-3 11-7"
        stroke="#FAFAF7"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
