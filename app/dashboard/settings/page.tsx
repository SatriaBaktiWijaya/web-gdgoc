"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function AccountSettingsPage() {
  const [fullName, setFullName] = useState("Lewis Hamilton");
  const [email, setEmail] = useState("lewis.hamilton@example.com");
  const [nim, setNim] = useState("1900012345");
  const division = "Hipster";
  const role = "Member";

  const [currentPassword, setCurrentPassword] = useState("password123");
  const [newPassword, setNewPassword] = useState("newpassword123");
  const [confirmPassword, setConfirmPassword] = useState("newpassword123");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <DashboardLayout activeItem="Settings" breadcrumb="Home/Account Settings">
      <div className="space-y-6 pb-12 max-w-[1140px]">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-dark tracking-tight">
            Account Settings
          </h1>
          <p className="text-[13px] text-gray-medium mt-0.5">
            Manage your profile information and keep your account secure.
          </p>
        </div>

        {/* Card 1: Profile Information (w=1141px in Figma) */}
        <div className="bg-white border border-[#E5E7EB] rounded-[11.5px] p-6 sm:p-7 shadow-xs">
          <div>
            <h2 className="font-semibold text-[17px] text-dark tracking-tight">
              Profile Information
            </h2>
            <p className="text-[12.5px] text-gray-medium mt-1">
              Update your personal details and manage your profile.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Avatar circle (84x84 in Figma) */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-[84px] h-[84px] rounded-full bg-white border border-[#E3E3E3] flex items-center justify-center text-2xl font-bold text-dark shadow-2xs">
                  LH
                </div>
              </div>

              {/* Form Grid */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[13px] font-medium text-dark mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-[41px] px-3.5 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[13px] font-medium text-dark mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[41px] px-3.5 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Student ID (NIM) */}
                  <div>
                    <label className="block text-[13px] font-medium text-dark mb-1.5">
                      Student ID (NIM)
                    </label>
                    <input
                      type="text"
                      value={nim}
                      onChange={(e) => setNim(e.target.value)}
                      className="w-full h-[41px] px-3.5 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                    />
                  </div>

                  {/* Division (Readonly in Figma) */}
                  <div>
                    <label className="block text-[13px] font-medium text-dark mb-1.5">
                      Division
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={division}
                      className="w-full h-[41px] px-3.5 rounded-[7.5px] border border-[#E5E7EB] bg-[#F9FAFB] text-dark/75 text-[13.5px] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Role (Readonly in Figma) */}
                  <div>
                    <label className="block text-[13px] font-medium text-dark mb-1.5">
                      Role
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={role}
                      className="w-full h-[41px] px-3.5 rounded-[7.5px] border border-[#E5E7EB] bg-[#F9FAFB] text-dark/75 text-[13.5px] cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button Row */}
            <div className="mt-6 pt-4 border-t border-[#F0F0F0] flex items-center justify-end gap-3">
              {profileSaved && (
                <span className="text-xs text-[#34A853] font-medium">
                  Profile updated successfully!
                </span>
              )}
              <button
                type="submit"
                className="h-[39px] px-5 bg-[#4383F3] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[13px] rounded-[10px] transition-all shadow-xs"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Change Password (w=1141px in Figma) */}
        <div className="bg-white border border-[#E5E7EB] rounded-[11.5px] p-6 sm:p-7 shadow-xs">
          <div>
            <h2 className="font-semibold text-[17px] text-dark tracking-tight">
              Change Password
            </h2>
            <p className="text-[12.5px] text-gray-medium mt-1">
              Update your password to keep your account secure.
            </p>
          </div>

          <form onSubmit={handleUpdatePassword} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Password */}
              <div>
                <label className="block text-[13px] font-medium text-dark mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-[43px] px-3.5 pr-10 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showCurrent ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[13px] font-medium text-dark mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-[43px] px-3.5 pr-10 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showNew ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-[13px] font-medium text-dark mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-[43px] px-3.5 pr-10 rounded-[7.5px] border border-[#D1D5DB] bg-white text-dark text-[13.5px] focus:outline-none focus:border-[#4383F3] focus:ring-1 focus:ring-[#4383F3] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-medium hover:text-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showConfirm ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-[12px] text-gray-medium mt-2.5">
              Use at least 8 characters, including letters and numbers.
            </p>

            {/* Bottom Button Row */}
            <div className="mt-6 pt-4 border-t border-[#F0F0F0] flex items-center justify-end gap-3">
              {passwordSaved && (
                <span className="text-xs text-[#34A853] font-medium">
                  Password changed successfully!
                </span>
              )}
              <button
                type="submit"
                className="h-[39px] px-5 bg-[#4383F3] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[13px] rounded-[10px] transition-all shadow-xs"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
