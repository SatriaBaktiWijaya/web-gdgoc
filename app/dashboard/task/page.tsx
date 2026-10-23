"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function TaskPage() {
  return (
    <DashboardLayout activeItem="Task" breadcrumb="Home/Task">
      <div className="space-y-6 pb-12 max-w-[1140px]">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-dark tracking-tight">
              Tasks & Submissions
            </h1>
            <p className="text-[13px] text-gray-medium mt-0.5">
              Review and submit your assigned group challenges and project milestones.
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center bg-[#FCE8E6] text-[#EA4335] text-[12.5px] font-medium px-3.5 py-1.5 rounded-[4px]">
              Not Done Yet
            </span>
          </div>
        </div>

        {/* Task Detail Card (matching design Task Card) */}
        <div className="bg-white border border-[#E3E3E3] rounded-[9.5px] p-6 sm:p-7 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-[46px] h-[46px] rounded-full bg-[#FCE8E6] flex items-center justify-center text-[#EA4335] shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="font-semibold text-lg sm:text-[20px] text-dark tracking-tight">
                    Nama Tugas
                  </h2>
                  <p className="text-[13px] text-dark/70 font-normal">
                    Google Solution Challenge • 2026
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-[#E8F0FE] text-[#4383F3] text-[11px] font-medium px-2.5 py-1 rounded-[4px]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Hipster Team</span>
                  </span>
                  <span className="border border-[#E3E3E3] text-gray-medium text-[11px] font-normal px-2.5 py-1 rounded-[4.5px]">
                    Created on 8 oct 2026
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#F0F0F0]">
                <h3 className="text-sm font-semibold text-dark">Keterangan Tugas</h3>
                <p className="text-[13px] text-dark/75 mt-1 leading-relaxed">
                  Lengkapi proposal solusi dan prototipe awal untuk Google Solution Challenge 2026. Pastikan setiap anggota tim berkontribusi sesuai peran (Hacker, Hipster, Hustler). Unggah dokumen proposal dan tautan repositori proyek sebelum tenggat waktu.
                </p>
              </div>

              {/* Submission Area */}
              <div className="mt-6 p-4 rounded-[8px] bg-[#FAFAFA] border border-[#E3E3E3]">
                <label className="block text-[13px] font-medium text-dark mb-1.5">
                  Link Submission Proyek
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    placeholder="https://github.com/your-team/solution-challenge-2026"
                    className="flex-1 h-[41px] px-3.5 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                  />
                  <button
                    type="button"
                    className="h-[41px] px-6 bg-[#4383F3] hover:bg-[#3876e0] active:scale-95 text-white font-medium text-[13px] rounded-[7.5px] transition-all shadow-xs"
                  >
                    Submit Tugas
                  </button>
                </div>
                <p className="text-[11.5px] text-gray-medium mt-1.5">
                  Finish it before you get finished :p
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
            <Link
              href="/dashboard/team"
              className="text-[13px] text-[#4383F3] hover:underline font-medium inline-flex items-center gap-1.5"
            >
              <span>← Lihat Detail Tim</span>
            </Link>

            <span className="text-[12px] text-gray-medium">
              Deadline: 31 Oktober 2026, 23:59 WIB
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
