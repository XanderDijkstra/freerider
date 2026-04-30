import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral:
          "bg-[color:var(--surface)] text-[color:var(--muted)] border border-[color:var(--border)]",
        eco:
          "bg-[color:var(--accent)]/40 text-[color:var(--primary)] border border-[color:var(--accent)]",
        success:
          "bg-[color:var(--success)]/10 text-[color:var(--success)] border border-[color:var(--success)]/30",
        warning:
          "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border border-[color:var(--warning)]/30",
        error:
          "bg-[color:var(--error)]/10 text-[color:var(--error)] border border-[color:var(--error)]/30",
        primary:
          "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props} />
  );
}
