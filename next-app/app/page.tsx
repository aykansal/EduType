"use client";

import { NavBar } from "@/components/navbar";
import { CtaSection } from "@/components/landing/cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { SakuraElements } from "@/components/landing/sakura-elements";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  return (
   
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
        <SakuraElements />
        <NavBar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
      </div>
    
  );
}
