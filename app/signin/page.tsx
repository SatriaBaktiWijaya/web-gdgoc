"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleButton from "@/components/GoogleButton";
import { useAuth } from "@/context/AuthContext";
import { motion, useReducedMotion } from "framer-motion";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/dashboard";

  const { user, signInWithGoogle, isDemoMode, error: authError, clearError } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

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

  const fadeUp = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      <section className="relative isolate overflow-hidden flex-1 flex flex-col items-center justify-center px-6">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 bg-grid-pattern opacity-60"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        />

        <div className="w-full max-w-[400px] mx-auto text-center">
          {/* Google Brand Dots — minimal identity */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9AB00]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-[32px] sm:text-[40px] font-bold text-dark tracking-tight leading-[1.15]"
          >
            Gabung Komunitas
            <br />
            <span className="text-[#4383F3]">GDG On Campus TUP</span>
          </motion.h1>

          {/* Sub-copy — one sentence, enough to convert */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-gray-medium text-[15px] sm:text-[16px] mt-4 mb-10 leading-relaxed max-w-[320px] mx-auto"
          >
            Satu klik untuk akses event, tim, dan project bareng developer lainnya.
          </motion.p>

          {/* Error Alert — only when needed */}
          {activeError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-3.5 rounded-[12px] bg-[#FCE8E6] border border-[#EA4335]/25 text-[13px] text-[#C5221F] flex items-center gap-2.5 text-left"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{activeError}</span>
            </motion.div>
          )}

          {/* Demo Mode — subtle inline badge */}
          {isDemoMode && (
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6 px-4 py-2.5 rounded-[10px] bg-[#E9F1FF] border border-[#4383F3]/20 text-[12px] text-dark/70 leading-relaxed"
            >
              <span className="font-semibold text-[#4383F3]">Demo Mode</span> — Klik tombol di bawah untuk simulasi login.
            </motion.div>
          )}

          {/* The One Button — center of attention */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <GoogleButton
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              loading={isSubmitting}
              text="Lanjutkan dengan Google →"
              accessibleName="Sign In with Google"
              variant="full"
              className="shadow-sm hover:shadow-md !h-[56px] !text-[16px] !rounded-[14px]"
            />
          </motion.div>

          {/* Subtle trust line */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="text-[12px] text-gray-medium/60 mt-6"
          >
            Aman dengan Google OAuth 2.0 · Tanpa password
          </motion.p>
        </div>
      </section>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-medium">Memuat...</div>}>
      <SignInContent />
    </Suspense>
  );
}
