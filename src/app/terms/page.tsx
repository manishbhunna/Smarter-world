import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Service | Smarter World",
  description: "Terms of service and client engagement agreements for Smarter World agency.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#dbd8cf] min-h-screen py-20 text-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-black hover:text-[#093103] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Link>

        <div className="border-b border-[#093103]/20 pb-6">
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-black/70 mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-black/80 text-sm sm:text-base leading-relaxed bg-[#dbd8cf] border border-[#093103]/20 p-8 rounded-2xl shadow-card">
          <p>
            Welcome to <strong className="text-black font-bold">{SITE_CONFIG.name}</strong>. By accessing our website or engaging our software engineering and AI automation services, you agree to comply with and be bound by the following terms.
          </p>

          <h2 className="text-xl font-bold text-black pt-4">1. Scope of Services</h2>
          <p>
            Smarter World provides high-performance website development, custom software engineering, SaaS architecture, mobile applications, advertising optimization, and autonomous AI system integration. All technical engagements are governed by formal Statements of Work (SOW) outlining milestones and deliverables.
          </p>

          <h2 className="text-xl font-bold text-black pt-4">2. Intellectual Property Ownership</h2>
          <p>
            Upon full settlement of agreed project invoices, all custom source code, documentation, UI/UX designs, and bespoke software artifacts belong 100% to the client. Smarter World retains no ownership rights over your proprietary code or business assets.
          </p>

          <h2 className="text-xl font-bold text-black pt-4">3. Warranties & Code Integrity</h2>
          <p>
            We deliver production-tested code adhering to modern web standards, semantic HTML5, and strict type safety. We provide a post-launch warranty period for all custom projects to resolve any unexpected defects or environmental issues.
          </p>
        </div>
      </div>
    </div>
  );
}
