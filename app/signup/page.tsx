"use client";

import { useState } from "react";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";
import AnimatedSection from "@/components/AnimatedSection";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up submit:", { fullName, email });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {/* Main Form Section */}
      <section className="relative isolate overflow-hidden flex-1 flex flex-col items-center px-4 pt-36 sm:pt-44 lg:pt-[190px] pb-24 sm:pb-32">
        {/* Subtle Background Grid Pattern with Deeper Gradient Mask (matching core-team hero section) */}
        <div
          data-testid="signup-grid-pattern"
          className="absolute inset-0 pointer-events-none -z-10 bg-grid-pattern opacity-85"
          style={{
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
          }}
        />

        <AnimatedSection className="w-full max-w-[528px] mx-auto text-center">
          <h1 className="text-4xl sm:text-[48px] font-bold text-dark tracking-tight mb-12">
            Hello Folks!
          </h1>

          <form onSubmit={handleSubmit} className="text-left flex flex-col">
            {/* Full Name Field (528px x 49px) */}
            <div className="mb-6">
              <label className="block text-[15px] font-medium text-dark mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Full Name"
                required
                className="w-full h-[49px] px-4 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
              />
            </div>

            {/* Email Field (528px x 49px) */}
            <div className="mb-6">
              <label className="block text-[15px] font-medium text-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full h-[49px] px-4 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
              />
            </div>

            {/* Password Field (528px x 49px) */}
            <div className="mb-6">
              <label className="block text-[15px] font-medium text-dark mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="use symbol in your password"
                  required
                  className="w-full h-[49px] px-4 pr-12 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-medium hover:text-dark transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Repeat Password Field (528px x 49px) */}
            <div className="mb-7">
              <label className="block text-[15px] font-medium text-dark mb-2">
                Repeat Password
              </label>
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Insert your password"
                  required
                  className="w-full h-[49px] px-4 pr-12 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-medium hover:text-dark transition-colors"
                  aria-label="Toggle repeat password visibility"
                >
                  {showRepeatPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button (529px x 47px, rx=10px in Figma) */}
            <button
              type="submit"
              className="w-full h-[47px] bg-[#4383F3] hover:bg-[#3876e0] text-white font-medium text-[16px] rounded-[10px] transition-all shadow-sm active:scale-[0.99] mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6E6E6]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-4 text-gray-medium font-normal">
                Or With
              </span>
            </div>
          </div>

          {/* Google Button */}
          <GoogleButton />

          {/* Sign In Link */}
          <p className="mt-8 text-[14px] text-gray-medium">
            Already Have An Account?{" "}
            <Link href="/signin" className="text-[#4383F3] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}
