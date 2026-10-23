"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

function FooterSectionInner() {
    const pathname = usePathname();
    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return (
        <div>
            {/* Unified Pre-Footer CTA & Footer Section */}
            <section className="relative w-full overflow-hidden">
                {/* Layer 1: Continuous 3-Element Ambient Glow (Paling Dalam / Furthest Back, z-0) */}
                <div
                    data-testid="prefooter-color-glow"
                    className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
                >
                    <div className="absolute top-12 -left-20 w-[550px] h-[750px] lg:w-[700px] lg:h-[950px] bg-[#00C2FF]/10 rounded-full blur-[150px] lg:blur-[180px]" />
                    <div className="absolute top-4 left-[55%] -translate-x-1/2 w-[520px] h-[720px] lg:w-[680px] lg:h-[920px] bg-[#F9AB00]/9 rounded-full blur-[150px] lg:blur-[180px]" />
                    <div className="absolute top-12 -right-20 w-[550px] h-[750px] lg:w-[700px] lg:h-[950px] bg-[#34A853]/9 rounded-full blur-[150px] lg:blur-[180px]" />
                </div>

                {/* Layer 2: Subtle Grid Pattern (Above Color Glow, Matching Hero, z-0) */}
                <div
                    data-testid="prefooter-grid-pattern"
                    className="absolute inset-x-0 top-0 h-[650px] sm:h-[750px] pointer-events-none z-0 bg-grid-pattern opacity-60"
                    style={{
                        maskImage:
                            "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.85) 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.85) 100%)",
                    }}
                />

                {/* Layer 3: Content on Top (z-10) */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    <AnimatedSection className="w-full flex justify-center">
                        <PreFooterCTA />
                    </AnimatedSection>
                    <AnimatedSection className="w-full flex justify-center">
                        <Footer />
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}

export default function FooterSection() {
    return (
        <Suspense fallback={null}>
            <FooterSectionInner />
        </Suspense>
    );
}