"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Globe,
  Bot,
  Cpu,
  Star,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SPOTLIGHT_SERVICES = [
  {
    id: "web",
    icon: Globe,
    title: "Next.js Web Engineering",
    stat: "99/100 Lighthouse",
    description: "Sub-second responsive platforms built for conversion and technical SEO dominance.",
    tags: ["Next.js 14", "Edge CDN", "SEO Architecture"],
  },
  {
    id: "ai",
    icon: Bot,
    title: "Autonomous AI Workflows",
    stat: "24/7 Operations",
    description: "Multi-agent pipelines and enterprise RAG systems automating business processes.",
    tags: ["Autonomous Agents", "RAG Pipeline", "Vector DB"],
  },
  {
    id: "saas",
    icon: Cpu,
    title: "Custom Software & SaaS",
    stat: "99.98% SLA",
    description: "Type-safe cloud software engineered to scale with full intellectual property transfer.",
    tags: ["TypeScript", "PostgreSQL", "AWS Cloud"],
  },
];

const STAT_ITEMS = [
  { value: "99.98%", label: "Target Availability", detail: "Global edge uptime SLA guarantee" },
  { value: "< 120ms", label: "Edge Latency", detail: "Sub-second global TTFB benchmark" },
  { value: "11", label: "Core Capabilities", detail: "End-to-end technical execution" },
  { value: "100%", label: "Source Code Transferred", detail: "Complete client IP ownership" },
];

const CLIENT_AVATARS = ["AK", "MR", "SL", "DR"];

export function HeroSection() {
  const [hoveredService, setHoveredService] = useState<string>("web");

  return (
    <section className="relative overflow-hidden bg-[#dbd8cf] border-b border-[#093103]/20 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
      {/* Background Architectural Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-30 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Asymmetrical Split Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Headline, Narrative & Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow Live Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Autonomous AI & Digital Engineering</span>
                <Sparkles className="w-3.5 h-3.5 text-white ml-0.5" />
              </div>

              {/* Monumental Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-black tracking-tight leading-[1.06] mb-5 sm:mb-6">
                Engineering the Smarter World of Digital Products
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

          {/* Right Column: Architectural Capabilities Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border-2 border-[#093103] bg-[#dbd8cf] p-6 sm:p-7 shadow-forest relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#093103]/20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#093103]" />
                  <span className="text-xs font-black uppercase tracking-wider text-black">
                    Core Technical Pillars
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-[#093103] text-white px-2 py-0.5 rounded-full">
                  ENTERPRISE GRADE
                </span>
              </div>

              {/* Spotlight Items */}
              <div className="space-y-3">
                {SPOTLIGHT_SERVICES.map((item) => {
                  const Icon = item.icon;
                  const isHovered = hoveredService === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredService(item.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? "bg-[#093103] text-white border-[#093103] shadow-forest"
                          : "bg-[#dbd8cf] text-black border-[#093103]/25 hover:border-[#093103]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 font-black text-sm">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center ${
                              isHovered ? "bg-white text-[#093103]" : "bg-[#093103] text-white"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{item.title}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isHovered ? "bg-white text-[#093103]" : "bg-[#093103] text-white"
                          }`}
                        >
                          {item.stat}
                        </span>
                      </div>

                      <p
                        className={`text-xs leading-relaxed mb-2.5 ${
                          isHovered ? "text-white/90" : "text-black/80"
                        }`}
                      >
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isHovered
                                ? "bg-white/20 text-white"
                                : "bg-[#dbd8cf] text-black border border-[#093103]/30"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Card Action Link */}
              <div className="pt-3.5 mt-3 border-t border-[#093103]/15">
                <Link
                  href="/services"
                  className="flex items-center justify-between p-3 rounded-xl border border-[#093103] bg-[#dbd8cf] text-black font-bold text-xs hover:bg-[#093103] hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>View All 11 Engineering Practices</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
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
