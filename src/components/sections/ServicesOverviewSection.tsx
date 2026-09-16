"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES_DATA, CATEGORIES, ServiceItem } from "@/data/servicesData";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServicesOverviewSectionProps {
  limit?: number;
  showFilters?: boolean;
}

export function ServicesOverviewSection({
  limit,
  showFilters = true,
}: ServicesOverviewSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (selectedCategory === "All") return true;
    return service.category === selectedCategory;
  });

  const displayedServices = limit
    ? filteredServices.slice(0, limit)
    : filteredServices;

  return (
    <section className="py-24 bg-[#dbd8cf] relative overflow-hidden border-b border-[#093103]/20" id="services-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Capabilities & Engineering Practices</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>11 Core Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black">
            End-to-End Digital Engineering & Intelligent Systems
          </h2>
          <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-2xl mx-auto">
            From modern responsive websites and custom SaaS to autonomous AI workflows and ROI-obsessed marketing funnels, we provide complete technical execution.
          </p>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#093103] text-white shadow-forest border border-[#093103]"
                      : "bg-[#dbd8cf] text-black border border-[#093103]/30 hover:bg-[#093103]/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service: ServiceItem, idx: number) => {
            const displayNumber = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-[#093103]/20 bg-[#dbd8cf] p-7 sm:p-8 shadow-card transition-all duration-300 hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Top index number watermark */}
                <div className="absolute top-4 right-5 text-4xl font-black text-[#093103]/15 select-none pointer-events-none">
                  {displayNumber}
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#093103] flex items-center justify-center text-white shadow-forest transition-transform duration-300 group-hover:scale-105">
                      <ServiceIcon name={service.iconName} className="w-6 h-6 text-white" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold text-white bg-[#093103] px-3 py-1 rounded-full shadow-sm">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-black tracking-tight mb-2.5 group-hover:underline">
                    {service.title}
                  </h3>
                  <p className="text-sm text-black/80 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables Highlights */}
                  <div className="space-y-2.5 border-t border-[#093103]/20 pt-5 mb-6">
                    {service.deliverables.slice(0, 3).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs text-black">
                        <div className="w-4 h-4 rounded-full bg-[#093103] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="line-clamp-1 font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies & CTA Link */}
                <div className="pt-4 border-t border-[#093103]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {service.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase font-bold text-black bg-[#dbd8cf] border border-[#093103]/40 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center text-xs font-bold text-black hover:underline group-hover:translate-x-0.5"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-black transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to View All if limited */}
        {limit && limit < SERVICES_DATA.length && (
          <div className="mt-14 text-center">
            <Link href="/services">
              <Button size="lg" className="shadow-forest font-bold bg-[#093103] text-white hover:bg-black">
                <span>Explore All {SERVICES_DATA.length} Services</span>
                <ArrowRight className="w-4 h-4 ml-2 text-white" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
