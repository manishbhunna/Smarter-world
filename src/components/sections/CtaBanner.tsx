import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export function CtaBanner({
  title = "Ready to Build Something Smarter?",
  subtitle = "Connect directly with our senior engineering team to map your technical requirements, architecture, and timeline.",
  buttonText = "Start Your Project",
}: CtaBannerProps) {
  return (
    <section className="py-24 bg-[#dbd8cf] text-black relative overflow-hidden border-b border-[#093103]/20">
      <div className="absolute inset-0 bg-grid-white opacity-40 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#dbd8cf] border-2 border-[#093103] rounded-3xl p-8 sm:p-14 shadow-forest text-center space-y-7 relative overflow-hidden">
          {/* Top subtle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Next Project Starts Here</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-tight max-w-3xl mx-auto">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-black/80 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-bold shadow-forest bg-[#093103] text-white hover:bg-black group">
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-2 text-white transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+18005829675" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-[#093103] text-black hover:bg-[#093103] hover:text-white font-bold"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-inherit" />
                Call +1 (800) 582-9675
              </Button>
            </a>
          </div>

          {/* Bottom confidence guarantees */}
          <div className="pt-6 border-t border-[#093103]/20 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-black font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#093103]" />
              <span>24-Hour Assessment Turnaround</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#093103]" />
              <span>Mutual NDA Executed Prior</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#093103]" />
              <span>Direct Senior Lead Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
