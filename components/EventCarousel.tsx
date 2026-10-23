"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

interface EventItem {
  id: number;
  title: string;
  image: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Skill Camp Cloud",
    image: "/assets/event-poster-cloud.png",
  },
  {
    id: 2,
    title: "Skill Camp AI",
    image: "/assets/event-poster-ai.png",
  },
  {
    id: 3,
    title: "Vibe Coding Study Jam",
    image: "/assets/event-poster-vibe.png",
  },
  {
    id: 4,
    title: "Skill Camp Front-End Dev",
    image: "/assets/event-poster-fe.png",
  },
  {
    id: 5,
    title: "Skill Camp Product Management",
    image: "/assets/testi-poster-1.png",
  },
];

const INITIAL_INDEX = 2; // Default to Vibe Coding Study Jam (event index 2)
const OFFSETS = [-3, -2, -1, 0, 1, 2, 3];

export default function EventCarousel() {
  const [trackIndex, setTrackIndex] = useState(INITIAL_INDEX);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);

  const currentEventIndex =
    ((trackIndex % events.length) + events.length) % events.length;

  const prevSlide = useCallback(() => {
    setTrackIndex((prev) => prev - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setTrackIndex((prev) => prev + 1);
  }, []);

  const goToSlide = useCallback(
    (targetEventIdx: number) => {
      let diff = targetEventIdx - currentEventIndex;
      if (diff > events.length / 2) {
        diff -= events.length;
      } else if (diff < -events.length / 2) {
        diff += events.length;
      }
      setTrackIndex((prev) => prev + diff);
    },
    [currentEventIndex]
  );

  const handleCardClick = (virtualIndex: number) => {
    if (hasDraggedRef.current) return;
    if (virtualIndex !== trackIndex) {
      setTrackIndex(virtualIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 40) {
      prevSlide();
    } else if (deltaX < -40) {
      nextSlide();
    }
    setTouchStartX(null);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (pointerStartXRef.current === null) return;
    const deltaX = e.clientX - pointerStartXRef.current;
    if (Math.abs(deltaX) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (pointerStartXRef.current !== null) {
      const deltaX = e.clientX - pointerStartXRef.current;
      if (deltaX > 45) {
        prevSlide();
      } else if (deltaX < -45) {
        nextSlide();
      }
    }
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
    setIsDragging(false);

    if (hasDraggedRef.current) {
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
    setIsDragging(false);
    hasDraggedRef.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDeltaX = 0;
    let lastSwipeTime = 0;
    let lastWheelTime = 0;
    let resetAccumulatorTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();

      // a) Touchpad horizontal swipe
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
        e.preventDefault();

        if (resetAccumulatorTimeout) {
          clearTimeout(resetAccumulatorTimeout);
        }
        resetAccumulatorTimeout = setTimeout(() => {
          accumulatedDeltaX = 0;
        }, 200);

        if (now - lastSwipeTime < 350) return;

        accumulatedDeltaX += e.deltaX;

        if (accumulatedDeltaX > 45) {
          nextSlide();
          accumulatedDeltaX = 0;
          lastSwipeTime = now;
        } else if (accumulatedDeltaX < -45) {
          prevSlide();
          accumulatedDeltaX = 0;
          lastSwipeTime = now;
        }
        return;
      }

      // b) Mouse wheel
      if (
        e.shiftKey ||
        (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 25)
      ) {
        if (now - lastWheelTime < 400) return;
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        if (delta > 0) {
          nextSlide();
          lastWheelTime = now;
        } else if (delta < 0) {
          prevSlide();
          lastWheelTime = now;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (resetAccumulatorTimeout) {
        clearTimeout(resetAccumulatorTimeout);
      }
    };
  }, [nextSlide, prevSlide]);

  return (
    <div className="w-full max-w-full relative flex flex-col items-center select-none overflow-hidden">
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .carousel-container {
          --card-w: min(360px, 82vw);
          --card-gap: 24px;
        }
        @media (min-width: 440px) {
          .carousel-container {
            --card-w: 360px;
          }
        }
        @media (min-width: 640px) {
          .carousel-container {
            --card-w: 410px;
            --card-gap: 24px;
          }
        }
        @media (min-width: 1024px) {
          .carousel-container {
            --card-w: 445px;
            --card-gap: 32px;
          }
        }
        @media (min-width: 1280px) {
          .carousel-container {
            --card-w: 460px;
            --card-gap: 40px;
          }
        }
      `}</style>

      {/* 5-Card Panoramic Viewport */}
      <div
        ref={containerRef}
        className={`carousel-container relative w-full overflow-hidden flex items-center justify-center h-[540px] sm:h-[620px] lg:h-[700px] xl:h-[740px] select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        <div
          className="carousel-track absolute inset-0 pointer-events-none"
          style={{
            transform: `translateX(calc(-1 * (${trackIndex} * (var(--card-w) + var(--card-gap)))))`,
            transition: "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)",
            willChange: "transform",
          }}
        >
          {OFFSETS.map((offset) => {
            const virtualIndex = trackIndex + offset;
            const eventIndex =
              ((virtualIndex % events.length) + events.length) % events.length;
            const event = events[eventIndex];
            const isCenter = offset === 0;
            const isImmediateNeighbor = Math.abs(offset) === 1;
            const isFarNeighbor = Math.abs(offset) === 2;

            return (
              <div
                key={virtualIndex}
                onClick={() => handleCardClick(virtualIndex)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(virtualIndex);
                  }
                }}
                tabIndex={Math.abs(offset) <= 2 ? 0 : -1}
                role="button"
                aria-label={`View ${event.title}`}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${virtualIndex} * (var(--card-w) + var(--card-gap)))`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "var(--card-w)",
                  zIndex: isCenter ? 30 : isImmediateNeighbor ? 20 : isFarNeighbor ? 10 : 0,
                }}
                className={`flex flex-col items-center pointer-events-auto ${
                  isDragging ? "cursor-grabbing" : "cursor-pointer"
                } focus:outline-none ${
                  Math.abs(offset) > 2 ? "pointer-events-none" : ""
                }`}
                aria-hidden={Math.abs(offset) > 2}
              >
                <div
                  className={`w-full flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none ${
                    isCenter
                      ? "scale-100 opacity-100"
                      : isImmediateNeighbor
                      ? "scale-[0.92] opacity-90 hover:opacity-100"
                      : isFarNeighbor
                      ? "scale-[0.80] opacity-60 hover:opacity-80"
                      : "scale-75 opacity-20"
                  }`}
                >
                  {/* Poster Card */}
                  <div
                    className={`relative w-full rounded-[20px] overflow-hidden bg-white border border-[#E3E3E3] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] aspect-[445/520] ${
                      isCenter
                        ? "-translate-y-4 shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
                        : "translate-y-0 shadow-md"
                    }`}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 360px, (max-width: 1024px) 410px, (max-width: 1280px) 445px, 460px"
                      className="object-cover object-top"
                      priority={Math.abs(offset) <= 1}
                    />
                  </div>

                  {/* Event Title Below Poster */}
                  <h3
                    className={`mt-5 sm:mt-6 text-center tracking-tight transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] line-clamp-1 px-2 ${
                      isCenter
                        ? "text-xl sm:text-[22px] text-dark font-semibold"
                        : isImmediateNeighbor
                        ? "text-base sm:text-lg text-dark/75 font-medium"
                        : "text-sm sm:text-base text-dark/40 font-normal"
                    }`}
                  >
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls: Chevron Left, 5 Dots, Chevron Right */}
      <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6 z-20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full flex items-center justify-center text-dark/70 hover:text-[#4285F4] hover:bg-black/5 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Previous event"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 5 Dots Pagination */}
        <div className="flex items-center gap-2 sm:gap-3">
          {events.map((event, idx) => {
            const isActive = idx === currentEventIndex;
            return (
              <button
                key={event.id}
                onClick={() => goToSlide(idx)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {isActive ? (
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4)] animate-spin [animation-duration:4s] motion-reduce:animate-none"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
                        animation: "spin 4s linear infinite",
                      }}
                    />
                    <div className="relative w-4 h-4 rounded-full bg-white shadow-xs" />
                  </div>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-[#E6E6E6] hover:bg-[#d0d0d0] hover:scale-110 transition-all duration-200" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full flex items-center justify-center text-dark/70 hover:text-[#4285F4] hover:bg-black/5 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Next event"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
