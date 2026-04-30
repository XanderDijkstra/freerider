import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--secondary)]">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-heading text-2xl md:text-3xl font-semibold mt-2 text-[color:var(--foreground)]">
        {title}
      </Tag>
      {description ? (
        <p className="mt-3 text-base md:text-lg text-[color:var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
