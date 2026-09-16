import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/servicesData";
import { Badge } from "@/components/ui/badge";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#dbd8cf] border-b border-[#093103]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>4.9 / 5.0 Average Client Rating · 40+ Engagements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black">
            Trusted by Builders, Founders & Growth Leaders
          </h2>
          <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-2xl mx-auto">
            See how Smarter World&apos;s engineering and AI solutions drive measurable, lasting momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#dbd8cf] border-2 border-[#093103]/20 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-card hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative quotation watermark */}
              <Quote className="absolute top-5 right-5 w-16 h-16 text-[#093103]/10 pointer-events-none select-none" />

              <div className="relative z-10">
                {/* 5 Stars in #093103 background badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#093103] w-fit mb-6 shadow-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                  ))}
                  <span className="text-[10px] font-bold text-white ml-1">5.0</span>
                </div>
                <p className="text-black text-sm sm:text-base leading-relaxed italic mb-8 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-[#093103]/20 relative z-10">
                <div className="w-11 h-11 rounded-full bg-[#093103] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-forest">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-black flex items-center gap-1.5">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#093103]" />
                  </div>
                  <div className="text-xs text-black/70 font-semibold">
                    {t.role} · <span className="text-black font-bold">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
