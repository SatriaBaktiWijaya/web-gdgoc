"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function TeamDetailsPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralCode = "ALPHA-2024";

  const leaderName = user?.displayName || (user?.email ? user.email.split("@")[0] : "Rafi Pratama");
  const leaderInitials = (leaderName || "RP")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout activeItem="My Team" breadcrumb="Home/My Team">
      <div className="space-y-6 pb-12">
        {/* Header Title & Badge (y=103 in Figma) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-dark tracking-tight">
              Team Alpha
            </h1>
            <p className="text-[13px] text-gray-medium mt-0.5">
              Kelompok Pengembang On Campus
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center bg-[#E8F0FE] text-[#4383F3] text-[12.5px] font-medium px-3.5 py-1.5 rounded-[4px]">
              Belum diajukan
            </span>
          </div>
        </div>

        {/* 3 Member Slot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Slot 1: Team Leader (Current User) */}
          <div className="w-full h-[180px] bg-white border border-[#E3E3E3] rounded-[9.5px] p-6 flex flex-col items-center justify-center text-center shadow-xs">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={leaderName}
                className="w-[84px] h-[84px] rounded-full object-cover border border-[#E3E3E3] shadow-2xs"
              />
            ) : (
              <div className="w-[84px] h-[84px] rounded-full bg-[#E9F1FF] border border-[#E3E3E3] flex items-center justify-center text-2xl font-bold text-[#4383F3] shadow-2xs">
                {leaderInitials || "RP"}
              </div>
            )}
            <h3 className="font-semibold text-[16px] text-dark tracking-tight mt-3 truncate max-w-[200px]" title={leaderName}>
              {leaderName}
            </h3>
            <span className="text-[12.5px] text-[#4383F3] font-medium mt-0.5">
              Team Leader
            </span>
          </div>

          {/* Slot 2: Ayu Lestari (Member) */}
          <div className="w-full h-[180px] bg-white border border-[#E3E3E3] rounded-[9.5px] p-6 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="w-[84px] h-[84px] rounded-full bg-white border border-[#E3E3E3] flex items-center justify-center text-2xl font-bold text-dark shadow-2xs">
              AL
            </div>
            <h3 className="font-semibold text-[16px] text-dark tracking-tight mt-3">
              Ayu Lestari
            </h3>
            <span className="text-[12.5px] text-[#4383F3] font-medium mt-0.5">
              Member
            </span>
          </div>

          {/* Slot 3: Slot Kosong (Empty Slot, Referral Box, Rekrut) */}
          <div className="w-full min-h-[281px] bg-[#F8FBFF] border-2 border-dashed border-[#4383F3] rounded-[9.5px] p-6 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="w-[64px] h-[64px] rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#4383F3]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>

            <h3 className="font-semibold text-[15.5px] text-dark tracking-tight mt-3">
              Slot Kosong
            </h3>

            <p className="text-[12px] text-gray-medium max-w-[210px] mt-1 leading-relaxed">
              Ajak temanmu bergabung untuk melengkapi tim.
            </p>

            {/* Referral Code Box */}
            <div className="mt-3.5 px-3.5 py-1.5 bg-white border border-[#E3E3E3] rounded-[5.5px] text-[12px] text-dark font-medium shadow-2xs select-all">
              Kode Referal: <span className="text-[#4383F3] font-semibold">{referralCode}</span>
            </div>

            {/* Rekrut Button */}
            <button
              type="button"
              onClick={handleCopyReferral}
              className="mt-3 px-6 py-2 bg-[#F0F0F0] hover:bg-gray-200 active:scale-95 border border-[#E3E3E3] text-dark text-[12.5px] font-medium rounded-[10px] transition-all shadow-2xs"
            >
              {copied ? "Kode Disalin!" : "Rekrut"}
            </button>
          </div>
        </div>

        {/* Pengajuan Tim Card (w=1110px in Figma) */}
        <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-6 sm:p-7 shadow-xs">
          <div>
            <h3 className="font-semibold text-[17px] text-dark tracking-tight">
              Pengajuan Tim
            </h3>
            <p className="text-[12.5px] text-gray-medium mt-1 leading-relaxed">
              Pengajuan hanya tersedia jika ketiga slot terisi dan tim belum pernah mengajukan sebelumnya.
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-[13px] font-medium text-dark mb-2">
              Link Dokumen Persyaratan
            </label>
            <input
              type="text"
              readOnly
              value="https://drive.google.com/folder/contoh-persyaratan"
              className="w-full h-[40px] px-3.5 rounded-[7.5px] border border-[#E0E0E0] bg-[#F5F5F5] text-gray-medium text-[13px] cursor-not-allowed select-all"
            />
            <p className="text-[11.5px] text-gray-medium mt-1.5">
              Pastikan link dapat diakses oleh panitia.
            </p>
          </div>

          {/* Status & Submit Row */}
          <div className="mt-8 pt-5 border-t border-[#F0F0F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-[13px] text-gray-medium">
              Status: Menunggu 1 anggota lagi untuk melengkapi tim.
            </span>

            <button
              type="button"
              disabled
              className="px-6 py-2.5 bg-[#E0E0E0] text-gray-medium text-[13px] font-medium rounded-[10px] cursor-not-allowed self-end sm:self-auto"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
