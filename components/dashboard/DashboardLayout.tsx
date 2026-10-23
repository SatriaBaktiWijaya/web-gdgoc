"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem?: "Overview" | "My Team" | "Task" | "Settings" | "Deadline Events";
  breadcrumb?: string;
  memberView?: "new" | "late";
  onToggleMemberView?: (view: "new" | "late") => void;
}

export default function DashboardLayout({
  children,
  activeItem = "Overview",
  breadcrumb = "Home/Overview",
  memberView = "new",
  onToggleMemberView,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isLate = memberView === "late";
  const userAvatar = isLate
    ? "/assets/dashboard/leclerc-avatar.png"
    : "/assets/dashboard/hamilton-avatar.png";
  const userName = isLate ? "Charles Leclerc" : "Lewis Hamilton";

  // Determine active item from prop or pathname
  let currentActive = activeItem;
  if (pathname.includes("/dashboard/team")) {
    currentActive = "My Team";
  } else if (pathname.includes("/dashboard/settings")) {
    currentActive = "Settings";
  } else if (pathname.includes("/dashboard/events")) {
    currentActive = "Deadline Events";
  } else if (pathname.includes("/dashboard/task")) {
    currentActive = "Task";
  } else if (pathname === "/dashboard") {
    currentActive = "Overview";
  }

  const navItems = [
    {
      label: "MAIN",
      items: [
        {
          name: "Overview",
          href: "/dashboard",
          icon: (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
        },
        {
          name: "My Team",
          href: "/dashboard/team",
          icon: (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
        {
          name: "Task",
          href: "/dashboard/task",
          icon: (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          ),
        },
      ],
    },
    {
      label: "SCHEDULE & SUBMISSION",
      items: [
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      label: "SCHEDULE & SUBMISSION",
      items: [
        {
          name: "Deadline Events",
          href: "/dashboard/events/workshop",
          icon: (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              <text x="12" y="17" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor">12</text>
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface flex text-dark antialiased">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop 265px, Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[265px] bg-white border-r border-[#E3E3E3] flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header (x=16, y=11 in Figma) */}
          <div className="h-[64px] px-4 flex items-center justify-between border-b border-[#F0F0F0]">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="relative w-[38px] h-[38px] shrink-0">
                <Image
                  src="/assets/dashboard/gdg-logo-square.png"
                  alt="GDG Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-[15px] leading-tight text-dark tracking-tight">
                  GDG TelUP
                </span>
                <span className="text-[11.5px] leading-tight text-gray-medium font-normal mt-0.5">
                  Member Hub
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-medium hover:text-dark p-1 rounded-md transition-colors"
              title="Sidebar layout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth={1.6} />
                <path d="M9 4v16" strokeWidth={1.6} />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-6">
            {navItems.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <span className="px-3 text-[11px] font-semibold text-gray-medium tracking-wider uppercase block">
                  {group.label}
                </span>

                <div className="space-y-1 mt-1">
                  {group.items.map((item) => {
                    const isActive = currentActive === item.name;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-all ${
                          isActive
                            ? "bg-[#E9F1FF] text-[#4383F3]"
                            : "text-dark/70 hover:bg-[#F8F9FA] hover:text-[#4383F3]"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] bg-[#4383F3] rounded-r-[1.5px]" />
                        )}
                        <span className={isActive ? "text-[#4383F3]" : "text-gray-medium"}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer User Profile (Figma bottom card) */}
        <div className="p-3">
          <div className="bg-[#F6F6F6] border border-[#EDEDED] rounded-[8px] p-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden border border-[#E6E6E6] bg-white shrink-0">
                  <Image
                    src={userAvatar}
                    alt={userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-[13.5px] leading-tight text-dark tracking-tight">
                    {userName}
                  </span>
                  <span className="text-[11.5px] text-gray-medium leading-tight mt-0.5">
                    Member
                  </span>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="text-gray-medium hover:text-dark p-1 rounded transition-colors"
                  aria-label="Profile options"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-1 w-44 bg-white border border-[#E3E3E3] rounded-lg shadow-md py-1 z-50 text-xs">
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-3 py-1.5 hover:bg-gray-50 text-dark"
                    >
                      Account Settings
                    </Link>
                    {onToggleMemberView && (
                      <button
                        onClick={() => {
                          onToggleMemberView(isLate ? "new" : "late");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[#4383F3]"
                      >
                        Switch to {isLate ? "New Member" : "Late Member"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Log Out Button */}
            <div className="mt-2 pt-2 border-t border-[#EDEDED]">
              <Link
                href="/signin"
                className="flex items-center gap-2 text-[#EA4335] text-[13px] font-medium hover:bg-red-50/60 rounded px-1.5 py-1 transition-colors w-full"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Log Out</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area (offset by 265px on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[265px]">
        {/* Top Header Bar (h=60px in Figma) */}
        <header className="sticky top-0 z-30 h-[60px] bg-surface/90 backdrop-blur-md border-b border-[#E3E3E3]/80 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-dark p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <span className="text-[14px] font-medium text-dark tracking-tight">
              {breadcrumb}
            </span>
          </div>

          {/* Right Header Elements */}
          <div className="flex items-center gap-3">
            {/* Member View Switcher (Interactive toggle between New and Late member views!) */}
            {onToggleMemberView && (
              <div className="hidden lg:flex items-center bg-white border border-[#E6E6E6] rounded-full p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => onToggleMemberView("new")}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    memberView === "new"
                      ? "bg-[#4383F3] text-white shadow-xs"
                      : "text-dark/70 hover:text-dark"
                  }`}
                >
                  New Member
                </button>
                <button
                  type="button"
                  onClick={() => onToggleMemberView("late")}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    memberView === "late"
                      ? "bg-[#4383F3] text-white shadow-xs"
                      : "text-dark/70 hover:text-dark"
                  }`}
                >
                  Late Member
                </button>
              </div>
            )}

            {/* Search Pill Input (w=259px, h=37px, rx=18.5) */}
            <div className="relative hidden sm:block w-[180px] md:w-[240px] lg:w-[259px]">
              <input
                type="text"
                placeholder="Search Something"
                className="w-full h-[37px] pl-9 pr-4 rounded-full border border-[#E6E6E6] bg-white text-[13px] text-dark placeholder:text-gray-medium focus:outline-none focus:border-[#4383F3] transition-all"
              />
              <svg
                className="w-4 h-4 text-gray-medium absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Notification Bell (37x37 circle, rx=18.5) */}
            <button
              className="relative w-[37px] h-[37px] rounded-full border border-[#E6E6E6] bg-white flex items-center justify-center text-dark hover:bg-gray-50 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4 text-dark/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-[#EA4335] absolute top-2 right-2 ring-1 ring-white" />
            </button>

            {/* User Profile Pill Menu (w=67px, h=38px, rx=19 in Figma) */}
            <div className="flex items-center gap-1.5 h-[38px] pl-1 pr-2.5 rounded-full bg-[#EDEDED] border border-[#E6E6E6] hover:bg-gray-200 transition-colors cursor-pointer">
              <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden border border-[#E6E6E6] bg-white shrink-0">
                <Image
                  src={userAvatar}
                  alt={userName}
                  fill
                  className="object-cover"
                />
              </div>
              <svg className="w-3.5 h-3.5 text-dark/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Children (Main Viewport) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
