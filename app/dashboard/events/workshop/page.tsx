"use client";

import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function WorkshopDetailPage() {
  return (
    <DashboardLayout activeItem="Deadline Events" breadcrumb="Home/Overview">
      <div className="space-y-6 pb-14 max-w-[1110px] mx-auto">
        {/* Top Navigation Row (y=92 in Figma) */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 h-[37px] px-3.5 bg-white hover:bg-gray-50 active:scale-95 border border-[#E3E3E3] rounded-[7.5px] text-[13px] font-medium text-dark shadow-2xs transition-all"
          >
            <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Daftar Event</span>
          </Link>

          <span className="bg-[#FFF1F0] text-[#E64436] text-[12px] font-medium px-3 py-1 rounded-[4px]">
            Segera Hadir
          </span>
        </div>

        {/* Big Workshop Banner (x=297, y=150, w=1111, h=1064 in Figma) */}
        <div className="relative w-full rounded-[12px] border border-[#E3E3E3] overflow-hidden bg-white shadow-xs">
          <div className="relative w-full aspect-[1111/1064] min-h-[380px] sm:min-h-[500px] lg:min-h-[640px]">
            <Image
              src="/assets/dashboard/workshop-banner.png"
              alt="Build with AI - Shape Modern Web Experiences with Antigravity"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* 3 Info Cards Grid (Jadwal, Lokasi, Platform) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Jadwal */}
          <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-5 shadow-xs flex flex-col justify-between min-h-[101px]">
            <span className="text-[12px] text-gray-medium font-normal">
              Jadwal
            </span>
            <div>
              <h4 className="font-semibold text-[15px] text-dark tracking-tight">
                Minggu, 25 Oktober 2026
              </h4>
              <p className="text-[12px] text-dark/75 mt-0.5">
                09:00–12:00 WIB
              </p>
            </div>
          </div>

          {/* Card 2: Lokasi */}
          <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-5 shadow-xs flex flex-col justify-between min-h-[101px]">
            <span className="text-[12px] text-gray-medium font-normal">
              Lokasi
            </span>
            <div>
              <h4 className="font-semibold text-[15px] text-dark tracking-tight">
                Aula Utama Kampus
              </h4>
              <p className="text-[12px] text-dark/75 mt-0.5">
                Jl. D. I. Panjaitan No. 128, Purwokerto
              </p>
            </div>
          </div>

          {/* Card 3: Platform */}
          <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-5 shadow-xs flex flex-col justify-between min-h-[101px]">
            <span className="text-[12px] text-gray-medium font-normal">
              Platform
            </span>
            <div>
              <h4 className="font-semibold text-[15px] text-dark tracking-tight">
                Google Meet
              </h4>
              <a
                href="https://meet.google.com/abc-defg-hij"
                target="_blank"
                rel="noreferrer"
                className="text-[12px] text-[#4383F3] hover:underline mt-0.5 block"
              >
                meet.google.com/abc-defg-hij
              </a>
            </div>
          </div>
        </div>

        {/* Tentang Workshop Card (w=1110, h=204 in Figma) */}
        <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-6 sm:p-7 shadow-xs">
          <h3 className="font-semibold text-[17px] text-dark tracking-tight">
            Tentang Workshop
          </h3>

          <p className="text-[13px] leading-relaxed text-dark/80 mt-3.5">
            Workshop ini dirancang untuk mahasiswa yang ingin memulai pengembangan aplikasi mobile dengan Flutter. Peserta akan belajar membuat UI responsif, mengelola state, serta mengintegrasikan API sederhana. Materi disusun dari dasar hingga implementasi proyek kecil, sehingga cocok untuk pemula maupun developer yang ingin memperbarui portofolio.
          </p>

          <p className="text-[13px] leading-relaxed text-dark/80 mt-3">
            Pada sesi ini, peserta akan mempelajari cara mengatur layout, menangani navigasi, serta mempersiapkan proyek untuk dipublikasikan. Setelah workshop selesai, peserta akan mendapatkan materi lanjutan dan referensi untuk terus belajar secara mandiri.
          </p>
        </div>

        {/* Bottom Registration Deadline & Button Bar (y=1585 in Figma) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0F0F0]">
          <span className="text-[13px] text-gray-medium">
            Batas pendaftaran: 24 Oktober 2026, pukul 23:59 WIB
          </span>

          <button
            type="button"
            className="w-full sm:w-auto h-[41px] px-7 bg-[#4285F4] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[14px] rounded-[8px] transition-all shadow-xs"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
