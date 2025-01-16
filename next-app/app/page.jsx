"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { NavBar } from "../components/navbar";
import { SakuraElements } from "../components/landing/sakura-elements";

const HeroLoading = () => (
  <div
    className="bg-gray-100 h-[600px] animate-pulse"
    aria-label="Loading hero section..."
  />
);

const FeaturesLoading = () => (
  <div
    className="bg-white h-[400px] animate-pulse"
    aria-label="Loading features section..."
  />
);

const TestimonialsLoading = () => (
  <div
    className="bg-gray-50 h-[300px] animate-pulse"
    aria-label="Loading testimonials section..."
  />
);

const CtaLoading = () => (
  <div
    className="bg-white h-[200px] animate-pulse"
    aria-label="Loading CTA section..."
  />
);

// Dynamic imports
const HeroSection = dynamic(
  () =>
    import("@/components/landing/hero-section").then((mod) => mod.HeroSection),
  { loading: HeroLoading }
);

const FeaturesSection = dynamic(
  () =>
    import("@/components/landing/features-section").then(
      (mod) => mod.FeaturesSection
    ),
  { loading: FeaturesLoading }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/landing/testimonials-section").then(
      (mod) => mod.TestimonialsSection
    ),
  { loading: TestimonialsLoading, ssr: false }
);

const CtaSection = dynamic(
  () =>
    import("@/components/landing/cta-section").then((mod) => mod.CtaSection),
  { loading: CtaLoading }
);

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen overflow-hidden">
      <SakuraElements />
      <NavBar />
      <main>
        <Suspense fallback={<HeroLoading />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<FeaturesLoading />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<TestimonialsLoading />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<CtaLoading />}>
          <CtaSection />
        </Suspense>
      </main>
    </div>
  );
}
