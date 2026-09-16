"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Search,
  X,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  SERVICES_DATA,
  CATEGORIES,
  PROCESS_STEPS,
  CASE_STUDIES,
  ServiceItem,
} from "@/data/servicesData";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "How does Smarter World compare to traditional digital agencies?",
    a: "Unlike legacy agencies that rely on outsourced teams or slow markup templates, we are senior engineers and AI practitioners. We write clean, typed TypeScript code, utilize the modern Next.js ecosystem, build autonomous AI agents, and guarantee sub-second page performance with 95+ Core Web Vitals.",
  },
  {
    q: "Do we retain 100% ownership of our code, designs, and intellectual property?",
    a: "Yes, unconditionally. From day one of launch, you own all Git repositories, custom designs, proprietary datasets, AI prompt templates, and infrastructure setups. There is zero vendor lock-in.",
  },
  {
    q: "Can AI integration or AI agents work with our legacy software?",
    a: "Absolutely. We routinely connect LLMs, semantic vector search, and autonomous multi-agent pipelines to legacy relational databases, custom REST/SOAP APIs, and third-party CRMs (Salesforce, HubSpot, SAP) via secure webhooks and middleware.",
  },
  {
    q: "What is your standard delivery timeline for web and software projects?",
    a: "Standard website development and redesign projects typically span 3 to 6 weeks. Custom web applications, SaaS MVPs, and complex AI agent workflows typically require 6 to 12 weeks with deterministic bi-weekly staging deliverables.",
  },
  {
    q: "How do you guarantee technical SEO and mobile responsiveness?",
    a: "Every web project is built using semantic HTML5 elements, automated schema markup (JSON-LD), server-rendered meta tags, automated sitemaps, robots directives, and fluid responsive Tailwind layouts rigorously audited across dozens of physical mobile and desktop viewports.",
  },
];

export function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SERVICES_DATA.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = SERVICES_DATA.filter((s) => s.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        activeCategory === "All" || service.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.fullDescription.toLowerCase().includes(query) ||
        service.technologies.some((t) => t.toLowerCase().includes(query)) ||
        service.deliverables.some((d) => d.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isFiltered = activeCategory !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-28">
      {/* 1. Refined Filter & Search Toolbar */}
      <div className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-4 sm:p-5 shadow-card">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] ?? 0;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#093103] text-white shadow-forest border border-[#093103]"
                      : "bg-[#dbd8cf] text-black border border-[#093103]/25 hover:bg-[#093103]/10"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#093103]/10 text-black font-semibold"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search practices, tech, deliverables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-[#093103]/30 bg-[#dbd8cf] text-black placeholder:text-black/50 focus:outline-none focus:border-[#093103] focus:ring-2 focus:ring-[#093103]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary & Reset Action */}
        <div className="mt-3 pt-3 border-t border-[#093103]/15 flex items-center justify-between text-xs text-black/75">
          <div>
            Showing <strong className="text-black font-bold">{filteredServices.length}</strong> of{" "}
            {SERVICES_DATA.length} practices
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <strong className="text-black font-bold">"{activeCategory}"</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                matching <strong className="text-black font-bold">"{searchQuery}"</strong>
              </span>
            )}
          </div>
          {isFiltered && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="font-bold text-black hover:text-[#093103] cursor-pointer flex items-center gap-1 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 2. Services Detailed Dossier Cards */}
      <div className="space-y-14 sm:space-y-16">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-[#dbd8cf] rounded-3xl border border-[#093103]/25 p-8 shadow-card">
            <h4 className="text-xl font-bold text-black mb-2">No matching engineering practices</h4>
            <p className="text-black/70 text-sm max-w-md mx-auto mb-6">
              We couldn't find any services matching your search or category filter. Try clearing your search term or exploring all practices.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#093103] text-white hover:bg-black transition-colors cursor-pointer"
            >
              Show All 11 Services
            </button>
          </div>
        ) : (
          filteredServices.map((service, index) => {
            const serviceNumber = String(
              SERVICES_DATA.findIndex((s) => s.id === service.id) + 1
            ).padStart(2, "0");

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-32 rounded-3xl border border-[#093103]/20 bg-[#dbd8cf] p-7 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(9,49,3,0.05)] hover:border-[#093103] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual Blueprint Number Watermark */}
                <div className="absolute top-6 right-8 text-4xl sm:text-6xl font-mono font-black text-black/10 select-none pointer-events-none group-hover:text-[#093103]/20 transition-colors">
                  {serviceNumber}
                </div>

                {/* Service Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6">
                  {/* High Contrast #093103 Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#093103] flex items-center justify-center text-white shrink-0 shadow-forest">
                    <ServiceIcon name={service.iconName} className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Badges */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#093103]/30 text-black bg-[#dbd8cf]">
                        {service.category}
                      </span>
                      {service.badge && (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#093103] text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Editorial Overview Narrative */}
                <div className="space-y-2 mb-8 max-w-4xl">
                  <p className="text-base sm:text-lg font-semibold text-black/90 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <p className="text-sm sm:text-base text-black/75 leading-relaxed font-normal">
                    {service.fullDescription}
                  </p>
                </div>

                {/* 2-Column Split: Left Deliverables | Right Architecture & Action */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 border-t border-[#093103]/15">
                  {/* Left Column: Key Deliverables Checklist */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#093103]" />
                      <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                        Included Deliverables & Specifications
                      </h4>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.deliverables.map((del, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-black group/item"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="font-medium text-xs sm:text-sm text-black leading-snug">
                            {del}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Technical Stack, Commercial ROI & Action Box */}
                  <div className="lg:col-span-5 bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-6 sm:p-7 space-y-6 flex flex-col justify-between shadow-sm">
                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-xs font-bold text-black/70 uppercase tracking-wider mb-3">
                        Production Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-semibold bg-[#dbd8cf] text-black px-3 py-1.5 rounded-xl border border-[#093103]/30 hover:border-[#093103] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Business Benefits */}
                    <div>
                      <h4 className="text-xs font-bold text-black/70 uppercase tracking-wider mb-2.5">
                        Commercial ROI & Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#093103] shrink-0 mt-1.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inquiry CTA & Guarantee */}
                    <div className="pt-4 border-t border-[#093103]/20 space-y-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="block w-full"
                      >
                        <Button
                          size="lg"
                          className="w-full justify-center h-12 rounded-xl font-bold bg-[#093103] text-white hover:bg-black shadow-forest group"
                        >
                          <span>Inquire About {service.title}</span>
                          <ArrowRight className="w-4 h-4 ml-2 text-white transition-transform duration-200 group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <p className="text-center text-[11px] font-medium text-black/60">
                        Includes senior architecture review • 100% IP ownership
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* 3. Deterministic 4-Phase Delivery Protocol (Engineering Process) */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider">
            <span>Execution Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            How We Architect & Deliver
          </h2>
          <p className="text-sm sm:text-base text-black/80 max-w-2xl mx-auto">
            Every engagement adheres to our deterministic 4-stage engineering lifecycle, guaranteeing clean delivery, strict milestone tracking, and complete code transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#dbd8cf] border border-[#093103]/25 rounded-2xl p-6 sm:p-7 space-y-4 relative overflow-hidden hover:border-[#093103] transition-all shadow-card group"
            >
              {/* Number Badge */}
              <div className="w-10 h-10 rounded-xl bg-[#093103] text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                {step.step}
              </div>

              <h3 className="text-lg font-extrabold text-black tracking-tight">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Proven Case Studies & Measured Commercial Impact */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
            <span>Proven Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            Real Impact Across Our Practices
          </h2>
          <p className="text-sm sm:text-base text-black/80 max-w-2xl mx-auto">
            Review measurable business gains achieved through our web platforms, custom SaaS, and autonomous AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="bg-[#dbd8cf] border border-[#093103]/25 rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-card hover:border-[#093103] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-[#093103]/15 pb-4">
                  <span className="text-xs font-bold text-black uppercase tracking-wider">
                    {study.client}
                  </span>
                  <span className="text-[11px] font-semibold text-black/70 bg-[#093103]/10 px-2.5 py-1 rounded-full">
                    {study.service}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                  {study.metric}
                </div>

                <h3 className="text-lg font-extrabold text-black tracking-tight leading-snug">
                  {study.title}
                </h3>

                <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                  {study.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#093103]/15">
                <div className="text-[11px] font-bold text-black/60 uppercase tracking-wider mb-2">
                  Integrated Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {study.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium bg-[#dbd8cf] text-black px-2.5 py-1 rounded-lg border border-[#093103]/25"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Architectural Comparison Matrix */}
      <section className="bg-[#dbd8cf] rounded-3xl border border-[#093103]/25 p-7 sm:p-12 shadow-card space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider">
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            How We Compare Against Alternatives
          </h2>
          <p className="text-sm sm:text-base text-black/80">
            A transparent breakdown of why ambitious brands partner with our senior engineering team over freelance boards or legacy agencies.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#093103]/25 bg-[#dbd8cf]">
                <th className="py-4 px-5 font-extrabold text-black">Engineering Standard</th>
                <th className="py-4 px-5 font-black text-white bg-[#093103] rounded-t-xl border-x border-[#093103]">
                  Smarter World Agency
                </th>
                <th className="py-4 px-5 font-bold text-black/70">Freelance Marketplaces</th>
                <th className="py-4 px-5 font-bold text-black/70">Legacy Agencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#093103]/15">
              <tr>
                <td className="py-4 px-5 font-bold text-black">Codebase Architecture</td>
                <td className="py-4 px-5 text-black bg-[#093103]/10 border-x border-[#093103]/30 font-bold">
                  Modern Next.js 14, TypeScript & Semantic HTML5
                </td>
                <td className="py-4 px-5 text-black/70">Unvetted code, fragile third-party plugins</td>
                <td className="py-4 px-5 text-black/70">Heavy CMS monoliths, outdated frameworks</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-black">Autonomous AI Capabilities</td>
                <td className="py-4 px-5 text-black bg-[#093103]/10 border-x border-[#093103]/30 font-bold">
                  Native Multi-Agent Swarms, Vector RAG & Tool Calling
                </td>
                <td className="py-4 px-5 text-black/70">Basic prompt wrappers & simple widgets</td>
                <td className="py-4 px-5 text-black/70">Subcontracted third-party vendors</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-black">Performance & SEO Benchmark</td>
                <td className="py-4 px-5 text-black bg-[#093103]/10 border-x border-[#093103]/30 font-bold">
                  95+ Lighthouse Score & Sub-Second Latency
                </td>
                <td className="py-4 px-5 text-black/70">Unoptimized page weights and slow TTFB</td>
                <td className="py-4 px-5 text-black/70">Expensive line-item add-ons</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-black">Intellectual Property Rights</td>
                <td className="py-4 px-5 text-black bg-[#093103]/10 border-x border-[#093103]/30 font-bold">
                  100% Client Owned, Full Git Repository Transfer
                </td>
                <td className="py-4 px-5 text-black/70">Ambiguous contractual rights</td>
                <td className="py-4 px-5 text-black/70">Proprietary platform and CMS lock-in</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-bold text-black">Communication & Team Lead</td>
                <td className="py-4 px-5 text-black bg-[#093103]/10 border-x border-[#093103]/30 font-bold">
                  Direct Senior Technical Lead, Bi-Weekly Deployments
                </td>
                <td className="py-4 px-5 text-black/70">Time zone friction & inconsistent availability</td>
                <td className="py-4 px-5 text-black/70">Layers of non-technical account managers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Frequently Asked Questions Accordion */}
      <section className="space-y-10" id="faq">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider">
            <span>Direct Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-black/80">
            Have questions about our service contracts, delivery timeline, or intellectual property transfer?
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const faqNum = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className="border border-[#093103]/20 rounded-2xl bg-[#dbd8cf] overflow-hidden transition-all hover:border-[#093103]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 font-bold text-black text-sm sm:text-base hover:bg-[#093103]/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-black/50">
                      {faqNum}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-black shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-2 text-xs sm:text-sm text-black/80 leading-relaxed border-t border-[#093103]/15">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Support Note */}
        <div className="max-w-xl mx-auto text-center pt-6">
          <p className="text-xs sm:text-sm text-black/75">
            Have a specialized architecture question or custom RFP?{" "}
            <Link
              href="/contact"
              className="font-bold text-black hover:text-[#093103] transition-colors"
            >
              Speak directly with our technical lead
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
