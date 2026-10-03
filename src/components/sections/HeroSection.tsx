"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STAT_ITEMS = [
  { value: "99.98%", label: "Target Availability", detail: "Global edge uptime SLA guarantee" },
  { value: "< 120ms", label: "Edge Latency", detail: "Sub-second global TTFB benchmark" },
  { value: "11", label: "Core Capabilities", detail: "End-to-end technical execution" },
  { value: "100%", label: "Source Code Transferred", detail: "Complete client IP ownership" },
];

const CLIENT_AVATARS = ["AK", "MR", "SL", "DR"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#dbd8cf] border-b border-[#093103]/20 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
      {/* Background Architectural Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-30 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Balanced Split Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          {/* Left Column: Headline, Narrative & Conversion CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Autonomous AI & Digital Engineering</span>
                <Sparkles className="w-3.5 h-3.5 text-white ml-0.5" />
              </div>

              {/* Monumental Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.08] mb-5 sm:mb-6">
                Engineering the Acovate World of Digital Products
              </h1>

              {/* Editorial Lead Paragraph */}
              <p className="text-base sm:text-lg lg:text-xl text-black/85 leading-relaxed font-normal max-w-2xl mb-8 sm:mb-9">
                We partner with visionary founders and ambitious enterprises to architect lightning-fast websites, custom software, scalable SaaS, and autonomous AI agent workflows.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-7 rounded-xl font-bold bg-[#093103] text-white hover:bg-black shadow-forest group"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-white transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 px-7 rounded-xl border-2 border-[#093103] text-black hover:bg-[#093103] hover:text-white font-bold transition-all"
                  >
                    <span>Explore 11 Services</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Social Proof & Guarantees Cluster */}
            <div className="pt-6 border-t border-[#093103]/20 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              {/* Avatar Stack with Rating */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex -space-x-2 overflow-hidden">
                  {CLIENT_AVATARS.map((initials, i) => (
                    <div
                      key={i}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#093103] text-white text-xs font-black border-2 border-[#dbd8cf] shadow-sm"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-[#093103]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-[#093103]" />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-black mt-0.5">
                    5.0 from 45+ Founders
                  </p>
                </div>
              </div>

              {/* Guarantees Badges */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-black/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#093103]" />
                  100% IP Rights
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#093103]" />
                  SOC2 Architecture
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#093103]" />
                  95+ Core Web Vitals
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Clean Hero Photo (No card wrapper, no text on photo) */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#093103]/20 bg-gradient-to-br from-[#093103] via-[#0d4405] to-[#041701] group">
              <Image
                src="/images/hero-agency.jpg"
                alt="Acovate AI Engineering & Digital Product Team"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Typographic Metrics Ribbon */}
        <div className="mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t-2 border-[#093103]/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {STAT_ITEMS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-black mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-black/70 font-medium leading-normal">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
