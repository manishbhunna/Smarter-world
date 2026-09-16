import React from "react";
import type { Metadata } from "next";
import { ServicesClient } from "@/components/services/ServicesClient";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SITE_CONFIG } from "@/lib/utils";
import { Sparkles, ShieldCheck, Zap, Layers, ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Agency Services | Web, SaaS, Mobile & AI Solutions",
  description:
    "Explore Smarter World's 11 core agency services: Website Development, Custom Web Apps, Ecommerce, Redesign, Enterprise Software, SaaS, Mobile Apps, Ads, and Autonomous AI Agent Automation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Agency Services | Smarter World",
    description:
      "Full-spectrum digital engineering and AI agent automation. Discover our complete technical solutions.",
    url: `${SITE_CONFIG.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#dbd8cf] min-h-screen text-black">
      {/* Editorial Header Hero */}
      <section className="relative overflow-hidden bg-[#dbd8cf] border-b border-[#093103]/20 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Status Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>11 Core Engineering Disciplines</span>
              <Sparkles className="w-3.5 h-3.5 text-white ml-0.5" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.08]">
              High-Performance Engineering &{" "}
              <span className="underline decoration-[#093103] decoration-4 underline-offset-8">
                Autonomous AI
              </span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-xl text-black/85 leading-relaxed font-normal max-w-3xl mx-auto">
              From sub-second Next.js web applications to enterprise multi-tenant SaaS and autonomous multi-agent AI pipelines. Every engagement is led by senior engineers with full IP transfer and zero platform lock-in.
            </p>

            {/* Fast Stats Row */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <div className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">11</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider mt-1">Core Practices</div>
              </div>
              <div className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">100%</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider mt-1">Source Code IP</div>
              </div>
              <div className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">&lt; 120ms</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider mt-1">Edge Latency</div>
              </div>
              <div className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">24/7</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider mt-1">AI Automation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <ServicesClient />
      </main>

      {/* High Conversion Discovery CTA */}
      <CtaBanner
        title="Ready to engineer your next digital advantage?"
        subtitle="Schedule a direct technical discovery call with our senior architects. We analyze your requirements and provide a deterministic architecture blueprint and timeline within 24 hours."
        buttonText="Schedule Technical Discovery"
      />
    </div>
  );
}
