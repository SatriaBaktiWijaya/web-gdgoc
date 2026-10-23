"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <main
      className="fixed inset-0 z-[100] min-h-screen w-full bg-surface overflow-y-auto flex flex-col items-center justify-center p-4 sm:p-6"
      role="main"
    >
      <title>404: Page Not Found | GDG On Campus</title>

      {/* Background Grid Pattern */}
      <div
        data-testid="not-found-grid"
        className="absolute inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40"
      />

      {/* Ambient Google Color Glow Blurs */}
      <div
        aria-hidden="true"
        className="absolute top-8 left-8 w-64 sm:w-80 h-64 sm:h-80 bg-[#4285F4]/15 rounded-full blur-[90px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-8 w-64 sm:w-80 h-64 sm:h-80 bg-[#EA4335]/12 rounded-full blur-[90px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-12 left-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-[#F9AB00]/12 rounded-full blur-[90px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 right-8 w-64 sm:w-80 h-64 sm:h-80 bg-[#34A853]/15 rounded-full blur-[90px] pointer-events-none"
      />

      {/* Top-Left Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-50 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-dark text-sm font-medium shadow-sm hover:bg-[#F5F5F5] hover:border-[#D5D5D5] transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4383F3]/40"
        aria-label="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back</span>
      </button>

      {/* Main Content Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-md border border-[#E9E9E9] rounded-2xl p-6 sm:p-10 shadow-lg text-center flex flex-col items-center">
        {/* Tech Corner Brackets in Google Brand Colors */}
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#4285F4] pointer-events-none rounded-tl-sm"
        />
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#EA4335] pointer-events-none rounded-tr-sm"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#34A853] pointer-events-none rounded-bl-sm"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#F9AB00] pointer-events-none rounded-br-sm"
        />

        {/* GDG Brand Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 group mb-4 transition-transform hover:scale-[1.02]"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
            <Image
              src="/assets/gdg-logo.png"
              alt="Google Developer Groups On Campus logo"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm sm:text-[15px] leading-tight text-dark tracking-tight">
              Google Developer Groups
            </span>
            <span className="text-[11px] sm:text-xs leading-tight text-dark font-normal mt-0.5">
              <span className="text-[#4383F3] font-medium">On Campus</span> • Telkom University Purwokerto
            </span>
          </div>
        </Link>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F1FF] border border-[#4383F3]/25 text-[#4383F3] text-xs font-semibold uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4383F3] animate-pulse" />
          <span>Error 404 • Not Found</span>
        </div>

        {/* Heroic 404 Number with Google Colors */}
        <div
          role="img"
          aria-label="404 Error"
          className="font-black tracking-tight text-7xl sm:text-8xl md:text-9xl select-none my-1 flex items-center justify-center font-sans"
        >
          <span className="text-[#4285F4] transition-transform hover:scale-105 inline-block">4</span>
          <span className="text-[#EA4335] mx-1 sm:mx-2 relative inline-block transition-transform hover:scale-105">
            0
            {/* Accent dot under 0 */}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F9AB00]"
            />
          </span>
          <span className="text-[#34A853] transition-transform hover:scale-105 inline-block">4</span>
        </div>

        {/* Heading & Description */}
        <h1 className="text-dark text-2xl sm:text-3xl font-bold tracking-tight text-center mt-2">
          Page Not Found
        </h1>
        <p className="text-gray-medium text-sm sm:text-base max-w-sm sm:max-w-md text-center mt-3 leading-relaxed">
          Oops! Looks like you took a wrong turn in tech. The page you are looking for doesn&apos;t exist, has been removed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-7">
          <Link
            href="/"
            className="w-full sm:w-auto sm:flex-1 h-[44px] px-5 bg-[#4383F3] hover:bg-[#3876e0] text-white font-medium text-[15px] rounded-[10px] inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4383F3]/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Back to Home</span>
          </Link>

          <Link
            href="/#community"
            className="w-full sm:w-auto sm:flex-1 h-[44px] px-5 bg-white hover:bg-[#F5F5F5] border border-[#E3E3E3] text-dark font-medium text-[15px] rounded-[10px] inline-flex items-center justify-center gap-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-medium"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.199l-.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.999-3.199a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <span>Explore Community</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
