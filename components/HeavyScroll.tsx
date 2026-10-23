"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  animate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

interface HeavyScrollProps {
  children: ReactNode;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export default function HeavyScroll({ children }: HeavyScrollProps) {
  const shouldReduceMotion = useReducedMotion();
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const targetScrollRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleReset = () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      isAnimatingRef.current = false;
      targetScrollRef.current = 0;
    };
    window.addEventListener("popstate", handleReset);
    return () => window.removeEventListener("popstate", handleReset);
  }, []);

  useEffect(() => {
    if (
      shouldReduceMotion ||
      isTouchDevice() ||
      (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard"))
    ) {
      return;
    }

    const stopAnimation = () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      isAnimatingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;

      // Allow natural scrolling inside nested scrollable containers
      let targetElement = e.target as HTMLElement | null;
      while (
        targetElement &&
        targetElement !== document.body &&
        targetElement !== document.documentElement
      ) {
        const style = window.getComputedStyle(targetElement);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          targetElement.scrollHeight > targetElement.clientHeight
        ) {
          const canScrollDown =
            e.deltaY > 0 &&
            targetElement.scrollTop <
              targetElement.scrollHeight - targetElement.clientHeight;
          const canScrollUp = e.deltaY < 0 && targetElement.scrollTop > 0;
          if (canScrollDown || canScrollUp) {
            return;
          }
        }
        targetElement = targetElement.parentElement;
      }

      e.preventDefault();

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      if (!isAnimatingRef.current) {
        targetScrollRef.current = window.scrollY;
      }

      const newTarget = Math.max(
        0,
        Math.min(targetScrollRef.current + e.deltaY, maxScroll)
      );
      targetScrollRef.current = newTarget;

      controlsRef.current?.stop();
      isAnimatingRef.current = true;

      controlsRef.current = animate(window.scrollY, newTarget, {
        type: "spring",
        damping: 32,
        stiffness: 85,
        mass: 1.25,
        onUpdate: (y) => {
          window.scrollTo(0, y);
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          controlsRef.current = null;
        },
        onStop: () => {
          isAnimatingRef.current = false;
          controlsRef.current = null;
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("pointerdown", stopAnimation);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("pointerdown", stopAnimation);
      stopAnimation();
    };
  }, [shouldReduceMotion]);

  return <div className="flex-1 flex flex-col w-full">{children}</div>;
}
