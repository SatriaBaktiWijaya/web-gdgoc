"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import EventCard from "@/components/dashboard/EventCard";

function DashboardOverviewContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "late" ? "late" : "new";
  const [memberView, setMemberView] = useState<"new" | "late">(initialView);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const isLate = memberView === "late";

  const announcements = [
    {
      title: "Open Recruitment GDGoC TelU Purwokerto",
      body: "We are excited to announce that the open recruitment for gdgoc TelU Purwokerto is officialy open!",
      date: "12 Oct 2025",
    },
    {
      title: "Kirim Screenshot mu disini guys lorem ipsum dolor",
      body: "We are excited to announce that the open recruitment for gdgoc TelU Purwokerto is officialy open!",
      date: "12 Oct 2025",
    },
    {
      title: "Open Recruitment GDGoC TelU Purwokerto",
      body: "We are excited to announce that the open recruitment for gdgoc TelU Purwokerto is officialy open!",
      date: "12 Oct 2025",
    },
    {
      title: "Open Recruitment GDGoC TelU Purwokerto",
      body: "We are excited to announce that the open recruitment for gdgoc TelU Purwokerto is officialy open!",
      date: "12 Oct 2025",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Skill Camp 3",
      subtitle: "Ukasya, Dharmaa",
      date: "16 May 2026",
      imageSrc: "/assets/dashboard/event-poster-1.png",
    },
    {
      id: 2,
      title: "Skill Camp 3",
      subtitle: "Hacker Team",
      date: "Feb 8th 2026",
      imageSrc: "/assets/dashboard/event-poster-2.png",
    },
    {
      id: 3,
      title: "Skill Camp 3",
      subtitle: "Education Team",
      date: "Feb 8th 2026",
      imageSrc: "/assets/dashboard/event-poster-3.png",
    },
    {
      id: 4,
      title: "Skill Camp 3",
      subtitle: "Back End Dev",
      date: "Feb 8th 2026",
      imageSrc: "/assets/dashboard/event-poster-4.png",
    },
    {
      id: 5,
      title: "Skill Camp 3",
      subtitle: "UI/UX Design",
      date: "Feb 8th 2026",
      imageSrc: "/assets/dashboard/event-poster-5.png",
    },
    {
      id: 6,
      title: "Skill Camp 3",
      subtitle: "Mobile Dev",
      date: "Feb 8th 2026",
      imageSrc: "/assets/dashboard/event-poster-6.png",
    },
  ];

  return (
    <DashboardLayout
      activeItem="Overview"
      breadcrumb="Home/Overview"
      memberView={memberView}
      onToggleMemberView={setMemberView}
    >
      <div className="space-y-7 pb-10">
        {/* 1. Hero Section */}
        {isLate ? (
          /* Late Member Hero (Full-width Banner + 3 Stat Cards) */
          <div className="space-y-4">
            <div className="relative w-full min-h-[208px] bg-[#4383F3] rounded-[8px] p-6 sm:p-7 text-white overflow-hidden flex flex-col justify-between">
              {/* Subtle background grid pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Decorative Right Illustration Graphics */}
              <div className="absolute right-0 top-0 bottom-0 w-[380px] hidden md:block pointer-events-none overflow-hidden">
                {/* Light blue circular backdrop */}
                <div className="absolute -right-10 -top-10 w-[320px] h-[320px] rounded-full bg-[#8FB8FF]/50" />
                {/* Tilted window card */}
                <div
                  className="absolute right-12 top-6 w-[200px] h-[190px] bg-[#FAFAFA] rounded-[6px] shadow-lg border border-white/40 p-2.5 flex flex-col items-center justify-center transform -rotate-12"
                >
                  <div className="w-full flex items-center gap-1 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9AB00]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  </div>
                  {/* GDG Logo inside window */}
                  <svg width="60" height="34" viewBox="0 0 67 40" fill="none">
                    <path
                      d="M26.0908 2.7C29.4955 0.05 34.3558 0.56 37.1416 3.79L37.4043 4.11C40.138 7.63 39.5056 12.69 35.9912 15.43L30.1123 20L35.9912 24.57L36.3115 24.83C39.5416 27.62 40.0527 32.48 37.4043 35.89L37.1416 36.21C34.4455 39.33 29.8071 39.91 26.4248 37.55L26.0908 37.3L12.1123 26.43C10.0312 24.81 8.96069 22.37 9.00098 19.92C9.0058 17.66 9.96152 15.41 11.791 13.83L12.1113 13.57L26.0908 2.7Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M47.9619 3.79C50.7478 0.56 55.608 0.05 59.0127 2.7L72.9912 13.57L73.3115 13.83C75.1748 15.44 76.1313 17.74 76.1006 20.05C76.103 22.45 75.0367 24.84 72.9912 26.43L59.0117 37.3L58.6787 37.55C55.2964 39.91 50.657 39.33 47.9609 36.21L47.6982 35.89C45.05 32.48 45.5611 27.62 48.791 24.83L49.1113 24.57L54.9902 20L49.1123 15.43C45.5976 12.69 44.9644 7.63 47.6982 4.11L47.9619 3.79Z"
                      fill="#34A853"
                    />
                    <path
                      d="M21.3984 14.49C18.3198 12.09 13.8821 12.65 11.4873 15.73C10.4761 17.03 9.99335 18.57 10.002 20.1C10.0345 21.56 10.5197 23.03 11.4873 24.27C13.8819 27.35 18.3188 27.9 21.3975 25.51L28.4834 20L21.3984 14.49Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M49.7256 25.36C46.6473 27.76 46.093 32.19 48.4873 35.27C50.8819 38.35 55.3188 38.9 58.3975 36.51L69.5195 27.86C67.4582 28.24 65.2573 27.83 63.4248 26.55L63.0908 26.3L55.8047 20.63L49.7256 25.36Z"
                      fill="#F9AB00"
                    />
                  </svg>
                </div>
                {/* Floating colored bars */}
                <div className="absolute right-6 top-16 w-3 h-10 bg-[#EA4335] rounded-full transform rotate-45" />
                <div className="absolute right-52 top-8 w-3.5 h-12 bg-[#F9AB00] rounded-full transform -rotate-30" />
                <div className="absolute right-12 bottom-6 w-3 h-10 bg-white rounded-full transform rotate-45" />
              </div>

              {/* Text content */}
              <div className="relative z-10 max-w-xl">
                <span className="text-[13px] font-medium text-white/90">
                  Welcome Back
                </span>
                <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white mt-1">
                  Leclerc, Ready for the Challenge?
                </h2>
                <p className="text-[13px] text-white/85 mt-2 max-w-md leading-relaxed">
                  Ready to innovate? Work with your project team or discover ongoing Googlle Solution Challange initiativess
                </p>
              </div>

              <div className="relative z-10 mt-5">
                <button
                  type="button"
                  className="bg-[#FAFAFA] hover:bg-white active:scale-95 text-[#1E1E1E] font-medium text-[13px] px-4 py-2 rounded-[7px] shadow-xs transition-all"
                >
                  See Whats New
                </button>
              </div>
            </div>

            {/* 3 Stats Row (Late Member only) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E3E3E3] rounded-[8px] p-5 shadow-xs flex flex-col justify-between h-[100px]">
                <div className="flex items-center gap-2 text-gray-medium text-[13px]">
                  <svg className="w-4 h-4 text-[#4383F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Team Members</span>
                </div>
                <div className="font-bold text-2xl text-dark">12</div>
              </div>

              <div className="bg-white border border-[#E3E3E3] rounded-[8px] p-5 shadow-xs flex flex-col justify-between h-[100px]">
                <div className="flex items-center gap-2 text-gray-medium text-[13px]">
                  <svg className="w-4 h-4 text-[#4383F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Active Projects</span>
                </div>
                <div className="font-bold text-2xl text-dark">3</div>
              </div>

              <div className="bg-white border border-[#E3E3E3] rounded-[8px] p-5 shadow-xs flex flex-col justify-between h-[100px]">
                <div className="flex items-center gap-2 text-gray-medium text-[13px]">
                  <svg className="w-4 h-4 text-[#4383F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    <text x="12" y="17" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor">12</text>
                  </svg>
                  <span>Upcoming Deadlines</span>
                </div>
                <div className="font-bold text-2xl text-dark">2</div>
              </div>
            </div>
          </div>
        ) : (
          /* New Member Hero (Welcome Aboard Hamilton + Got an Idea? Let's Build It.) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Card: Welcome Aboard Hamilton! (w=803px in Figma) */}
            <div className="lg:col-span-8 relative min-h-[208px] bg-[#4383F3] rounded-[8px] p-6 sm:p-7 text-white overflow-hidden flex flex-col justify-between">
              {/* Subtle background grid pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #FFFFFF 1.5px, transparent 1.5px), linear-gradient(to bottom, #FFFFFF 1.5px, transparent 1.5px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Decorative Right Illustration Graphics */}
              <div className="absolute right-0 top-0 bottom-0 w-[340px] hidden sm:block pointer-events-none overflow-hidden">
                <div className="absolute -right-8 -top-8 w-[280px] h-[280px] rounded-full bg-[#8FB8FF]/50" />
                <div className="absolute right-8 top-5 w-[180px] h-[175px] bg-[#FAFAFA] rounded-[6px] shadow-lg border border-white/40 p-2 flex flex-col items-center justify-center transform -rotate-12">
                  <div className="w-full flex items-center gap-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F9AB00]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  </div>
                  <svg width="54" height="30" viewBox="0 0 67 40" fill="none">
                    <path
                      d="M26.0908 2.7C29.4955 0.05 34.3558 0.56 37.1416 3.79L37.4043 4.11C40.138 7.63 39.5056 12.69 35.9912 15.43L30.1123 20L35.9912 24.57L36.3115 24.83C39.5416 27.62 40.0527 32.48 37.4043 35.89L37.1416 36.21C34.4455 39.33 29.8071 39.91 26.4248 37.55L26.0908 37.3L12.1123 26.43C10.0312 24.81 8.96069 22.37 9.00098 19.92C9.0058 17.66 9.96152 15.41 11.791 13.83L12.1113 13.57L26.0908 2.7Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M47.9619 3.79C50.7478 0.56 55.608 0.05 59.0127 2.7L72.9912 13.57L73.3115 13.83C75.1748 15.44 76.1313 17.74 76.1006 20.05C76.103 22.45 75.0367 24.84 72.9912 26.43L59.0117 37.3L58.6787 37.55C55.2964 39.91 50.657 39.33 47.9609 36.21L47.6982 35.89C45.05 32.48 45.5611 27.62 48.791 24.83L49.1113 24.57L54.9902 20L49.1123 15.43C45.5976 12.69 44.9644 7.63 47.6982 4.11L47.9619 3.79Z"
                      fill="#34A853"
                    />
                    <path
                      d="M21.3984 14.49C18.3198 12.09 13.8821 12.65 11.4873 15.73C10.4761 17.03 9.99335 18.57 10.002 20.1C10.0345 21.56 10.5197 23.03 11.4873 24.27C13.8819 27.35 18.3188 27.9 21.3975 25.51L28.4834 20L21.3984 14.49Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M49.7256 25.36C46.6473 27.76 46.093 32.19 48.4873 35.27C50.8819 38.35 55.3188 38.9 58.3975 36.51L69.5195 27.86C67.4582 28.24 65.2573 27.83 63.4248 26.55L63.0908 26.3L55.8047 20.63L49.7256 25.36Z"
                      fill="#F9AB00"
                    />
                  </svg>
                </div>
                <div className="absolute right-4 top-14 w-2.5 h-8 bg-[#EA4335] rounded-full transform rotate-45" />
                <div className="absolute right-44 top-6 w-3 h-10 bg-[#F9AB00] rounded-full transform -rotate-30" />
                <div className="absolute right-8 bottom-4 w-2.5 h-8 bg-white rounded-full transform rotate-45" />
              </div>

              {/* Text content */}
              <div className="relative z-10 max-w-md">
                <span className="text-[13px] font-medium text-white/90">
                  Welcome to GDGOC
                </span>
                <h2 className="text-2xl sm:text-[27px] font-bold tracking-tight text-white mt-1">
                  Welcome Aboard Hamilton!
                </h2>
                <p className="text-[12.5px] text-white/85 mt-2 leading-relaxed">
                  Ready to innovate? Work with your project team or discover ongoing Googlle Solution Challange initiativess
                </p>
              </div>

              <div className="relative z-10 mt-5">
                <button
                  type="button"
                  className="bg-[#FAFAFA] hover:bg-white active:scale-95 text-[#1E1E1E] font-medium text-[13px] px-4 py-2 rounded-[7px] shadow-xs transition-all"
                >
                  Lets Get Started
                </button>
              </div>
            </div>

            {/* Right Card: Got an Idea? Let's Build It. (w=321px in Figma) */}
            <div className="lg:col-span-4 relative min-h-[208px] bg-white border border-[#E3E3E3] rounded-[8px] p-6 flex flex-col justify-between overflow-hidden shadow-xs">
              {/* Pastel gradient shapes in background */}
              <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-[#FCE8E6]/70 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#E9F1FF] blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-bold text-[20px] text-dark leading-snug">
                  Got an Idea? Let’s Build It.
                </h3>
                <p className="text-[12px] text-gray-medium mt-1.5 leading-relaxed">
                  Bring your team together and turn your next big idea into a project.
                </p>
              </div>

              <div className="relative z-10 mt-4">
                <Link
                  href="/dashboard/team"
                  className="w-full h-[41px] bg-[#4383F3] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[13.5px] rounded-full flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <span>Create Your Team</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. Community Announcements Section */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-semibold text-[17px] text-dark tracking-tight">
              Community Announcements
            </h3>
            <button
              type="button"
              className="text-[#4383F3] hover:underline text-[13px] font-medium"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((item, idx) => (
              <AnnouncementCard
                key={idx}
                title={item.title}
                body={item.body}
                date={item.date}
              />
            ))}
          </div>
        </section>

        {/* 3. Team Member & Task Section (2 Columns) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Team Member (w=588px in Figma) */}
          <div className="lg:col-span-7 flex flex-col">
            <h3 className="font-semibold text-[17px] text-dark tracking-tight mb-3">
              Team Member
            </h3>

            <div className="bg-white border border-[#E3E3E3] rounded-[8px] p-5 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                {/* Header row inside card */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-dark/70 font-normal">
                    My Team
                  </span>
                  <span className="bg-[#FEF7E0] text-[#F9AB00] text-[11px] font-medium px-2.5 py-0.5 rounded-[4px]">
                    Pending Approval
                  </span>
                </div>

                {/* Team Info */}
                <div className="flex items-start gap-3.5 mt-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#4383F3] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[16px] text-dark tracking-tight">
                      Team Sigma
                    </h4>
                    <p className="text-[12px] text-dark/70 font-normal">
                      Google Solution Challenge Team • 2026
                    </p>
                    <p className="text-[12px] text-gray-medium mt-1 leading-relaxed">
                      Build innovative solutions to create a positive impact through technology
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-[#E8F0FE] text-[#4383F3] text-[11px] font-medium px-2.5 py-1 rounded-[4px]">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Hipster Team</span>
                      </span>
                      <span className="border border-[#E3E3E3] text-gray-medium text-[11px] font-normal px-2.5 py-1 rounded-[4px]">
                        Created on 8 oct 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="mt-5 pt-4 border-t border-[#E3E3E3] flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex -space-x-1.5">
                    <div className="w-[27px] h-[27px] rounded-full bg-white border border-[#E3E3E3] flex items-center justify-center text-[10.5px] font-semibold text-dark shadow-xs">
                      L
                    </div>
                    <div className="w-[27px] h-[27px] rounded-full bg-white border border-[#E3E3E3] flex items-center justify-center text-[10.5px] font-semibold text-dark shadow-xs">
                      C
                    </div>
                    <div className="w-[27px] h-[27px] rounded-full bg-white border border-[#E3E3E3] flex items-center justify-center text-[10.5px] font-semibold text-dark shadow-xs">
                      C
                    </div>
                    <div className="w-[27px] h-[27px] rounded-full bg-[#E3E3E3] border border-[#E3E3E3] flex items-center justify-center text-[10px] font-medium text-dark/80 shadow-xs">
                      +2
                    </div>
                  </div>
                  <span className="text-[12px] text-dark/75 font-normal ml-3">
                    Team Members
                  </span>
                </div>

                <Link
                  href="/dashboard/team"
                  className="h-[35px] px-4 bg-[#4383F3] hover:bg-[#3876e0] active:scale-95 text-white font-medium text-[12.5px] rounded-[4px] flex items-center justify-center transition-all shadow-xs"
                >
                  View Team Details
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Task (w=532px in Figma) */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="font-semibold text-[17px] text-dark tracking-tight mb-3">
              Task
            </h3>

            <div className="bg-white border border-[#E3E3E3] rounded-[8px] p-5 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                {/* Header row inside card */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-dark/70 font-normal">
                    Task
                  </span>
                  <span className="bg-[#FCE8E6] text-[#EA4335] text-[11px] font-medium px-2.5 py-0.5 rounded-[4px]">
                    Not Done Yet
                  </span>
                </div>

                {/* Task Info */}
                <div className="flex items-start gap-3.5 mt-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#FCE8E6] flex items-center justify-center text-[#EA4335] shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[16px] text-dark tracking-tight">
                      Nama Tugas
                    </h4>
                    <p className="text-[12px] text-dark/70 font-normal">
                      Google Solution Challenge • 2026
                    </p>
                    <p className="text-[12px] text-gray-medium mt-1 leading-relaxed">
                      Keterangan Tugas
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-[#E8F0FE] text-[#4383F3] text-[11px] font-medium px-2.5 py-1 rounded-[4px]">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Hipster Team</span>
                      </span>
                      <span className="border border-[#E3E3E3] text-gray-medium text-[11px] font-normal px-2.5 py-1 rounded-[4px]">
                        Created on 8 oct 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="mt-5 pt-4 border-t border-[#E3E3E3] flex items-center justify-between">
                <span className="text-[12px] text-dark/75 font-normal">
                  Finish it before you get finished :p
                </span>

                <Link
                  href="/dashboard/team"
                  className="h-[35px] px-4 bg-[#4383F3] hover:bg-[#3876e0] active:scale-95 text-white font-medium text-[12.5px] rounded-[4px] flex items-center justify-center transition-all shadow-xs"
                >
                  View Team Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Previous Events Carousel Section */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-semibold text-[17px] text-dark tracking-tight">
              Previous Events
            </h3>

            {/* Left and Right Navigation Buttons (31x31 in Figma) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Previous events"
                className="w-[31px] h-[31px] rounded-[3.5px] bg-white border border-[#E3E3E3] flex items-center justify-center text-dark hover:bg-gray-50 active:scale-95 transition-all shadow-2xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Next events"
                className="w-[31px] h-[31px] rounded-[3.5px] bg-white border border-[#E3E3E3] flex items-center justify-center text-dark hover:bg-gray-50 active:scale-95 transition-all shadow-2xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {events.map((ev) => (
              <EventCard
                key={ev.id}
                id={ev.id}
                title={ev.title}
                subtitle={ev.subtitle}
                date={ev.date}
                imageSrc={ev.imageSrc}
                href="/dashboard/events/workshop"
              />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-medium">Loading dashboard...</div>}>
      <DashboardOverviewContent />
    </Suspense>
  );
}
