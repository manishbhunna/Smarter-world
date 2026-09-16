import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesOverviewSection } from "@/components/sections/ServicesOverviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Smarter World | Premier Digital Engineering & AI Solutions Agency",
  description:
    "We architect modern responsive websites, custom software, high-growth SaaS, scalable mobile apps, targeted advertising, and autonomous AI automation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Smarter World | Premier Digital Engineering & AI Solutions Agency",
    description:
      "Modern digital engineering and autonomous AI agent workflows. Empowering founders and enterprises.",
    url: SITE_CONFIG.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverviewSection showFilters={true} />
      <ProcessSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
