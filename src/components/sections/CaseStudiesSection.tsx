import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "@/data/servicesData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CaseStudiesSection() {
  return (
    <section className="py-24 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
              Proven Outcomes
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black">
              Transformative Real-World Impact
            </h2>
            <p className="text-base sm:text-lg text-black/80 leading-relaxed">
              We don&apos;t just deliver clean code; we produce quantifiable business results across revenue growth, operational efficiency, and user conversion.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="shadow-forest shrink-0 font-bold bg-[#093103] text-white hover:bg-black">
              <span>Discuss Your Case</span>
              <ArrowRight className="w-4 h-4 ml-2 text-white" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border-2 border-[#093103]/20 bg-[#dbd8cf] p-7 sm:p-8 shadow-card hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#093103]" />
                    <span>{study.client}</span>
                  </div>
                  <span className="text-[11px] font-bold text-white bg-[#093103] px-3 py-1 rounded-full shadow-sm">
                    {study.service}
                  </span>
                </div>

                {/* Hero Metric Highlight Card */}
                <div className="bg-[#dbd8cf] border border-[#093103]/40 p-4 rounded-xl mb-5 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#093103] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-black leading-none">
                      {study.metric}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-black/70 tracking-wider">
                      Verified Result
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black mb-3 leading-snug">
                  {study.title}
                </h3>
                <p className="text-sm text-black/80 leading-relaxed mb-6">
                  {study.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#093103]/20">
                <p className="text-[11px] uppercase font-bold tracking-wider text-black/70 mb-2.5">
                  Core Technologies
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-semibold bg-[#dbd8cf] text-black px-3 py-1 rounded-lg border border-[#093103]/40 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
