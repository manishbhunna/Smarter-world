"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProjectScopeCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Website Development",
  ]);
  const [timeline, setTimeline] = useState<"standard" | "accelerated" | "enterprise">(
    "standard"
  );
  const [stage, setStage] = useState<"startup" | "growth" | "enterprise">("growth");

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const serviceOptions = [
    "Website Development",
    "Custom Web Application",
    "Ecommerce Platform",
    "Website Redesign",
    "SaaS Architecture",
    "Mobile App",
    "Google & Meta Ads",
    "AI Workflow Automation",
    "Autonomous AI Agents",
  ];

  // Dynamic estimate estimation logic
  const calculateTimelineEstimate = () => {
    const baseWeeks = Math.max(3, selectedServices.length * 1.5);
    if (timeline === "accelerated") return `${Math.max(2, Math.round(baseWeeks * 0.7))} - ${Math.round(baseWeeks * 0.9)} Weeks`;
    if (timeline === "enterprise") return `${Math.round(baseWeeks * 1.2)} - ${Math.round(baseWeeks * 1.6)} Weeks`;
    return `${Math.round(baseWeeks)} - ${Math.round(baseWeeks * 1.3)} Weeks`;
  };

  return (
    <section className="py-24 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
            Interactive Scoping Tool
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black">
            Estimate Your Project Scope & Timeline
          </h2>
          <p className="text-base sm:text-lg text-black/80 leading-relaxed">
            Select your target requirements below to see an instant architectural overview and recommended engineering timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-[#dbd8cf] p-7 sm:p-9 rounded-2xl border border-[#093103]/20 shadow-card space-y-8">
            {/* Step 1: Services */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-sm font-bold text-black flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#093103] text-white text-xs flex items-center justify-center font-bold">1</span>
                  Select Desired Services (Multi-select)
                </label>
                <span className="text-xs text-black font-bold">{selectedServices.length} selected</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((service) => {
                  const isChecked = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-[#093103] border-[#093103] text-white font-bold shadow-forest"
                          : "bg-[#dbd8cf] border-[#093103]/30 text-black hover:bg-[#093103]/10"
                      }`}
                    >
                      <span>{service}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Company Stage */}
            <div>
              <label className="text-sm font-bold text-black flex items-center gap-2 mb-3.5">
                <span className="w-5 h-5 rounded-full bg-[#093103] text-white text-xs flex items-center justify-center font-bold">2</span>
                Business Stage
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { id: "startup", label: "Seed / Startup" },
                    { id: "growth", label: "Scale-Up / Growth" },
                    { id: "enterprise", label: "Enterprise Brand" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStage(item.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      stage === item.id
                        ? "bg-[#093103] text-white border-[#093103] shadow-forest"
                        : "bg-[#dbd8cf] text-black border-[#093103]/30 hover:bg-[#093103]/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Desired Timeline */}
            <div>
              <label className="text-sm font-bold text-black flex items-center gap-2 mb-3.5">
                <span className="w-5 h-5 rounded-full bg-[#093103] text-white text-xs flex items-center justify-center font-bold">3</span>
                Delivery Timeline Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { id: "accelerated", label: "Fast-Track Sprint" },
                    { id: "standard", label: "Standard Agile" },
                    { id: "enterprise", label: "Multi-Quarter" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTimeline(item.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      timeline === item.id
                        ? "bg-[#093103] text-white border-[#093103] shadow-forest"
                        : "bg-[#dbd8cf] text-black border-[#093103]/30 hover:bg-[#093103]/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-[#dbd8cf] p-7 sm:p-9 rounded-2xl border-2 border-[#093103] shadow-forest space-y-6 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#093103]" />

            <div className="flex items-center gap-3 pb-4 border-b border-[#093103]/20">
              <div className="w-10 h-10 rounded-xl bg-[#093103] flex items-center justify-center text-white shadow-forest">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">
                  Architectural Blueprint
                </h3>
                <span className="text-xs text-black/70">Live Scoping Overview</span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-2">
                  Selected Capabilities ({selectedServices.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedServices.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-[#093103] text-white font-semibold px-3 py-1 rounded-lg shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1">
                  Estimated Delivery Window
                </span>
                <div className="flex items-center gap-3 text-3xl font-black text-black">
                  <div className="w-8 h-8 rounded-lg bg-[#093103] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span>{calculateTimelineEstimate()}</span>
                </div>
                <p className="text-xs text-black/80 mt-1.5 leading-relaxed">
                  Includes full discovery, architecture, responsive UI, automated testing & cloud rollout.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-black/70 uppercase tracking-wider block mb-1.5">
                  Recommended Core Stack
                </span>
                <div className="text-xs text-black font-medium bg-[#dbd8cf] p-3.5 rounded-xl border border-[#093103]/30 leading-relaxed">
                  Next.js App Router, TypeScript, Tailwind CSS, Vercel/AWS Edge, PostgreSQL, and autonomous LLM orchestration pipelines.
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#093103]/20">
              <Link
                href={`/contact?services=${encodeURIComponent(
                  selectedServices.join(",")
                )}&stage=${stage}`}
                className="block w-full"
              >
                <Button size="lg" className="w-full justify-center shadow-forest font-bold bg-[#093103] text-white hover:bg-black group">
                  <span>Lock In Scope & Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-[11px] text-center text-black/70 mt-2.5">
                No commitments. Direct discussion with our Principal Engineering Lead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
