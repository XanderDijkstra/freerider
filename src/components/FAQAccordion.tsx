"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[color:var(--border)] border border-[color:var(--border)] rounded-xl bg-[color:var(--surface)]">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <span className="font-medium text-[color:var(--foreground)] pr-4">
                {item.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-[color:var(--muted)]">
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
