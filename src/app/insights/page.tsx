import React from "react";
import type { Metadata } from "next";
import { InsightsClient } from "@/components/insights/InsightsClient";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights & Technical Perspectives | Acovate Digital Agency",
  description:
    "Explore Acovate's engineering research, autonomous AI agent blueprints, sub-second Next.js edge benchmarks, PostgreSQL SaaS scaling, and performance marketing teardowns.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Technical Insights & Research | Acovate",
    description:
      "Production playbooks, architectural post-mortems, and autonomous AI blueprints from senior engineers.",
    url: `${SITE_CONFIG.url}/insights`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
};

export default function InsightsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Acovate Agency Insights & Technical Perspectives",
    description:
      "Deep-dive technical perspectives, autonomous AI agent blueprints, Next.js performance playbooks, SaaS multi-tenancy architecture, and industry benchmarks.",
    url: `${SITE_CONFIG.url}/insights`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <div className="bg-[#dbd8cf] min-h-screen text-black">
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Insights Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <InsightsClient />
      </main>
    </div>
  );
}
