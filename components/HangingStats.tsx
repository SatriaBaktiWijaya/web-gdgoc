"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Exact silhouette path extracted from Figma design
function SilhouettesIcon({ isHovered }: { isHovered?: boolean }) {
  return (
    <svg
      viewBox="631 1699 180 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[125px] sm:w-[140px] h-[80px] sm:h-[90px] my-auto transition-transform duration-300"
      style={{
        transform: isHovered ? "scale(1.04) translateY(-2px)" : "scale(1)",
      }}
    >
      <path
        d="M746.285 1804.32C746.842 1805.17 747.158 1806.16 747.199 1807.18C747.241 1808.19 747.006 1809.2 746.521 1810.1C746.036 1811 745.318 1811.74 744.442 1812.27C743.567 1812.79 742.567 1813.06 741.548 1813.06H637.233C636.214 1813.06 635.214 1812.79 634.339 1812.27C633.464 1811.74 632.745 1811 632.26 1810.1C631.775 1809.2 631.541 1808.19 631.582 1807.18C631.624 1806.16 631.939 1805.17 632.496 1804.32C640.458 1792.06 652.169 1782.71 665.882 1777.65C658.301 1772.61 652.546 1765.26 649.467 1756.68C646.388 1748.11 646.149 1738.78 648.785 1730.06C651.421 1721.34 656.793 1713.71 664.106 1708.28C671.418 1702.85 680.284 1699.92 689.391 1699.92C698.498 1699.92 707.363 1702.85 714.676 1708.28C721.988 1713.71 727.36 1721.34 729.996 1730.06C732.633 1738.78 732.394 1748.11 729.315 1756.68C726.236 1765.26 720.48 1772.61 712.899 1777.65C726.612 1782.71 738.324 1792.06 746.285 1804.32ZM808.441 1804.21C800.477 1792.01 788.792 1782.69 775.118 1777.65C784.068 1771.63 790.384 1762.41 792.78 1751.89C795.177 1741.37 793.474 1730.33 788.019 1721.02C782.563 1711.71 773.765 1704.83 763.415 1701.78C753.065 1698.73 741.941 1699.74 732.307 1704.6C731.939 1704.79 731.617 1705.06 731.364 1705.38C731.111 1705.71 730.934 1706.09 730.844 1706.5C730.754 1706.9 730.754 1707.32 730.845 1707.73C730.935 1708.13 731.114 1708.51 731.367 1708.84C738.531 1717.77 742.644 1728.77 743.106 1740.21C743.568 1751.66 740.354 1762.95 733.934 1772.43C733.519 1773.05 733.365 1773.81 733.507 1774.54C733.649 1775.27 734.074 1775.92 734.69 1776.34C743.061 1782.18 750.226 1789.58 755.795 1798.14C758.041 1801.58 758.958 1805.72 758.376 1809.78C758.31 1810.19 758.333 1810.6 758.443 1811C758.554 1811.39 758.748 1811.76 759.014 1812.07C759.28 1812.38 759.61 1812.63 759.982 1812.8C760.354 1812.97 760.759 1813.06 761.168 1813.06H803.802C805.048 1813.06 806.259 1812.65 807.247 1811.89C808.235 1811.14 808.946 1810.07 809.268 1808.87C809.464 1808.08 809.492 1807.25 809.35 1806.45C809.207 1805.65 808.898 1804.89 808.441 1804.21Z"
        fill="#4383F3"
        fillOpacity={isHovered ? 0.35 : 0.23}
      />
    </svg>
  );
}

// 3D Tactile Clothespin Clip Component
function PinClip({ color }: { color: string }) {
  return (
    <div
      className="absolute -top-[21px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-start pointer-events-none drop-shadow-[0_3px_3px_rgba(0,0,0,0.18)]"
      style={{
        width: "27.2px",
        height: "41.3px",
      }}
    >
      <div
        className="w-full h-full rounded-[3px] shadow-sm flex flex-col items-center justify-start pt-2 relative overflow-hidden border-t border-l border-white/35"
        style={{ backgroundColor: color }}
      >
        {/* 3D highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none" />

        {/* Metallic spring hinge ring */}
        <div className="absolute top-[18px] w-full h-[2px] bg-gradient-to-r from-black/25 via-white/50 to-black/25" />

        {/* Circular pin hole with deep inner shadow */}
        <div className="w-[11px] h-[11px] rounded-full bg-[#FAFAFA] shadow-[inset_0_1.5px_2.5px_rgba(0,0,0,0.32)] ring-1 ring-black/10 relative z-10" />

        {/* Bottom clamp slit */}
        <div className="absolute bottom-0 w-[2px] h-[7px] bg-black/25" />
      </div>
    </div>
  );
}

interface StatItem {
  id: number;
  left: number;
  top: number;
  rotate: number;
  clipColor: string;
  value?: string;
  label?: string;
  isImage?: boolean;
}

const statsData: StatItem[] = [
  {
    id: 1,
    left: 89,
    top: 195,
    rotate: 18.2,
    clipColor: "#4383F3", // Blue
    value: "3,765",
    label: "Active Member",
  },
  {
    id: 2,
    left: 336,
    top: 268,
    rotate: 10.32,
    clipColor: "#EA4335", // Red
    value: "75",
    label: "Total Event",
  },
  {
    id: 3,
    left: 601,
    top: 298,
    rotate: 0,
    clipColor: "#F9AB00", // Yellow
    value: "3,504",
    label: "Social Follower",
  },
  {
    id: 4,
    left: 868,
    top: 268,
    rotate: -10.32,
    clipColor: "#4383F3", // Green
    value: "331",
    label: "Digital Content",
  },
  {
    id: 5,
    left: 1127,
    top: 189,
    rotate: -18.2,
    clipColor: "#34A853", // Green
    value: "6,121",
    label: "Total Page Views",
  },
];

// Card t parameter along the 1440px rope curve (at center X of each card)
const cardParams = [
  (89 + 119) / 1440, // ~0.1444
  (336 + 119) / 1440, // ~0.3160
  (601 + 119) / 1440, // ~0.5000
  (868 + 119) / 1440, // ~0.6854
  (1127 + 119) / 1440, // ~0.8653
];

// Target sag values when a card is hovered
const cardSagMap: Record<number, { cp1: number; cp2: number }> = {
  1: { cp1: 22, cp2: 6 },
  2: { cp1: 30, cp2: 14 },
  3: { cp1: 26, cp2: 26 },
  4: { cp1: 14, cp2: 30 },
  5: { cp1: 6, cp2: 22 },
};

function getBezierY(t: number, cp1: number, cp2: number): number {
  const oneMinusT = 1 - t;
  return (
    oneMinusT * oneMinusT * oneMinusT * 96 +
    3 * oneMinusT * oneMinusT * t * cp1 +
    3 * oneMinusT * t * t * cp2 +
    t * t * t * 96
  );
}

export default function HangingStats() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ropeBaseRef = useRef<SVGPathElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeHighlightRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStatsScrollRef = useRef<HTMLDivElement>(null);
  const middleStatsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const centerMiddleCard = () => {
      if (typeof window === "undefined" || window.innerWidth >= 1280) return;
      const container = mobileStatsScrollRef.current;
      const card = middleStatsCardRef.current;
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

  // Track currently hovered card and 3D pendulum tilt
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  // Physics animation state in refs for 60fps performance without React re-renders
  const currentCp1 = useRef(365);
  const currentCp2 = useRef(365);
  const velocityCp1 = useRef(0);
  const velocityCp2 = useRef(0);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const hoveredIdRef = useRef<number | null>(null);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    let animId: number | null = null;
    let startTime: number | null = null;

    const animateLoop = (timestamp: number) => {
      if (typeof window !== "undefined" && window.innerWidth < 1280) {
        animId = null;
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // 1. Ambient breeze (gentle swaying waves)
      const breeze1 = Math.sin(elapsed * 0.0016) * 3.5;
      const breeze2 = Math.cos(elapsed * 0.0022) * 3.0;

      // 2. Card weight pull when hovered
      const currentHover = hoveredIdRef.current;
      const hoverSag = currentHover
        ? cardSagMap[currentHover] ?? { cp1: 0, cp2: 0 }
        : { cp1: 0, cp2: 0 };

      // 3. Interactive mouse tension / pluck
      let pluckCp1 = 0;
      let pluckCp2 = 0;
      if (mousePosRef.current) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        const t = Math.max(0, Math.min(1, mx / 1440));
        const currentRopeY = getBezierY(t, currentCp1.current, currentCp2.current);
        const distY = my - currentRopeY;

        if (Math.abs(distY) < 140) {
          const proximity = 1 - Math.abs(distY) / 140;
          const tension =
            Math.max(-25, Math.min(30, distY * 0.25)) * proximity;
          pluckCp1 = tension * (1 - t) * 1.5;
          pluckCp2 = tension * t * 1.5;
        }
      }

      // 4. Target spring control points
      const target1 = 365 + breeze1 + hoverSag.cp1 + pluckCp1;
      const target2 = 365 + breeze2 + hoverSag.cp2 + pluckCp2;

      const stiffness = 0.075;
      const damping = 0.84;

      velocityCp1.current =
        (velocityCp1.current + (target1 - currentCp1.current) * stiffness) *
        damping;
      currentCp1.current += velocityCp1.current;

      velocityCp2.current =
        (velocityCp2.current + (target2 - currentCp2.current) * stiffness) *
        damping;
      currentCp2.current += velocityCp2.current;

      const cp1 = currentCp1.current;
      const cp2 = currentCp2.current;

      // 5. Update SVG paths
      const d = `M 0 96 C 480 ${cp1.toFixed(2)} 960 ${cp2.toFixed(2)} 1440 96`;
      const shadowD = `M 0 108 C 480 ${(cp1 + 14).toFixed(2)} 960 ${(cp2 + 14).toFixed(2)} 1440 108`;

      if (ropeRef.current) ropeRef.current.setAttribute("d", d);
      if (ropeBaseRef.current) ropeBaseRef.current.setAttribute("d", d);
      if (ropeHighlightRef.current) ropeHighlightRef.current.setAttribute("d", d);
      if (shadowRef.current) shadowRef.current.setAttribute("d", shadowD);

      // 6. Update card wrapper positions and tilt along the sagged rope
      const d1 = cp1 - 365;
      const d2 = cp2 - 365;

      for (let i = 0; i < cardParams.length; i++) {
        const el = cardWrapperRefs.current[i];
        if (!el) continue;

        const t = cardParams[i];
        const deltaY = 3 * t * (1 - t) * ((1 - t) * d1 + t * d2);
        const dYdt =
          3 * (1 - t) * (1 - t) * d1 +
          6 * (1 - t) * t * (d2 - d1) -
          3 * t * t * d2;
        const deltaAngle = (Math.atan(dYdt / 1440) * 180) / Math.PI;

        el.style.transform = `translate3d(0, ${deltaY.toFixed(2)}px, 0) rotate(${(deltaAngle * 0.4).toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(animateLoop);
    };

    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1280) {
        if (animId === null) {
          startTime = null;
          animId = requestAnimationFrame(animateLoop);
        }
      } else {
        if (animId !== null) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      if (window.innerWidth >= 1280) {
        animId = requestAnimationFrame(animateLoop);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      if (animId !== null) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  const handleStageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const scaleX = 1440 / rect.width;
    const scaleY = 660 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    mousePosRef.current = { x, y };
  }, []);

  const handleStageMouseLeave = useCallback(() => {
    mousePosRef.current = null;
  }, []);

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: -ny * 12,
        y: nx * 14,
        z: nx * 5,
      });
    },
    []
  );

  const handleCardMouseEnter = useCallback((id: number) => {
    setHoveredId(id);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTilt({ x: 0, y: 0, z: 0 });
  }, []);

  return (
    <section
      id="community"
      className="w-full relative pt-20 pb-40 sm:pb-48 lg:pb-56 flex flex-col items-center overflow-hidden"
    >
      {/* Title */}
      <div className="max-w-5xl px-4 text-center mb-16 z-10">
        <h2 className="text-2xl sm:text-3xl md:text-[38px] leading-[1.3] tracking-tight text-gray-medium font-normal">
          <span className="font-bold text-dark">
            GDG on Campus Tel-U Purwokerto
          </span>{" "}
          is a space <br className="hidden md:inline" />
          where students connect, explore, and build{" "}
          <br className="hidden md:inline" />
          with technology.
        </h2>
      </div>

      {/* Desktop 1:1 Clothesline Stage (>= 1280px) */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="hidden xl:block relative max-w-[1440px] w-full h-[660px] mx-auto select-none overflow-visible scale-[0.88] 2xl:scale-100 origin-top"
      >
        {/* Dynamic 3D Loose Clothesline Cable */}
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-[400px] pointer-events-none z-0"
        >
          <defs>
            {/* Soft Blurred Shadow Filter */}
            <filter
              id="ropeShadowFilter"
              x="-10%"
              y="-20%"
              width="120%"
              height="160%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>

            {/* Metallic Wall Mount Gradient */}
            <linearGradient id="metalPlate" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="metalRing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Cylindrical 3D Rope Shading Gradient */}
            <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="25%" stopColor="#94A3B8" />
              <stop offset="55%" stopColor="#475569" />
              <stop offset="85%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Left Wall Mounting Anchor (x=0) */}
          <g className="opacity-90">
            <rect
              x="0"
              y="80"
              width="12"
              height="32"
              rx="3"
              fill="url(#metalPlate)"
              stroke="#475569"
              strokeWidth="1"
            />
            <circle cx="5" cy="86" r="1.5" fill="#334155" />
            <circle cx="5" cy="106" r="1.5" fill="#334155" />
            <path
              d="M 12 90 C 22 90 22 102 12 102"
              stroke="url(#metalRing)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <rect
              x="14"
              y="93"
              width="8"
              height="6"
              rx="2"
              fill="#334155"
              stroke="#64748B"
              strokeWidth="0.5"
            />
          </g>

          {/* Right Wall Mounting Anchor (x=1440) */}
          <g className="opacity-90">
            <rect
              x="1428"
              y="80"
              width="12"
              height="32"
              rx="3"
              fill="url(#metalPlate)"
              stroke="#475569"
              strokeWidth="1"
            />
            <circle cx="1435" cy="86" r="1.5" fill="#334155" />
            <circle cx="1435" cy="106" r="1.5" fill="#334155" />
            <path
              d="M 1428 90 C 1418 90 1418 102 1428 102"
              stroke="url(#metalRing)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <rect
              x="1418"
              y="93"
              width="8"
              height="6"
              rx="2"
              fill="#334155"
              stroke="#64748B"
              strokeWidth="0.5"
            />
          </g>

          {/* Layer 1: Ambient Blurred Drop Shadow */}
          <path
            ref={shadowRef}
            d="M 0 108 C 480 379 960 379 1440 108"
            stroke="rgba(15, 23, 42, 0.12)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            filter="url(#ropeShadowFilter)"
          />

          {/* Layer 2: Core Dark Base for crisp depth */}
          <path
            ref={ropeBaseRef}
            d="M 0 96 C 480 365 960 365 1440 96"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Layer 3: Cylindrical 3D Shaded Cable */}
          <path
            ref={ropeRef}
            d="M 0 96 C 480 365 960 365 1440 96"
            stroke="url(#ropeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Layer 4: Braided Twine Texture Highlight Strand */}
          <path
            ref={ropeHighlightRef}
            d="M 0 96 C 480 365 960 365 1440 96"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* 5 Hanging Cards at exact Figma coordinates */}
        {statsData.map((stat, idx) => {
          const isHovered = hoveredId === stat.id;
          return (
            <div
              key={stat.id}
              ref={(el) => {
                cardWrapperRefs.current[idx] = el;
              }}
              className="absolute z-10"
              style={{
                left: `${stat.left}px`,
                top: `${stat.top}px`,
                width: "238px",
                height: "269px",
                perspective: 1000,
                transformOrigin: "50% 0%",
              }}
            >
              <motion.div
                className="relative w-full h-full bg-white rounded-[10px] border border-[#E3E3E3] cursor-pointer"
                style={{
                  transformOrigin: "50% 0%",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateZ: isHovered ? stat.rotate + tilt.z : stat.rotate,
                  rotateX: isHovered ? tilt.x : 0,
                  rotateY: isHovered ? tilt.y : 0,
                  y: isHovered ? 7 : 0,
                  scale: isHovered ? 1.04 : 1.0,
                  boxShadow: isHovered
                    ? "0 25px 48px -12px rgba(0, 0, 0, 0.18), 0 12px 24px -8px rgba(0, 0, 0, 0.08)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                  mass: 0.9,
                }}
                onMouseEnter={() => handleCardMouseEnter(stat.id)}
                onMouseLeave={handleCardMouseLeave}
                onMouseMove={handleCardMouseMove}
              >
                {/* 3D Tactile Top Clip */}
                <PinClip color={stat.clipColor} />

                {stat.isImage ? (
                  <div className="w-full h-full p-2.5 flex items-center justify-center">
                    <motion.div
                      className="relative w-full h-full rounded-[6px] overflow-hidden bg-gray-100"
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <Image
                        src="/assets/hero-card-img.jpeg"
                        alt="Campus event"
                        fill
                        sizes="236px"
                        className="object-cover"
                      />
                      {/* Subtle glossy sheen reflection on hover */}
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none transition-opacity duration-300"
                        style={{ opacity: isHovered ? 1 : 0 }}
                      />
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between text-left">
                    <motion.span
                      className="text-[32px] font-bold text-dark tracking-tight leading-none inline-block"
                      animate={{
                        scale: isHovered ? 1.04 : 1,
                        x: isHovered ? 2 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                    >
                      {stat.value}
                    </motion.span>

                    <SilhouettesIcon isHovered={isHovered} />

                    <motion.span
                      className="text-[17px] font-medium text-dark leading-snug"
                      animate={{
                        x: isHovered ? 2 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                    >
                      {stat.label}
                    </motion.span>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Responsive Stage (< 1280px) */}
      <div
        ref={mobileStatsScrollRef}
        className="xl:hidden w-full flex items-center gap-6 overflow-x-auto pt-10 pb-8 no-scrollbar px-[calc(50%-92px)] sm:px-[calc(50%-110px)] snap-x snap-mandatory justify-start relative"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.id}
            ref={index === 2 ? middleStatsCardRef : undefined}
            className="relative shrink-0 snap-center w-[185px] sm:w-[220px] h-[240px] sm:h-[250px] bg-white rounded-[10px] border border-[#E3E3E3] shadow-md p-4 sm:p-5 flex flex-col justify-between text-left cursor-grab active:cursor-grabbing"
            style={{
              transformOrigin: "top center",
              rotate: stat.rotate * 0.5,
            }}
            whileHover={{
              scale: 1.03,
              y: 4,
              rotate: stat.rotate * 0.5 + 2,
              boxShadow: "0 16px 32px -8px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{
              scale: 0.98,
              y: 6,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <PinClip color={stat.clipColor} />

            {stat.isImage ? (
              <div className="relative w-full h-full rounded-[6px] overflow-hidden">
                <Image
                  src="/assets/hero-card-img.jpeg"
                  alt="Campus event"
                  fill
                  sizes="236px"
                  className="object-cover"
                />
              </div>
            ) : (
              <>
                <span className="text-xl sm:text-2xl font-bold text-dark">
                  {stat.value}
                </span>
                <SilhouettesIcon />
                <span className="text-sm sm:text-base font-medium text-dark">
                  {stat.label}
                </span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
