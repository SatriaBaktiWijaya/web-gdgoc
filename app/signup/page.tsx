"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "@/components/GoogleButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAuth } from "@/context/AuthContext";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/dashboard";

  const { user, signUpWithEmail, signInWithGoogle, isDemoMode, error: authError, clearError } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace(redirectTarget);
    }
  }, [user, router, redirectTarget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (password !== repeatPassword) {
      setLocalError("Password dan Repeat Password tidak cocok.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password minimal harus 6 karakter.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUpWithEmail(email, password, fullName);
      router.push(redirectTarget);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Gagal mendaftar. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLocalError(null);
    clearError();
    setIsSubmitting(true);

    try {
      await signInWithGoogle();
      router.push(redirectTarget);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Gagal mendaftar dengan Google.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = localError || authError;

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {/* Main Form Section */}
      <section className="relative isolate overflow-hidden flex-1 flex flex-col items-center px-4 pt-36 sm:pt-44 lg:pt-[190px] pb-24 sm:pb-32">
        {/* Subtle Background Grid Pattern with Deeper Gradient Mask */}
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
          {/* Header Title */}
          <h1 className="text-4xl sm:text-[48px] font-bold text-dark tracking-tight mb-4">
            Hello Folks!
          </h1>
          <p className="text-gray-medium text-sm sm:text-base mb-8">
            Daftar sekarang untuk bergabung dengan komunitas tech GDG On Campus.
          </p>

          {/* Demo Mode Notice Badge */}
          {isDemoMode && (
            <div className="mb-6 p-3 rounded-[8px] bg-[#E9F1FF] border border-[#4383F3]/30 text-left flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#4383F3] shrink-0 mt-1.5 animate-pulse" />
              <div className="text-xs text-dark/80 leading-relaxed">
                <span className="font-semibold text-[#4383F3]">Demo Mode Aktif</span>: Kredensial Firebase belum dimasukkan di <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code>. Kamu bisa mendaftar dengan nama dan email apa saja untuk pengujian instan!
              </div>
            </div>
          )}

          {/* Error Alert */}
          {activeError && (
            <div className="mb-6 p-3.5 rounded-[8px] bg-[#FCE8E6] border border-[#EA4335]/30 text-left text-[13px] text-[#EA4335] flex items-center gap-2.5 animate-fadeIn">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{activeError}</span>
            </div>
          )}

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
                disabled={isSubmitting}
                className="w-full h-[49px] px-4 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full h-[49px] px-4 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all disabled:opacity-60"
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
                  placeholder="Minimal 6 karakter"
                  required
                  disabled={isSubmitting}
                  className="w-full h-[49px] px-4 pr-12 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all disabled:opacity-60"
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
                  placeholder="Ulangi password kamu"
                  required
                  disabled={isSubmitting}
                  className="w-full h-[49px] px-4 pr-12 rounded-[10px] border border-[#E6E6E6] bg-white text-dark text-[15px] placeholder:text-gray-medium focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] transition-all disabled:opacity-60"
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
              disabled={isSubmitting}
              className="w-full h-[47px] bg-[#4383F3] hover:bg-[#3876e0] active:scale-[0.99] text-white font-medium text-[16px] rounded-[10px] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Mendaftarkan akun...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
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
          <GoogleButton onClick={handleGoogleSignUp} disabled={isSubmitting} />

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

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-medium">Memuat form sign up...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
