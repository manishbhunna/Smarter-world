import React from "react";
import { PROCESS_STEPS } from "@/data/servicesData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const phaseDeliverables = [
    "Technical Spec & Architecture Blueprint",
    "Bi-Weekly Staging Builds & CI/CD",
    "Core Web Vitals 95+ & Security Audit",
    "Autonomous Agent Ops & Source IP Handoff",
  ];

  return (
    <section className="py-24 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge className="text-xs uppercase tracking-wider bg-[#093103] text-white">
            Our Methodology
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black">
            A Rigorous, Deterministic Engineering Process
          </h2>
          <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-2xl mx-auto">
            We operate with absolute transparency, rapid weekly feedback loops, and zero ambiguity from initial architectural sprint to long-term autonomous maintenance.
          </p>
        </div>

        {/* Visual Phase Pipeline Progress Line for Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-14 mb-2">
          {PROCESS_STEPS.map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#093103] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                0{idx + 1}
              </div>
              <div className="h-[2px] flex-1 bg-[#093103]/25" />
              {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-[#093103]" />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-[#dbd8cf] rounded-2xl border-2 border-[#093103]/20 p-7 sm:p-8 shadow-card flex flex-col justify-between hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-black tracking-tight">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#093103] px-3 py-1 rounded-full shadow-sm">
                    Phase 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-black/80 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#093103]/20 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/70">
                  Target Output:
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-black bg-[#dbd8cf] border border-[#093103]/30 px-3 py-1.5 rounded-lg shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#093103] shrink-0" />
                  <span className="line-clamp-1">{phaseDeliverables[idx]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
