"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import PixelBlast from "@/components/PixelBlast";

interface CardSpec {
  id: number;
  left: number;
  top: number;
  rotate: number;
  rotateClass: string;
  zIndexClass: string;
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

const desktopCards: CardSpec[] = [
  {
    id: 1,
    left: 110,
    top: 72,
    rotate: -15,
    rotateClass: "-rotate-[15deg]",
    zIndexClass: "z-10",
    image: "/assets/hero-card-img.jpeg",
    title: "Community Meetup",
    subtitle: "Annual Kickoff",
    alt: "GDG on Campus Community Gathering",
  },
  {
    id: 2,
    left: 270,
    top: 25,
    rotate: -8.5,
    rotateClass: "-rotate-[8.5deg]",
    zIndexClass: "z-[11]",
    image: "/assets/event-poster-fe.png",
    title: "Frontend Workshop",
    subtitle: "Modern Web Stack",
    alt: "Frontend Web Development Workshop",
  },
  {
    id: 3,
    left: 425,
    top: 6,
    rotate: -3.5,
    rotateClass: "-rotate-[3.5deg]",
    zIndexClass: "z-[12]",
    image: "/assets/testi-poster-1.png",
    title: "Student Spotlight",
    subtitle: "Member Journey",
    alt: "Member Testimonial & Showcase",
  },
  {
    id: 4,
    left: 585,
    top: 0,
    rotate: 0,
    rotateClass: "rotate-0",
    zIndexClass: "z-[13]",
    image: "/assets/event-poster-ai.png",
    title: "AI & Machine Learning",
    subtitle: "Deep Dive Session",
    alt: "Artificial Intelligence Seminar",
  },
  {
    id: 5,
    left: 745,
    top: 6,
    rotate: 3.5,
    rotateClass: "rotate-[3.5deg]",
    zIndexClass: "z-[14]",
    image: "/assets/testi-poster-2.png",
    title: "Hackathon Showcase",
    subtitle: "Innovation Day",
    alt: "Hackathon & Innovation Showcase",
  },
  {
    id: 6,
    left: 900,
    top: 25,
    rotate: 8.5,
    rotateClass: "rotate-[8.5deg]",
    zIndexClass: "z-[15]",
    image: "/assets/event-poster-cloud.png",
    title: "Cloud Study Jam",
    subtitle: "Google Cloud Platform",
    alt: "Cloud Architecture Study Jam",
  },
  {
    id: 7,
    left: 1060,
    top: 72,
    rotate: 15,
    rotateClass: "rotate-[15deg]",
    zIndexClass: "z-[16]",
    image: "/assets/event-poster-vibe.png",
    title: "Tech Talk & Vibes",
    subtitle: "Networking Evening",
    alt: "Tech Talk & Networking Night",
  },
];


export default function HeroSection() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const centerMiddleCard = () => {
      if (typeof window === "undefined" || window.innerWidth >= 1280) return;
      const container = mobileScrollRef.current;
      const card = middleCardRef.current;
      if (!container || !card) return;

      const scrollLeft =
        card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "instant" });
    };

    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth !== lastWidth) {
          lastWidth = window.innerWidth;
          centerMiddleCard();
        }
      }
    };

    const rafId = requestAnimationFrame(centerMiddleCard);
    const timer = setTimeout(centerMiddleCard, 60);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative isolate w-full pt-32 sm:pt-40 lg:pt-[181px] pb-20 flex flex-col items-center text-center overflow-hidden bg-white"
    >
      {/* Subtle Grid Pattern */}
      <div
        data-testid="hero-grid-pattern"
        className="absolute inset-x-0 top-0 h-[650px] sm:h-[800px] pointer-events-none z-0 bg-grid-pattern opacity-40"
      />

      {/* Layer 3: Interactive PixelBlast Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PixelBlast
          intro={false}
          variant="square"
          pixelSize={3.5}
          color="#4285F4"
          accentColor="#1A73E8"
          patternScale={2.2}
          patternDensity={0.55}
          softness={0.55}
          glow={0.3}
          twinkle={0.2}
          drift={0.06}
          hoverEffect="reveal"
          hoverRadius={140}
          enableRipples={true}
          edgeFade={0.2}
          transparent={true}
          lightMode={true}
          autoPauseOffscreen={true}
        />
      </div>

      {/* Hero Headline & Intro */}
      <div data-no-pixel-hover className="relative z-20 max-w-4xl px-4 flex flex-col items-center">
        <h1 className="text-dark text-[28px] min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.15]">
          Your Next Chapter in <br />
          Tech Starts Here.
        </h1>

        <p className="text-gray-medium text-base sm:text-lg md:text-[18px] mt-6 max-w-2xl leading-relaxed">
          Connect with fellow students, explore new technologies, and build
          experiences that take you further.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="w-[156px] h-[44px] bg-[#4383F3] hover:bg-[#3876e0] text-white font-medium text-[15px] rounded-[10px] flex items-center justify-center transition-all shadow-sm active:scale-95"
          >
            Join GDGoC
          </Link>
          <Link
            href="/#community"
            className="w-[168px] h-[44px] bg-[#F0F0F0] hover:bg-[#e4e4e4] border border-[#E3E3E3] text-dark font-medium text-[15px] rounded-[10px] flex items-center justify-center transition-all active:scale-95"
          >
            Discover GDGoC
          </Link>
        </div>
      </div>

      {/* Desktop 1:1 Pixel-Perfect Stage (>= 1280px) */}
      <div className="hidden xl:block relative z-20 max-w-[1440px] w-full h-[450px] mt-28 select-none pointer-events-auto mx-auto overflow-visible scale-[0.88] 2xl:scale-100 origin-top">
        {/* Left Speech Bubble (Blue, floating cleanly above Card 1 & 2) */}
        <div
          aria-hidden="true"
          className="absolute z-30 flex items-center justify-center pointer-events-none"
          style={{
            left: "230px",
            top: "-75px",
            width: "133px",
            height: "58px",
            transform: "rotate(-10.78deg)",
          }}
        >
          <div className="w-full h-full bg-[#4383F3] rounded-[29px] flex items-center justify-center text-white font-bold text-[18px] shadow-lg relative">
            Let&apos;s Explore!
            {/* Bubble Tail SVG */}
            <svg
              className="absolute -bottom-3 right-6 w-5 h-5 text-[#4383F3] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M0 0 L24 0 L12 20 Z" />
            </svg>
          </div>
        </div>

        {/* Right Speech Bubble (Yellow/Orange, floating cleanly above Card 6 & 7) */}
        <div
          aria-hidden="true"
          className="absolute z-30 flex items-center justify-center pointer-events-none"
          style={{
            left: "1100px",
            top: "-70px",
            width: "133px",
            height: "58px",
            transform: "rotate(13.05deg)",
          }}
        >
          <div className="w-max min-w-[180px] px-5 py-4 bg-[#F9AB00] rounded-[29px] flex items-center justify-center text-white font-bold text-[18px] whitespace-nowrap shadow-lg relative">
            Build What&apos;s Next

            <svg
              className="absolute -bottom-3 right-6 w-5 h-5 text-[#F9AB00] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M0 0 L24 0 L12 20 Z" />
            </svg>
          </div>
        </div>

        {/* 7 Overlapping Photo Cards */}
        {desktopCards.map((card) => (
          <div
            key={card.id}
            className={`group absolute bg-white rounded-[8px] p-[9px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E3E3E3] transition-all duration-300 ease-out cursor-pointer hover:-translate-y-8 hover:scale-105 hover:rotate-0 hover:z-50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:border-[#CBD5E1] ${card.rotateClass} ${card.zIndexClass}`}
            style={{
              left: `${card.left}px`,
              top: `${card.top}px`,
              width: "254px",
              height: "263px",
            }}
          >
            {/* Image Area */}
            <div className="relative w-[236px] h-[186px] rounded-[6px] overflow-hidden bg-gray-100">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority={card.id <= 3}
                sizes="236px"
              />
            </div>
            {/* Caption */}
            <div className="mt-2.5 text-left px-1">
              <span className="block font-bold text-[16px] text-dark leading-tight">
                Lorem
              </span>
              <span className="block text-[13px] text-gray-medium leading-tight mt-0.5">
                Ipsum
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Touch / Scroll Stage (< 1280px) */}
      <div className="xl:hidden relative z-20 w-full mt-16">


        {/* Horizontal scroll cards */}
        <div
          ref={mobileScrollRef}
          className="relative flex items-center -space-x-5 sm:-space-x-8 overflow-x-auto py-6 px-[calc(50%-110px)] snap-x snap-mandatory no-scrollbar"
        >
          {desktopCards.map((card) => (
            <div
              key={card.id}
              ref={card.id === 4 ? middleCardRef : undefined}
              className="shrink-0 snap-center bg-white rounded-[8px] p-[8px] shadow-md border border-[#E3E3E3] transition-all hover:scale-105"
              style={{
                width: "220px",
                height: "240px",
                transform: `rotate(${card.rotate * 0.7}deg)`,
              }}
            >
              <div className="relative w-full h-[160px] rounded-[6px] overflow-hidden bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div className="mt-2 text-left px-1">
                <span className="block font-bold text-sm text-dark leading-tight truncate">
                  {card.title}
                </span>
                <span className="block text-xs text-gray-medium leading-tight mt-0.5 truncate">
                  {card.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
