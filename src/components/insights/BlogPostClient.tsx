"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  Code2,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { InsightItem, INSIGHTS_DATA } from "@/data/insightsData";
import { getStoredInsights, getInsightHref } from "@/lib/insightsStorage";

interface BlogPostClientProps {
  slug: string;
  initialPost?: InsightItem | null;
}

export function BlogPostClient({ slug, initialPost }: BlogPostClientProps) {
  const [post, setPost] = useState<InsightItem | null>(initialPost || null);
  const [allInsights, setAllInsights] = useState<InsightItem[]>(INSIGHTS_DATA);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = getStoredInsights();
    setAllInsights(stored);

    // Find the latest post version by slug in localStorage
    const found = stored.find((item) => item.slug === slug);
    if (found) {
      setPost(found);
    } else if (initialPost) {
      setPost(initialPost);
    }
  }, [slug, initialPost]);

  // If post not found yet
  if (!post) {
    return (
      <div className="bg-[#dbd8cf] min-h-screen text-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4 bg-[#dbd8cf] border-2 border-[#093103]/30 rounded-3xl p-8 shadow-card">
          <div className="w-12 h-12 rounded-full bg-[#093103] text-white flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-black">Article Not Found</h1>
          <p className="text-sm text-black/75">
            The requested technical brief could not be located in our production repository.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Insights</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related articles (pick other posts from current store)
  const relatedPosts = allInsights.filter((item) => item.id !== post.id).slice(0, 3);

  return (
    <div className="bg-[#dbd8cf] min-h-screen text-black">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/75 hover:text-[#093103] transition-colors py-2 px-3.5 rounded-xl border border-[#093103]/20 hover:border-[#093103] hover:bg-[#093103]/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          <Link
            href="/admin"
            className="text-xs text-black/60 hover:text-[#093103] underline font-medium"
          >
            Admin Panel
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black bg-[#093103] text-white px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-black/75">
              <Clock className="w-3.5 h-3.5 text-[#093103]" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-black/75">
              <Calendar className="w-3.5 h-3.5 text-[#093103]" />
              <span>{post.date}</span>
            </div>
            {post.featured && (
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>Featured Perspective</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.12]">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-black/85 leading-relaxed font-normal">
            {post.subtitle}
          </p>

          {/* Author Byline Block */}
          <div className="pt-4 pb-2 border-y border-[#093103]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#093103] text-white flex items-center justify-center font-bold text-base shadow-sm">
                {post.author.avatar}
              </div>
              <div>
                <div className="text-base font-bold text-black">{post.author.name}</div>
                <div className="text-xs sm:text-sm text-black/70">
                  {post.author.role} • Acovate Engineering
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-black transition-colors"
              >
                Discuss Architecture
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Cover Photo */}
        <div className="my-10 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-[#093103]/25 shadow-forest-lg">
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
            <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
              {post.category} Technical Architecture Brief
            </span>
            <span className="bg-[#093103]/90 px-3 py-1 rounded-full font-bold">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Empirical Performance Metrics Row */}
        {post.metrics && post.metrics.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-wider text-black/70 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#093103]" />
              <span>Verified Benchmark Telemetry</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#dbd8cf] border-2 border-[#093103]/30 rounded-2xl p-5 text-center shadow-card"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#093103]">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-black/75 uppercase tracking-wider mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Summary Callout */}
        <section className="mb-10 bg-[#dbd8cf] border-l-4 border-[#093103] p-6 sm:p-7 rounded-r-3xl border-y border-r border-[#093103]/25 shadow-sm space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-[#093103] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#093103]" />
            <span>Executive Architecture Summary</span>
          </div>
          <p className="text-base sm:text-lg text-black/90 leading-relaxed font-medium">
            {post.summary}
          </p>
        </section>

        {/* Strategic Takeaways */}
        {post.executiveTakeaways && post.executiveTakeaways.length > 0 && (
          <section className="mb-12 bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-black tracking-tight">
              Strategic Takeaways for Engineering Leaders
            </h2>
            <div className="space-y-3">
              {post.executiveTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-black/85">
                  <CheckCircle2 className="w-5 h-5 text-[#093103] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Article Body & Sections */}
        <div className="space-y-12 mb-14">
          {post.sections &&
            post.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  {sec.heading}
                </h2>
                <div className="space-y-4">
                  {sec.content.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-lg text-black/85 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {sec.codeSnippet && (
                  <div className="my-6 rounded-2xl overflow-hidden border-2 border-[#093103]/40 bg-black text-white shadow-forest">
                    <div className="bg-black/90 px-4 py-2.5 border-b border-[#093103]/40 flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>{sec.codeLanguage || "typescript"}</span>
                      </span>
                      <span className="text-white/50 text-[11px]">Production Schema</span>
                    </div>
                    <pre className="p-5 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
        </div>

        {/* Production Stack Components */}
        {post.stack && post.stack.length > 0 && (
          <section className="pt-8 border-t border-[#093103]/25 mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#093103]" />
              <span>Production Stack Architecture:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {post.stack.map((item) => (
                <span
                  key={item}
                  className="text-xs font-bold bg-[#dbd8cf] border border-[#093103] text-black px-3.5 py-1.5 rounded-xl shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio & Advisory Box */}
        <section className="bg-[#dbd8cf] border-2 border-[#093103] rounded-3xl p-6 sm:p-8 shadow-forest mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#093103] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-lg font-black text-black">{post.author.name}</div>
              <div className="text-xs font-bold text-[#093103]">{post.author.role}</div>
              <p className="text-xs text-black/75 mt-1 max-w-md">
                Senior engineering lead specializing in enterprise digital transformation, autonomous systems, and scalable cloud architectures.
              </p>
            </div>
          </div>
          <Link href="/contact" className="shrink-0 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-forest hover:bg-black transition-colors"
            >
              Consult With {post.author.name.split(" ")[0]}
            </button>
          </Link>
        </section>

        {/* Related Technical Perspectives */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t-2 border-[#093103]/25 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Continue Reading
                </h2>
                <p className="text-xs sm:text-sm text-black/75">
                  More engineering blueprints and production post-mortems from Acovate.
                </p>
              </div>
              <Link
                href="/insights"
                className="text-xs font-bold text-[#093103] hover:underline flex items-center gap-1"
              >
                <span>View all articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <article
                  key={rel.id}
                  className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl overflow-hidden shadow-card hover:border-[#093103] hover:shadow-forest hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <Link
                    href={getInsightHref(rel)}
                    className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#093103]/20 block"
                  >
                    <img
                      src={rel.image}
                      alt={rel.imageAlt || rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                    <span className="absolute top-2.5 left-2.5 bg-[#093103] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                      {rel.category}
                    </span>
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{rel.readTime}</span>
                    </div>
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <Link href={getInsightHref(rel)} className="block group/reltitle">
                        <h3 className="text-base font-black text-black leading-snug group-hover/reltitle:text-[#093103] transition-colors line-clamp-2">
                          {rel.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-black/70 line-clamp-2 mt-1.5 leading-relaxed">
                        {rel.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#093103]/20 flex items-center justify-between">
                      <span className="text-xs font-semibold text-black/70">
                        {rel.author.name}
                      </span>
                      <Link
                        href={getInsightHref(rel)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-black group-hover:text-[#093103] transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
