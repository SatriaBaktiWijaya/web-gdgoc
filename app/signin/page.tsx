"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "@/components/GoogleButton";
import AnimatedSection from "@/components/AnimatedSection";
import { useAuth } from "@/context/AuthContext";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/dashboard";

  const { user, signInWithGoogle, isDemoMode, error: authError, clearError } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace(redirectTarget);
    }
  }, [user, router, redirectTarget]);

  const handleGoogleSignIn = async () => {
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
        setLocalError("Gagal masuk dengan Google. Silakan coba kembali.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = localError || authError;

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {/* Main OAuth Section */}
      <section className="relative isolate overflow-hidden flex-1 flex flex-col items-center justify-center px-4 pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28">
        {/* Subtle Background Grid Pattern with Deeper Gradient Mask */}
        <div
          data-testid="signin-grid-pattern"
          className="absolute inset-0 pointer-events-none -z-10 bg-grid-pattern opacity-85"
          style={{
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,1) 20%)",
          }}
        />

        <AnimatedSection className="w-full max-w-[528px] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Google Brand Color Dots */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E5E5] shadow-2xs mb-5">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#F9AB00]" />
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              <span className="text-[12px] font-medium text-dark/70 ml-1">
                Google Single Sign-On
              </span>
            </div>

            <h1 className="text-3xl sm:text-[42px] font-bold text-dark tracking-tight">
              Hello Folks!
            </h1>
            <p className="text-gray-medium text-[14px] sm:text-[15px] mt-2 max-w-md mx-auto leading-relaxed">
              Masuk ke akun GDG On Campus untuk mengakses dashboard anggota, manajemen tim, dan kegiatan teknologi.
            </p>
          </div>

          {/* Demo Mode Notice Badge */}
          {isDemoMode && (
            <div className="mb-6 p-4 rounded-[12px] bg-[#E9F1FF] border border-[#4383F3]/30 text-left flex items-start gap-3 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4383F3] shrink-0 mt-1 animate-pulse" />
              <div className="text-xs text-dark/80 leading-relaxed">
                <span className="font-semibold text-[#4383F3]">Demo OAuth Mode Aktif</span>: Kredensial Firebase belum diisi di <code className="bg-white/90 px-1 py-0.5 rounded font-mono text-[11px] text-dark border border-[#4383F3]/20">.env.local</code>. Kamu bisa langsung mengklik tombol Google di bawah untuk simulasi login instan ke dashboard!
              </div>
            </div>
          )}

          {/* Error Alert */}
          {activeError && (
            <div className="mb-6 p-3.5 rounded-[10px] bg-[#FCE8E6] border border-[#EA4335]/30 text-left text-[13px] text-[#EA4335] flex items-center gap-2.5 animate-fadeIn shadow-xs">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{activeError}</span>
            </div>
          )}

          {/* Authentication Card (Figma width: 528px, border-radius: 16px, shadow-xl) */}
          <div className="bg-white border border-[#E3E3E3] rounded-[16px] p-6 sm:p-8 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-[17px] font-semibold text-dark">
                Otentikasi Akun Google
              </h2>
              <p className="text-[12.5px] text-gray-medium mt-1">
                Akses aman dan cepat tanpa perlu mengingat password
              </p>
            </div>

            {/* Primary Google OAuth Button */}
            <GoogleButton
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              loading={isSubmitting}
              text="Sign In with Google"
              accessibleName="Sign In"
              variant="full"
              className="shadow-sm hover:shadow-md"
            />

            {/* Security & Feature Badges */}
            <div className="mt-8 pt-6 border-t border-[#F0F0F0] space-y-3">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#4383F3] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-dark">Keamanan Tingkat Lanjut</h3>
                  <p className="text-[11.5px] text-gray-medium">Terproteksi oleh sistem otentikasi resmi Google OAuth 2.0</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#34A853] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-dark">Akses Instan ke Workspace</h3>
                  <p className="text-[11.5px] text-gray-medium">Langsung terhubung dengan dashboard tim dan Solution Challenge</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-[#FEF7E0] flex items-center justify-center text-[#F9AB00] shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-dark">Sinkronisasi Otomatis</h3>
                  <p className="text-[11.5px] text-gray-medium">Nama dan foto profil Google kamu otomatis siap digunakan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Switcher Link */}
          <div className="mt-8 text-center">
            <p className="text-[14px] text-gray-medium">
              Belum terdaftar sebagai anggota?{" "}
              <Link href="/signup" className="text-[#4383F3] hover:underline font-semibold transition-colors">
                Daftar dengan Google
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-medium">Memuat form sign in...</div>}>
      <SignInContent />
    </Suspense>
  );
}
