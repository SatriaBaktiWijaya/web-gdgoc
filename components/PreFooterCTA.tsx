"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface PreFooterCTAProps {
  showCards?: boolean;
  showBackground?: boolean;
}

function getPreFooterCardVariants(prefersReducedMotion: boolean | null): {
  left: Variants;
  center: Variants;
  right: Variants;
} {
  if (prefersReducedMotion) {
    return {
      left: {
        hidden: {
          opacity: 0,
          y: 20,
          rotate: -15,
          transition: { duration: 0.35, ease: "easeIn" },
        },
        visible: {
          opacity: 1,
          y: 0,
          rotate: -15,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      },
      center: {
        hidden: {
          opacity: 0,
          y: 20,
          transition: { duration: 0.35, ease: "easeIn" },
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      },
      right: {
        hidden: {
          opacity: 0,
          y: 20,
          rotate: 15,
          transition: { duration: 0.35, ease: "easeIn" },
        },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 15,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      },
    };
  }

  const cardTransition = {
    type: "spring",
    stiffness: 120,
    damping: 18,
  } as const;

  return {
    left: {
      hidden: {
        x: "clamp(130px, 13vw, 190px)",
        y: 0,
        rotate: -4,
        scale: 0.96,
        opacity: 0.92,
        transition: cardTransition,
      },
      visible: {
        x: "clamp(0px, 0vw, 0px)",
        y: 0,
        rotate: -15,
        scale: 1,
        opacity: 1,
        transition: cardTransition,
      },
    },
    center: {
      hidden: {
        y: 16,
        scale: 0.98,
        opacity: 0.92,
        transition: cardTransition,
      },
      visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: cardTransition,
      },
    },
    right: {
      hidden: {
        x: "clamp(-190px, -13vw, -130px)",
        y: 0,
        rotate: 4,
        scale: 0.96,
        opacity: 0.92,
        transition: cardTransition,
      },
      visible: {
        x: "clamp(0px, 0vw, 0px)",
        y: 0,
        rotate: 15,
        scale: 1,
        opacity: 1,
        transition: cardTransition,
      },
    },
  };
}

export default function PreFooterCTA({
  showCards = true,
  showBackground = false,
}: PreFooterCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = getPreFooterCardVariants(prefersReducedMotion);

  return (
    <div className="relative w-full pt-20 pb-0 overflow-x-clip overflow-y-visible flex flex-col items-center text-center">
      {/* Optional fallback background glow when rendered standalone */}
      {showBackground && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
          <div className="absolute top-12 -left-20 w-[520px] h-[520px] bg-[#00C2FF]/10 rounded-full blur-[150px]" />
          <div className="absolute top-4 left-[55%] -translate-x-1/2 w-[480px] h-[480px] bg-[#F9AB00]/9 rounded-full blur-[150px]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-[#34A853]/9 rounded-full blur-[150px]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-[50px] font-bold text-dark tracking-tight leading-[1.15]">
          So, What Are You Waiting For?
        </h2>
        <p className="text-gray-medium text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
          Join GDGoC Tel-U Purwokerto and start learning, building, and growing with a community that&apos;s just as curious as you are.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 mb-28 sm:mb-36 lg:mb-44 xl:mb-48">
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

      {/* 3 Fanned Cards sliding behind the footer (Exact coordinates from Figma on desktop) */}
      {showCards && (
        <motion.div
          className="relative w-full max-w-[1440px] h-[380px] sm:h-[440px] lg:h-[480px] mx-auto flex justify-center items-end pointer-events-none select-none z-0 -mb-[150px] sm:-mb-[190px] lg:-mb-[230px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Left Card (rot=-15deg, rx=36px) */}
          <div
            className="hidden sm:block absolute z-0 pointer-events-auto"
            style={{
              left: "calc(50% - clamp(280px, 28vw, 410px))",
              bottom: "0px",
              width: "clamp(280px, 27vw, 386px)",
              aspectRatio: "386/475",
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              variants={cardVariants.left}
              whileHover={{
                y: -24,
                transition: { type: "spring", stiffness: 350, damping: 25 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full h-full bg-white rounded-[32px] lg:rounded-[36px] overflow-hidden border border-[#E3E3E3] shadow-lg will-change-transform cursor-pointer pointer-events-auto"
              style={{
                aspectRatio: "386/475",
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src="/assets/testi-poster-1.png"
                alt="Skill Camp Hustler Poster"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 386px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>

          {/* Center Card (rot=0deg, elevated, rx=36px) */}
          <div
            className="absolute z-10 pointer-events-auto"
            style={{
              left: "50%",
              bottom: "35px",
              width: "clamp(290px, 28vw, 386px)",
              aspectRatio: "386/475",
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              variants={cardVariants.center}
              whileHover={{
                y: -24,
                transition: { type: "spring", stiffness: 350, damping: 25 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full h-full bg-white rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden border border-[#E3E3E3] shadow-xl will-change-transform cursor-pointer pointer-events-auto"
              style={{
                aspectRatio: "386/475",
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src="/assets/testi-poster-2.png"
                alt="Skill Camp Backend Poster"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 386px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>

          {/* Right Card (rot=15deg, rx=36px) */}
          <div
            className="hidden sm:block absolute z-0 pointer-events-auto"
            style={{
              left: "calc(50% + clamp(280px, 28vw, 410px))",
              bottom: "12px",
              width: "clamp(280px, 27vw, 386px)",
              aspectRatio: "386/475",
              transform: "translateX(-50%)",
            }}
          >
            <motion.div
              variants={cardVariants.right}
              whileHover={{
                y: -24,
                transition: { type: "spring", stiffness: 350, damping: 25 },
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full h-full bg-white rounded-[32px] lg:rounded-[36px] overflow-hidden border border-[#E3E3E3] shadow-lg will-change-transform cursor-pointer pointer-events-auto"
              style={{
                aspectRatio: "386/475",
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src="/assets/event-poster-fe.png"
                alt="Skill Camp Frontend Poster"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 386px"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
