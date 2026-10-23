"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface FeatureCardProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  clipColor: string;
  side: "left" | "right";
  rotateClass: string;
  clipPosition: string;
}

const features: FeatureCardProps[] = [
  {
    id: "feature-1",
    tag: "01/ Find Your People",
    title: "Find Your Partner",
    description:
      "Meet people who share your curiosity, exchange ideas, and find your place in a growing tech community.",
    image: "/assets/feature-1.png",
    clipColor: "#4383F3", // Blue
    side: "left",
    rotateClass: "rotate-[1.5deg] lg:rotate-[3deg]",
    clipPosition: "left-[58%] -translate-x-1/2",
  },
  {
    id: "feature-2",
    tag: "02/ Stay Curious",
    title: "Learning Together",
    description:
      "Explore new technologies, gain hands-on experience, and discover new possibilities through continuous learning.",
    image: "/assets/feature-2.jpeg",
    clipColor: "#EA4335", // Red
    side: "right",
    rotateClass: "-rotate-[1.5deg] lg:-rotate-[3deg]",
    clipPosition: "left-1/2 -translate-x-1/2",
  },
  {
    id: "feature-3",
    tag: "03/ Build Together",
    title: "Grow Together",
    description:
      "Meet people who share your curiosity, exchange ideas, and find your place in a growing tech community.",
    image: "/assets/feature-3.jpeg",
    clipColor: "#F9AB00", // Yellow
    side: "left",
    rotateClass: "rotate-[1.5deg] lg:rotate-[3deg]",
    clipPosition: "left-[58%] -translate-x-1/2",
  },
  {
    id: "feature-4",
    tag: "04/ Bring Ideas to Life",
    title: "Create Something New",
    description:
      "Meet people who share your curiosity, exchange ideas, and find your place in a growing tech community.",
    image: "/assets/feature-4.jpeg",
    clipColor: "#34A853", // Green
    side: "right",
    rotateClass: "-rotate-[1.5deg] lg:-rotate-[3deg]",
    clipPosition: "left-1/2 -translate-x-1/2",
  },
];

interface ShuffleConfig {
  desktop: {
    start: { x: number; y: number; rotate: number };
    shuffle: { x: number; y: number; rotate: number };
    finalRotate: number;
  };
  mobile: {
    start: { x: number; y: number; rotate: number };
    shuffle: { x: number; y: number; rotate: number };
    finalRotate: number;
  };
}

const shuffleConfigs: ShuffleConfig[] = [
  // Feature 1 (col 1, row 1): starts offset to center (+x, +y), shuffles, lands at x:0, y:0 with rotate: 3
  {
    desktop: {
      start: { x: 260, y: 190, rotate: -4 },
      shuffle: { x: 310, y: 170, rotate: -6 },
      finalRotate: 3,
    },
    mobile: {
      start: { x: 0, y: 40, rotate: -4 },
      shuffle: { x: -22, y: 30, rotate: -5 },
      finalRotate: 1.5,
    },
  },
  // Feature 2 (col 2, row 1 with translate-y-36): starts offset to center (-x, +y), shuffles, lands at x:0, y:0 with rotate: -3
  {
    desktop: {
      start: { x: -260, y: 120, rotate: 2 },
      shuffle: { x: -310, y: 90, rotate: 5 },
      finalRotate: -3,
    },
    mobile: {
      start: { x: 0, y: 15, rotate: 2 },
      shuffle: { x: 22, y: 10, rotate: 4 },
      finalRotate: -1.5,
    },
  },
  // Feature 3 (col 1, row 2): starts offset to center (+x, -y), shuffles, lands at x:0, y:0 with rotate: 3
  {
    desktop: {
      start: { x: 260, y: -190, rotate: -1 },
      shuffle: { x: 295, y: -160, rotate: -3 },
      finalRotate: 3,
    },
    mobile: {
      start: { x: 0, y: -15, rotate: -1 },
      shuffle: { x: -18, y: -10, rotate: -3 },
      finalRotate: 1.5,
    },
  },
  // Feature 4 (col 2, row 2 with translate-y-36): starts offset to center (-x, -y), shuffles, lands at x:0, y:0 with rotate: -3
  {
    desktop: {
      start: { x: -260, y: -250, rotate: 3 },
      shuffle: { x: -295, y: -220, rotate: 6 },
      finalRotate: -3,
    },
    mobile: {
      start: { x: 0, y: -40, rotate: 3 },
      shuffle: { x: 18, y: -30, rotate: 5 },
      finalRotate: -1.5,
    },
  },
];

function getCardVariants(
  index: number,
  isDesktop: boolean,
  prefersReducedMotion: boolean | null
): Variants {
  const config = shuffleConfigs[index] ?? shuffleConfigs[0];
  const mode = isDesktop ? config.desktop : config.mobile;

  if (prefersReducedMotion) {
    return {
      hidden: {
        opacity: 0,
        y: 20,
        rotate: mode.finalRotate,
        transition: {
          duration: 0.35,
          ease: "easeIn",
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        rotate: mode.finalRotate,
        transition: {
          duration: 0.45,
          delay: index * 0.1,
          ease: "easeOut",
        },
      },
    };
  }

  return {
    hidden: {
      opacity: 0.9,
      x: mode.start.x,
      y: mode.start.y,
      rotate: mode.start.rotate,
      scale: 0.94,
      transition: {
        duration: 0.65,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    visible: {
      opacity: 1,
      x: [mode.start.x, mode.shuffle.x, 0],
      y: [mode.start.y, mode.shuffle.y, 0],
      rotate: [mode.start.rotate, mode.shuffle.rotate, mode.finalRotate],
      scale: [0.94, 1.02, 1],
      transition: {
        duration: 0.95,
        times: [0, 0.4, 1],
        ease: ["easeInOut", "easeOut"],
        delay: 0.08 * index,
      },
    },
  };
}

function FeatureCard({
  feature,
  index,
  isDesktop,
  prefersReducedMotion,
}: {
  feature: FeatureCardProps;
  index: number;
  isDesktop: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const variants = getCardVariants(index, isDesktop, prefersReducedMotion);

  return (
    <motion.div
      variants={variants}
      drag
      dragElastic={0.2}
      dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
      whileDrag={{
        scale: 1.04,
        cursor: "grabbing",
        zIndex: 40,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
      }}
      className="relative w-full max-w-[530px] bg-white rounded-[14px] border border-[#E9E9E9] p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] will-change-transform cursor-grab active:cursor-grabbing"
    >
      {/* Colored Top Clip Hanging Over Border */}
      <div
        className={`absolute -top-[19px] ${feature.clipPosition} z-20 flex flex-col items-center justify-start pointer-events-none`}
        style={{
          width: "26px",
          height: "38px",
        }}
      >
        <div
          className="w-full h-full rounded-[4px] shadow-sm flex items-start justify-center pt-2"
          style={{ backgroundColor: feature.clipColor }}
        >
          <div className="w-[10px] h-[10px] rounded-full bg-[#FAFAFA] shadow-inner" />
        </div>
      </div>

      {/* Content */}
      <div className="text-left mb-6">
        <span className="text-xs sm:text-[13px] font-medium text-dark/70 tracking-tight inline-block">
          {feature.tag}
        </span>
        <h3 className="text-xl sm:text-2xl lg:text-[30px] font-bold text-dark tracking-tight mt-1 mb-2 sm:mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-medium text-sm sm:text-[15px] leading-relaxed max-w-[440px]">
          {feature.description}
        </p>
      </div>

      {/* Inner Image Area */}
      <div className="relative w-full aspect-[464/204] rounded-[8px] overflow-hidden bg-gray-100 select-none">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(max-width: 640px) 100vw, 530px"
          className="object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

function subscribeDesktop(callback: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getDesktopServerSnapshot() {
  return false;
}

export default function FeaturesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  return (
    <section className="w-full relative py-24 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24 lg:mb-28">
        <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold text-dark tracking-tight leading-tight">
          A Little More Than Just Tech
        </h2>
      </div>

      {/* Feature Cards Container - Single Unified Responsive 2-Column Staggered Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-24 xl:gap-x-32 lg:gap-y-36 lg:pb-36 max-w-[1360px] mx-auto justify-items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        onViewportEnter={() => setHasEntered(true)}
        onViewportLeave={() => {
          if (hasEntered) {
            setHasEntered(false);
            setResetKey((prev) => prev + 1);
          }
        }}
      >
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className={`w-full flex justify-center ${
              feature.side === "right" ? "lg:translate-y-36" : ""
            }`}
          >
            <FeatureCard
              key={`${feature.id}-${resetKey}`}
              feature={feature}
              index={idx}
              isDesktop={isDesktop}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
