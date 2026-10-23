"use client";

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TopProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
  }, []);

  const startLoading = useCallback(() => {
    clearTimers();
    setVisible(true);
    setProgress(0);

    // Initial step to ~25%
    setTimeout(() => {
      setProgress(25);
    }, 10);

    // Trickle smoothly towards ~70%
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 70;
        }
        const remaining = 70 - prev;
        const step = Math.max(2, Math.floor(remaining * 0.25));
        return prev + step;
      });
    }, 120);
  }, [clearTimers]);

  const completeLoading = useCallback(() => {
    clearTimers();
    setProgress(100);

    // Keep visible at 100% briefly, then fade out smoothly
    completeTimeoutRef.current = setTimeout(() => {
      setVisible(false);

      // Reset progress after fade transition completes
      resetTimeoutRef.current = setTimeout(() => {
        setProgress(0);
      }, 350);
    }, 200);
  }, [clearTimers]);

  // Complete loading when route (pathname or searchParams) changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    completeLoading();
  }, [pathname, searchParams, completeLoading]);

  // Listen to internal link clicks and browser popstate (back/forward)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;

        // Same page anchor hash link - skip progress bar
        if (
          targetUrl.pathname === window.location.pathname &&
          targetUrl.search === window.location.search &&
          targetUrl.hash
        ) {
          return;
        }

        // Clicking the exact current location
        if (targetUrl.href === window.location.href) return;

        startLoading();
      } catch {
        // Invalid URL, skip
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [clearTimers, startLoading]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] shadow-[0_0_8px_rgba(66,133,244,0.6)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

export default function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <TopProgressBarInner />
    </Suspense>
  );
}

