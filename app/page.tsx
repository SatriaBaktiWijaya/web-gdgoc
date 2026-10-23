import HeroSection from "@/components/HeroSection";
import HangingStats from "@/components/HangingStats";
import FeaturesSection from "@/components/FeaturesSection";
import EventCarousel from "@/components/EventCarousel";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none -z-10" />

      <main className="flex-1">
        {/* Hero Section */}
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>

        {/* Hanging Stats / Community Section */}
        <AnimatedSection>
          <HangingStats />
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection>
          <FeaturesSection />
        </AnimatedSection>

        {/* Events Carousel Section */}
        <AnimatedSection id="events" className="w-full py-20 px-4 flex flex-col items-center text-center">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark tracking-tight">
              See You at the Next One
            </h2>
            <p className="text-gray-medium text-base sm:text-lg mt-4 leading-relaxed">
              From tech talks to hands-on sessions, there&apos;s always something to look forward to.
            </p>
          </div>

          <EventCarousel />
        </AnimatedSection>
      </main>
    </div>
  );
}
