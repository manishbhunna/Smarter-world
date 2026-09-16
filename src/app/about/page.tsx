import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Code,
  Shield,
  Zap,
  Cpu,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | Smarter World Digital & AI Agency",
  description:
    "Learn about Smarter World, our engineering philosophy, mission, core values, and how we empower modern businesses with cutting-edge web development and AI automation.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Smarter World | Digital & AI Agency",
    description:
      "Our mission is to help companies build faster, scale smarter, and leverage autonomous AI systems with confidence.",
    url: `${SITE_CONFIG.url}/about`,
  },
};

const VALUES = [
  {
    icon: Code,
    title: "Engineering Rigor Over Hacks",
    description:
      "We avoid brittle shortcuts and sluggish plugin ecosystems. Everything we produce is architected with modern TypeScript, semantic HTML5, and strict automated testing.",
  },
  {
    icon: Cpu,
    title: "AI-First Pragmatism",
    description:
      "We don't chase hype for hype's sake. We deploy intelligent AI workflows, retrieval-augmented generation (RAG), and autonomous agents only where they drive real ROI and efficiency.",
  },
  {
    icon: Zap,
    title: "Performance Without Compromise",
    description:
      "Speed is a feature and a core SEO driver. We optimize our digital builds for sub-second responses, 95+ Core Web Vitals, and lightweight asset bundles.",
  },
  {
    icon: Shield,
    title: "Radical Transparency & IP Rights",
    description:
      "From day one, you own 100% of the intellectual property, repositories, and credentials. We offer transparent weekly sprints with zero hidden retainers.",
  },
];

const MILESTONES = [
  {
    year: "2021",
    title: "Agency Founded",
    description: "Launched with a mission to eliminate legacy agency overhead and build high-performance web applications using modern React and cloud architectures.",
  },
  {
    year: "2023",
    title: "Expansion to SaaS & Mobile",
    description: "Scaled engineering teams to deliver full-lifecycle SaaS platforms and cross-platform mobile apps for fast-growing venture-backed startups.",
  },
  {
    year: "2024",
    title: "AI Integration Practice",
    description: "Pioneered production-grade RAG and enterprise LLM integrations, enabling clients to automate complex document processing and search workflows.",
  },
  {
    year: "2025+",
    title: "Autonomous Agent Automation",
    description: "Expanded our specialty to multi-agent autonomous loops, empowering 24/7 lead qualification, customer resolution, and multi-system business orchestration.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#dbd8cf] min-h-screen text-black">
      {/* Hero */}
      <section className="pt-20 pb-16 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
              About Smarter World
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight">
              Building the Digital Engines That Power the{" "}
              <span className="underline decoration-[#093103] decoration-4 underline-offset-8">
                Future
              </span>
            </h1>
            <p className="text-lg text-black/80 leading-relaxed">
              We are an elite team of senior engineers, product strategists, and AI system architects dedicated to delivering high-impact digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 border-b border-[#093103]/20 relative bg-[#dbd8cf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
                Our Mission
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black">
                To bridge human ambition and autonomous technology
              </h2>
              <p className="text-base text-black/80 leading-relaxed">
                Traditional agencies often deliver slow websites, bloated templates, and vague promises. At <strong className="text-black font-bold">Smarter World</strong>, we believe every modern company deserves an enterprise-grade digital foundation.
              </p>
              <p className="text-base text-black/80 leading-relaxed">
                We combine the aesthetic polish of high-end design with the computational horsepower of modern TypeScript, Next.js, and autonomous AI agents. The outcome? Unrivaled speed, higher customer conversion, and automated operations that compound your advantage.
              </p>

              <div className="pt-3 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#dbd8cf] border border-[#093103]/20 shadow-card">
                  <div className="text-3xl font-black text-black">100%</div>
                  <div className="text-xs text-black/80 font-bold mt-1.5">
                    Senior Engineering Led
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#dbd8cf] border border-[#093103]/20 shadow-card">
                  <div className="text-3xl font-black text-black">Zero</div>
                  <div className="text-xs text-black/80 font-bold mt-1.5">
                    Template Bloat or Lock-in
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Highlights Card */}
            <div className="bg-[#dbd8cf] rounded-2xl p-8 sm:p-10 border-2 border-[#093103] shadow-forest relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#093103] text-white text-xs font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>The Smarter World Standard</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-black">
                  Next-Gen Engineering Standards
                </h3>

                <ul className="space-y-4 text-sm text-black">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>
                      <strong className="text-black font-bold">Strict TypeScript & Semantic HTML5:</strong> Bulletproof type safety and search engine discoverability.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>
                      <strong className="text-black font-bold">Edge-First Architecture:</strong> Instant worldwide asset and page delivery with Vercel and AWS CDN edges.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>
                      <strong className="text-black font-bold">Continuous AI Augmentation:</strong> Autonomous agent loops that handle customer inquiries and streamline data.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>
                      <strong className="text-black font-bold">Automated CI/CD & Testing:</strong> Zero regressions, predictable staging environments, and safe deployments.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#dbd8cf] border-b border-[#093103]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
              Principles
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black">
              The Principles That Guide Every Sprint
            </h2>
            <p className="text-base text-black/80">
              Our culture centers on craft, accountability, and engineering integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-7 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#093103] flex items-center justify-center text-white shadow-forest">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black group-hover:underline">{val.title}</h3>
                    <p className="text-sm text-black/80 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agency Milestones */}
      <section className="py-24 bg-[#dbd8cf]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black">
              Evolution of Smarter World
            </h2>
            <p className="text-base text-black/80">
              From high-performance frontend builds to enterprise autonomous AI agents.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {MILESTONES.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-7 rounded-2xl border border-[#093103]/20 bg-[#dbd8cf] hover:border-[#093103] hover:shadow-forest transition-all shadow-card"
              >
                <div className="px-4 py-2 rounded-xl bg-[#093103] text-white font-black text-sm tracking-wide shrink-0 shadow-forest">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Partner With a Team That Ships Results"
        subtitle="Schedule a direct discovery call with our leads to explore how we can elevate your web presence and automate key business processes."
        buttonText="Get in Touch with Us"
      />
    </div>
  );
}
