import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us | Smarter World Digital & AI Agency",
  description:
    "Get in touch with Smarter World. Discuss your web development, custom software, SaaS, or AI agent automation project directly with our senior engineering team.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Smarter World | Digital & AI Agency",
    description:
      "Connect with our senior engineering leads. 24-hour turnaround guaranteed.",
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#dbd8cf] min-h-screen text-black">
      {/* Header */}
      <section className="pt-20 pb-16 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl relative z-10">
          <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
            Direct Communication
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight">
            Connect Directly with Our{" "}
            <span className="underline decoration-[#093103] decoration-4 underline-offset-8">
              Engineering Team
            </span>
          </h1>
          <p className="text-base sm:text-lg text-black/80 leading-relaxed">
            No slow forms or bureaucratic layers. Reach out directly to our principal architects via email or phone to discuss your project roadmap, architecture, and timeline.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* 4 Direct Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Email Channel */}
          <div className="bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-7 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#093103] text-white flex items-center justify-center mb-5 shadow-forest">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1">
                Direct Email
              </span>
              <h3 className="text-base font-bold text-black mb-2 break-all">
                {SITE_CONFIG.contact.email}
              </h3>
              <p className="text-xs text-black/80 leading-relaxed mb-6">
                Send us your RFP, specifications, or initial scope for a 24-hour review.
              </p>
            </div>
            <a href={`mailto:${SITE_CONFIG.contact.email}`}>
              <Button size="sm" className="w-full justify-center shadow-forest font-bold bg-[#093103] text-white hover:bg-black">
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-white" />
              </Button>
            </a>
          </div>

          {/* Phone Channel */}
          <div className="bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-7 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#093103] text-white flex items-center justify-center mb-5 shadow-forest">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1">
                Direct Phone
              </span>
              <h3 className="text-base font-bold text-black mb-2">
                {SITE_CONFIG.contact.phone}
              </h3>
              <p className="text-xs text-black/80 leading-relaxed mb-6">
                Direct line for project scoping, client partnerships, and emergency support.
              </p>
            </div>
            <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g, "")}`}>
              <Button variant="outline" size="sm" className="w-full justify-center border-2 border-[#093103] text-black hover:bg-[#093103] hover:text-white font-bold">
                <span>Call Directly</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </a>
          </div>

          {/* Headquarters */}
          <div className="bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-7 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#093103] text-white flex items-center justify-center mb-5 shadow-forest">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1">
                Headquarters
              </span>
              <h3 className="text-base font-bold text-black mb-2">
                San Francisco, CA
              </h3>
              <p className="text-xs text-black/80 leading-relaxed mb-6">
                {SITE_CONFIG.contact.address}
              </p>
            </div>
            <div className="text-xs font-bold text-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#093103]" />
              <span>SF Hub & Global Remote</span>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-7 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#093103] text-white flex items-center justify-center mb-5 shadow-forest">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1">
                Office Hours
              </span>
              <h3 className="text-base font-bold text-black mb-2">
                Mon - Fri: 8am - 6pm PST
              </h3>
              <p className="text-xs text-black/80 leading-relaxed mb-6">
                Engineers active across Pacific, Eastern, and European sprint time zones.
              </p>
            </div>
            <div className="text-xs font-bold text-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#093103] animate-pulse" />
              <span>Active Sprints Operational</span>
            </div>
          </div>
        </div>

        {/* Technical Direct Engagement Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* How to initiate directly */}
          <div className="lg:col-span-7 bg-[#dbd8cf] rounded-2xl border border-[#093103]/20 p-8 sm:p-10 shadow-card space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#093103] flex items-center justify-center text-white shadow-forest">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  Fast-Track Direct Engagement
                </h3>
                <span className="text-xs text-black/70">Direct connection to principal engineering</span>
              </div>
            </div>

            <p className="text-sm text-black/80 leading-relaxed">
              To discuss a new project, email us directly at <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-black font-bold underline">{SITE_CONFIG.contact.email}</a> with any of the following details:
            </p>

            <div className="space-y-3.5 text-sm text-black">
              <div className="flex items-start gap-3 bg-[#dbd8cf] p-4 rounded-xl border border-[#093103]/30">
                <span className="w-6 h-6 rounded-lg bg-[#093103] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-black block font-bold">Project Objectives & Scope:</strong>
                  <span className="text-xs text-black/80">Target web application, SaaS platform, mobile app, redesign, or autonomous AI automation.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#dbd8cf] p-4 rounded-xl border border-[#093103]/30">
                <span className="w-6 h-6 rounded-lg bg-[#093103] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-black block font-bold">Existing Infrastructure & Stack:</strong>
                  <span className="text-xs text-black/80">Current codebase, APIs, cloud hosts (AWS, Vercel), or integrations needed.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#dbd8cf] p-4 rounded-xl border border-[#093103]/30">
                <span className="w-6 h-6 rounded-lg bg-[#093103] text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-black block font-bold">Preferred Timeline & Milestones:</strong>
                  <span className="text-xs text-black/80">Target launch window, sprint cadence, or commercial deadlines.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a href={`mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent("Project Architecture & Scoping Inquiry")}`}>
                <Button size="lg" className="w-full sm:w-auto shadow-forest font-bold bg-[#093103] text-white hover:bg-black">
                  <span>Send Direct Email to Principal Lead</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-white" />
                </Button>
              </a>
            </div>
          </div>

          {/* Guarantees & What to Expect */}
          <div className="lg:col-span-5 bg-[#dbd8cf] rounded-2xl border-2 border-[#093103] p-8 sm:p-10 shadow-forest space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#093103] flex items-center justify-center text-white shadow-forest">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">
                    Our Engagement Guarantees
                  </h3>
                  <span className="text-xs text-black/70">Standards across every communication</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-black">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>
                    <strong className="text-black font-bold">24-Hour Assessment:</strong> Every inquiry is reviewed by a Senior Principal Architect with direct technical feedback.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>
                    <strong className="text-black font-bold">Mutual NDA Standard:</strong> We readily execute non-disclosure agreements before reviewing proprietary systems or data.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>
                    <strong className="text-black font-bold">Deterministic Scope & Pricing:</strong> Transparent sprint-based deliverables with zero hidden agency markups.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>
                    <strong className="text-black font-bold">100% IP Ownership:</strong> Complete source code and intellectual property transferred unconditionally upon release.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#093103]/20">
              <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g, "")}`} className="block w-full">
                <Button variant="outline" size="lg" className="w-full justify-center border-2 border-[#093103] text-black hover:bg-[#093103] hover:text-white font-bold">
                  <Phone className="w-4 h-4 mr-2 text-inherit" />
                  <span>Call +1 (800) 582-9675</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
