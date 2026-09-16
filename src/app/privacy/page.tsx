import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Smarter World",
  description: "Privacy policy and data protection principles of Smarter World agency.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#dbd8cf] min-h-screen py-20 text-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-black hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Link>

        <div className="border-b border-[#093103]/20 pb-6">
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-black/70 mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-black/80 text-sm sm:text-base leading-relaxed bg-[#dbd8cf] border border-[#093103]/20 p-8 rounded-2xl shadow-card">
          <p>
            At <strong className="text-black font-bold">{SITE_CONFIG.name}</strong>, we respect your personal privacy and are committed to maintaining the highest security and compliance standards across all digital interactions and client engagements.
          </p>

          <h2 className="text-xl font-bold text-black pt-4">1. Information We Collect</h2>
          <p>
            We collect information you explicitly provide when submitting inquiry forms, requesting discovery calls, or communicating with our team. This includes your name, business email, organization name, phone number, and submitted technical specifications.
          </p>

          <h2 className="text-xl font-bold text-black pt-4">2. Client Data & AI Privacy Guarantees</h2>
          <p>
            We operate with strict enterprise privacy guardrails:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-black/80">
            <li>We do NOT use client proprietary data, codebases, or prompt inputs to train public foundational AI models.</li>
            <li>All vector embeddings, database schemas, and API secrets remain strictly isolated and governed by your access policies.</li>
            <li>Client deliverables are protected under comprehensive non-disclosure agreements (NDAs).</li>
          </ul>

          <h2 className="text-xl font-bold text-black pt-4">3. Data Retention and Security</h2>
          <p>
            We apply industry-standard encryption in transit (TLS 1.3) and at rest. You may request deletion of your contact data or archived project communications at any time by contacting us at{" "}
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-black font-bold underline">
              {SITE_CONFIG.contact.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
