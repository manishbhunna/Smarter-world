"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BlogPostClient } from "@/components/insights/BlogPostClient";
import { INSIGHTS_DATA } from "@/data/insightsData";

function PostViewer() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || searchParams.get("id") || "";
  const initialPost = INSIGHTS_DATA.find((item) => item.slug === slug) || null;

  return <BlogPostClient slug={slug} initialPost={initialPost} />;
}

export default function DynamicPostPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#dbd8cf] text-black flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#093103] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-black/70 uppercase tracking-wider">
              Loading Technical Brief...
            </p>
          </div>
        </div>
      }
    >
      <PostViewer />
    </Suspense>
  );
}
