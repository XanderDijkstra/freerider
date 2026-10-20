"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// Google's "preferred sources" flow: a signed-in reader marks freerider.no as a preferred
// source, so Google is more likely to show us in Top Stories and badge us in AI Overviews.
// https://developers.google.com/search/docs/appearance/preferred-sources
// Manual mode lets us render our own Norwegian button instead of Google's badge.

interface PreferredSourceApi {
  init: (options: { theme: "light" | "dark"; lang: string }) => void;
  addPreferredSource: () => void;
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(api: PreferredSourceApi) => void>;
  }
}

export const PREFERRED_SOURCE_SCRIPT_ID = "google-preferred-source";
const SCRIPT_SRC = "https://news.google.com/swg/js/v1/publisher.js";

function loadScript() {
  // Footer and guide card both mount this; load the library once per page view.
  if (document.getElementById(PREFERRED_SOURCE_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = PREFERRED_SOURCE_SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.setAttribute("preferred-sources-control", "manual");
  document.head.appendChild(script);
}

function enqueue(callback: (api: PreferredSourceApi) => void) {
  window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || [];
  window.PREFERRED_SOURCE.push(callback);
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17z" />
      <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export function PreferredSourceButton({ className }: { className?: string }) {
  const apiRef = useRef<PreferredSourceApi | null>(null);

  useEffect(() => {
    enqueue((api) => {
      apiRef.current = api;
      api.init({ theme: "light", lang: "no" });
    });
    loadScript();
  }, []);

  const handleClick = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.addPreferredSource();
      return;
    }
    // Clicked before the library finished loading: run as soon as it is ready.
    enqueue((api) => api.addPreferredSource());
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-medium hover:border-[color:var(--primary)] transition-colors",
        className,
      )}
    >
      <GoogleIcon />
      Foretrekk oss på Google
    </button>
  );
}

/** End-of-article card: readers who just finished a guide are the likeliest to say yes. */
export function PreferredSourceCard() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-heading text-xl md:text-2xl font-semibold">Se oss oftere i Google</p>
        <p className="mt-2 text-sm text-[color:var(--muted)] max-w-md">
          Med ett klikk blir FreeRider.no en foretrukket kilde i Google-kontoen din. Da er det mer sannsynlig at du
          ser oss i Toppsaker, og vi kan bli merket som foretrukket i AI-oversikter.
        </p>
      </div>
      <PreferredSourceButton className="self-start sm:self-auto" />
    </div>
  );
}
