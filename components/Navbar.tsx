"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

interface NavbarProps {
  active?: "Explore" | "Community" | "Core Team" | "Events" | string;
}

export default function Navbar({ active: activeProp }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  const pathname = usePathname();

  const [isHeroSection, setIsHeroSection] = useState(pathname === "/");
  const [activeSection, setActiveSection] = useState<string>("Explore");

  const isProgrammaticScroll = useRef(false);
  const programmaticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startProgrammaticScroll = useCallback(() => {
    isProgrammaticScroll.current = true;
    setIsVisible(true);
    if (programmaticTimerRef.current) {
      clearTimeout(programmaticTimerRef.current);
    }
    programmaticTimerRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  }, []);

  // Cancel programmatic lock if user manually scrolls with wheel or touch
  useEffect(() => {
    const cancelProgrammatic = () => {
      isProgrammaticScroll.current = false;
    };
    window.addEventListener("wheel", cancelProgrammatic, { passive: true });
    window.addEventListener("touchmove", cancelProgrammatic, { passive: true });
    return () => {
      window.removeEventListener("wheel", cancelProgrammatic);
      window.removeEventListener("touchmove", cancelProgrammatic);
      if (programmaticTimerRef.current) {
        clearTimeout(programmaticTimerRef.current);
      }
    };
  }, []);

  // Smooth fast scrolling on anchor link click
  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      itemName: string
    ) => {
      if (pathname === "/") {
        if (href === "/") {
          e.preventDefault();
          startProgrammaticScroll();
          setActiveSection("Explore");
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
          return;
        }

        if (href.startsWith("/#")) {
          e.preventDefault();
          const targetId = href.replace("/#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            startProgrammaticScroll();
            setActiveSection(itemName);
            const navbarOffset = 80;
            const targetTop =
              targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
            window.scrollTo({
              top: Math.max(0, targetTop),
              behavior: "smooth",
            });
            window.history.pushState(null, "", `#${targetId}`);
          }
          return;
        }
      }
    },
    [pathname, startProgrammaticScroll]
  );

  // Initial hash navigation scroll handling on mount
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const targetId = hash.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navbarOffset = 80;
        const targetTop =
          targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
        const timer = setTimeout(() => {
          if (targetId === "community") setActiveSection("Community");
          if (targetId === "events") setActiveSection("Events");
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth",
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Handle browser back/forward navigation for hash
  useEffect(() => {
    const handleHashChange = () => {
      if (pathname !== "/") return;
      const hash = window.location.hash;
      if (hash === "#events") {
        const el = document.getElementById("events");
        if (el) {
          startProgrammaticScroll();
          setActiveSection("Events");
          window.scrollTo({
            top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80),
            behavior: "smooth",
          });
        }
      } else if (hash === "#community") {
        const el = document.getElementById("community");
        if (el) {
          startProgrammaticScroll();
          setActiveSection("Community");
          window.scrollTo({
            top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80),
            behavior: "smooth",
          });
        }
      } else if (!hash || hash === "#") {
        startProgrammaticScroll();
        setActiveSection("Explore");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, startProgrammaticScroll]);

  // High-precision scroll-spy section detection & navbar visibility
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.dataset.mounted = "true";
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // 1. Navbar visibility (hide on scroll down, show on scroll up)
        if (isProgrammaticScroll.current) {
          setIsVisible(true);
          lastScrollY.current = currentScrollY;
        } else {
          if (currentScrollY <= 15) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }
          lastScrollY.current = currentScrollY;
        }

        // 2. Homepage scroll-spy and hero section detection
        if (pathname === "/") {
          const heroEl = document.querySelector("main section");
          if (heroEl) {
            setIsHeroSection(heroEl.getBoundingClientRect().bottom > 86);
          } else {
            setIsHeroSection(currentScrollY < 650);
          }

          if (!isProgrammaticScroll.current) {
            const communityEl = document.getElementById("community");
            const eventsEl = document.getElementById("events");

            const communityTop = communityEl
              ? communityEl.getBoundingClientRect().top + currentScrollY
              : Infinity;
            const eventsTop = eventsEl
              ? eventsEl.getBoundingClientRect().top + currentScrollY
              : Infinity;

            const isAtBottom =
              window.innerHeight + currentScrollY >=
              document.documentElement.scrollHeight - 50;

            if (currentScrollY < 100) {
              setActiveSection("Explore");
            } else if (isAtBottom && eventsEl) {
              setActiveSection("Events");
            } else if (eventsEl && currentScrollY + 200 >= eventsTop) {
              setActiveSection("Events");
            } else if (communityEl && currentScrollY + 200 >= communityTop) {
              setActiveSection("Community");
            } else {
              setActiveSection("Explore");
            }
          }
        } else {
          setIsHeroSection(false);
        }

        ticking = false;
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Resolve active item according to route and scroll-spy section
  let activeItem: string | null = null;
  if (activeProp) {
    activeItem = activeProp;
  } else if (pathname === "/signin" || pathname === "/signup") {
    activeItem = null;
  } else if (pathname.startsWith("/core-team")) {
    activeItem = "Core Team";
  } else if (pathname === "/") {
    activeItem = activeSection;
  }

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const targetItem = hoveredItem ?? activeItem;

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const [isReady, setIsReady] = useState(false);

  const updateIndicator = useCallback(() => {
    if (!targetItem || !navRef.current) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = itemRefs.current[targetItem];
    if (!targetEl) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setIndicatorStyle({
      left: targetRect.left - navRect.left,
      top: targetRect.top - navRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
    });
  }, [targetItem]);

  useEffect(() => {
    updateIndicator();
    const rafId = requestAnimationFrame(() => {
      updateIndicator();
    });
    const timer = setTimeout(() => {
      updateIndicator();
      setIsReady(true);
    }, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  const navItems = [
    { name: "Explore", href: "/" },
    { name: "Community", href: "/#community" },
    { name: "Core Team", href: "/core-team" },
    { name: "Events", href: "/#events" },
  ];

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center bg-transparent transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Desktop Navbar (Exact Figma Shape & Coordinates >= 1280px) */}
      <div className="hidden xl:block relative w-full max-w-[1440px] mx-auto h-[86px]">
        {/* SVG Container Shape with Top Wings */}
        <svg
          viewBox="0 0 1440 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute top-0 left-0 w-full h-[92px] pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 ${
            isHeroSection ? "backdrop-blur-md" : ""
          }`}
          preserveAspectRatio="none"
        >
          <path
            d="M123 0H129.294C144.758 0 157.294 12.536 157.294 28V58C157.294 73.464 169.83 86 185.294 86H1253.73C1269.19 86 1281.73 73.464 1281.73 58V28C1281.73 12.536 1294.27 0 1309.73 0H1317H123Z"
            fill={isHeroSection ? "#E5E5E5" : "#FAFAFA"}
            fillOpacity={isHeroSection ? 0.85 : 1}
            stroke="#E5E5E5"
            strokeWidth="1"
            className="transition-all duration-300"
          />
        </svg>

        {/* Content overlaid on navbar: matches Figma layout precisely */}
        <div className="relative z-10 w-full h-[86px] flex items-center justify-between px-[14%] 2xl:px-[199px]">
          {/* Logo & Brand text (x=199px in Figma) */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/", "Explore")}
            className="flex items-center gap-3.5 group shrink-0"
          >
            <div className="relative w-[52px] h-[52px] shrink-0">
              <Image
                src="/assets/gdg-logo.png"
                alt="Google Developer Groups"
                fill
                sizes="52px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-[15px] xl:text-[16px] leading-tight text-dark tracking-tight whitespace-nowrap">
                Google Developer Groups
              </span>
              <span className="text-[11px] xl:text-[12px] leading-tight text-dark font-normal mt-0.5 whitespace-nowrap">
                <span className="text-[#4383F3] font-medium">On Campus</span> • Telkom University Purwokerto
              </span>
            </div>
          </Link>

          {/* Nav Items (Center, x=586px to 1080px in Figma) */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative flex items-center gap-4 xl:gap-7"
          >
            {/* Sliding Active/Hover Indicator */}
            <div
              className={`absolute pointer-events-none ${
                isReady
                  ? "transition-all duration-300 ease-out"
                  : "transition-opacity duration-150"
              }`}
              style={{
                left: `${indicatorStyle.left}px`,
                top: `${indicatorStyle.top}px`,
                width: `${indicatorStyle.width}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
              }}
            >
              {/* Inner dashed box: stroke #4285F4 12%, strokeDasharray="7 5" */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="#4285F4"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                  strokeDasharray="7 5"
                />
              </svg>

              {/* 4 Outer Corner Tech Brackets */}
              <span className="absolute -top-2 -left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#4383F3] pointer-events-none" />
              <span className="absolute -top-2 -right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#4383F3] pointer-events-none" />
              <span className="absolute -bottom-2 -left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#4383F3] pointer-events-none" />
              <span className="absolute -bottom-2 -right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#4383F3] pointer-events-none" />
            </div>

            {navItems.map((item) => {
              const isCurrent = targetItem === item.name;
              return (
                <Link
                  key={item.name}
                  ref={(el) => {
                    itemRefs.current[item.name] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  className="relative px-4 py-1.5 flex items-center justify-center text-[15px] select-none"
                >
                  <span
                    className={
                      isCurrent
                        ? "text-[#4383F3] font-medium text-[15px] transition-colors duration-200"
                        : "text-dark/80 hover:text-[#4383F3] font-medium text-[15px] transition-colors duration-200"
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Sign In CTA Button (x=1133px, w=108px, h=43px, rx=10px) */}
          <Link
            href="/signin"
            className="shrink-0 w-[108px] h-[43px] bg-[#4383F3] hover:bg-[#3876e0] text-white font-medium text-[15px] rounded-[10px] flex items-center justify-center transition-all shadow-sm active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Tablet & Mobile Floating Navbar (< 1280px) */}
      <div
        className={`xl:hidden w-[calc(100%-1.5rem)] max-w-3xl mt-3 rounded-2xl shadow-lg px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${
          isHeroSection
            ? "bg-[#E5E5E5]/85 backdrop-blur-md border border-[#D5D5D5]"
            : "bg-[#FAFAFA]/95 backdrop-blur-md border border-[#E5E5E5]"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, "/", "Explore");
            }}
            className="flex items-center gap-2 sm:gap-2.5 min-w-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <Image
                src="/assets/gdg-logo.png"
                alt="Google Developer Groups"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-xs sm:text-sm leading-tight text-dark truncate">
                GDG On Campus
              </span>
              <span className="text-[10px] text-gray-medium leading-tight truncate">
                Telkom Univ Purwokerto
              </span>
            </div>
          </Link>

          {/* Tablet Nav Links (768px - 1279px) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`transition-colors ${
                  activeItem === item.name
                    ? "text-[#4383F3] font-semibold"
                    : "text-dark/75 hover:text-[#4383F3]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/signin"
              className="text-xs sm:text-sm font-medium bg-[#4383F3] text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-[8px] hover:bg-[#3876e0] transition-colors shrink-0"
            >
              Sign In
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-dark rounded-lg hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer (< 768px) */}
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-1 pt-3 mt-3 border-t border-[#E5E5E5]/80">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, item.href, item.name);
                }}
                className={`py-2.5 px-3 min-h-[44px] flex items-center rounded-lg text-sm font-medium transition-colors ${
                  activeItem === item.name
                    ? "bg-[#4383F3]/10 text-[#4383F3]"
                    : "text-dark/80 hover:text-[#4383F3] hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
