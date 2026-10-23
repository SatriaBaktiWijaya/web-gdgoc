"use client";

import { useState } from "react";
import Link from "next/link";
import TeamCard, { TeamMember } from "@/components/TeamCard";
import AnimatedSection from "@/components/AnimatedSection";

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "2",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "3",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "4",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "5",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "6",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "7",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "8",
    name: "Angelica Violet",
    role: "Core Team",
    category: "Core",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "9",
    name: "Muhammad Aldi Ramdani",
    role: "Mentor & Education",
    category: "Mentor & Education",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "10",
    name: "Sorlin Aprilia",
    role: "Media & Creative",
    category: "Media & Creative",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "11",
    name: "I Komang Arjuna Tudung",
    role: "Event & Community",
    category: "Event & Community",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  {
    id: "12",
    name: "Rasikh Azfa Riyyash",
    role: "Event & Community",
    category: "Event & Community",
    image: "/assets/member-angelica.png",
    year: "2026",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
];

const categories = [
  "ALL",
  "Core",
  "Mentor & Education",
  "Media & Creative",
  "Event & Community",
] as const;

export default function CoreTeamPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Core");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = initialTeamMembers.filter((m) => {
    const matchesCategory =
      selectedCategory === "ALL" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {/* Hero Header Section */}
      <AnimatedSection className="w-full">
        <section className="relative isolate overflow-hidden pt-44 sm:pt-52 lg:pt-[250px] pb-36 sm:pb-48 lg:pb-[230px] min-h-[700px] px-4 text-center flex flex-col items-center">
          {/* Subtle Background Grid Pattern with Deeper Gradient Mask */}
          <div
            data-testid="core-team-hero-grid-pattern"
            className="absolute inset-0 pointer-events-none -z-10 bg-grid-pattern opacity-85"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
            }}
          />

          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-dark tracking-tight leading-tight">
            Say Hi to the Team
          </h1>
          <p className="text-gray-medium text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Meet the people making things happen behind the scenes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/signup"
              className="w-[156px] h-[44px] bg-[#F0F0F0] hover:bg-[#e4e4e4] border border-[#E3E3E3] text-dark font-medium text-[15px] rounded-[10px] flex items-center justify-center transition-all active:scale-95"
            >
              Join GDGoC
            </Link>
            <Link
              href="/#events"
              className="w-[168px] h-[44px] bg-[#4383F3] hover:bg-[#3876e0] text-white font-medium text-[15px] rounded-[10px] flex items-center justify-center transition-all shadow-sm active:scale-95"
            >
              Explore Events
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Team Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 flex-1">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            Core Team
          </h2>
          <p className="text-gray-medium text-sm sm:text-base mt-2">
            GDG On Campus Telkom University Purwokerto
          </p>
        </AnimatedSection>

        {/* Filter Tabs and Search Bar (matching exact Figma layout) */}
        <AnimatedSection className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 max-w-[1305px] mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-[42px] px-5 rounded-[10px] text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#4383F3] text-white shadow-sm"
                      : "bg-[#F0F0F0] hover:bg-[#e6e6e6] text-[#1E1E1E] border border-[#E3E3E3]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input (261px x 45px in Figma) */}
          <div className="relative w-full lg:w-[261px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full h-[45px] pl-4 pr-10 rounded-[11.5px] border border-[#E3E3E3] bg-white text-dark text-sm placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
            />
            <svg
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-medium pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </AnimatedSection>

        {/* Members Grid (4 cards per row, 315px each, max-w 1305px) */}
        <AnimatedSection className="w-full">
          {filteredMembers.length > 0 ? (
            <div className="max-w-[1305px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 justify-items-center">
              {filteredMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-medium">
              <p className="text-lg">No members found matching &ldquo;{searchQuery}&rdquo;</p>
            </div>
          )}
        </AnimatedSection>
      </section>
    </div>
  );
}
