"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  X,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import {
  INSIGHTS_DATA,
  INSIGHT_CATEGORIES,
  InsightCategory,
  InsightItem,
} from "@/data/insightsData";
import { getStoredInsights, getInsightHref } from "@/lib/insightsStorage";

export function InsightsClient() {
  const [insights, setInsights] = useState<InsightItem[]>(INSIGHTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with stored insights on mount and when admin makes changes
  useEffect(() => {
    setInsights(getStoredInsights());

    const handleUpdate = () => {
      setInsights(getStoredInsights());
    };
    window.addEventListener("insights_updated", handleUpdate);
    return () => window.removeEventListener("insights_updated", handleUpdate);
  }, []);

  // Filtered insights based on category and search query
  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [insights, selectedCategory, searchQuery]);

  // 1 blog for the Hero section:
  // Default to the featured blog (or the first match when filtered)
  const heroBlog = useMemo(() => {
    if (filteredInsights.length === 0) return null;
    if (selectedCategory === "All" && !searchQuery) {
      return filteredInsights.find((i) => i.featured) || filteredInsights[0];
    }
    return filteredInsights[0];
  }, [filteredInsights, selectedCategory, searchQuery]);

  // The rest of the blogs displayed in normal size
  const normalBlogs = useMemo(() => {
    if (!heroBlog) return [];
    return filteredInsights.filter((item) => item.id !== heroBlog.id);
  }, [filteredInsights, heroBlog]);

  return (
    <div className="space-y-12">
      {/* Editorial Page Header */}
      <header className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#093103] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Engineering Research & Perspectives</span>
          <Sparkles className="w-3.5 h-3.5 text-white ml-0.5" />
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.08]">
          Insights & Perspectives
        </h1>
        <p className="text-base sm:text-xl text-black/85 leading-relaxed font-normal">
          Production playbooks, architectural post-mortems, and autonomous AI blueprints written by senior engineers.
        </p>
      </header>

      {/* 1 Blog Featured at the Hero Section */}
      {heroBlog && (
        <section className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#093103] animate-ping" />
            <h2 className="text-xs font-black uppercase tracking-wider text-black">
              Featured Deep Dive
            </h2>
          </div>

          <article className="bg-[#dbd8cf] border-2 border-[#093103] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-forest-lg hover:shadow-forest transition-all relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Post Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-black bg-[#093103] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {heroBlog.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black/75">
                    <Clock className="w-3.5 h-3.5 text-[#093103]" />
                    <span>{heroBlog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black/75">
                    <Calendar className="w-3.5 h-3.5 text-[#093103]" />
                    <span>{heroBlog.date}</span>
                  </div>
                </div>

                <Link href={getInsightHref(heroBlog)} className="block group/title">
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-[1.14] group-hover/title:text-[#093103] transition-colors">
                    {heroBlog.title}
                  </h3>
                </Link>

                <p className="text-sm sm:text-base text-black/85 leading-relaxed font-normal">
                  {heroBlog.subtitle}
                </p>

                {/* Key Metrics Chips */}
                {heroBlog.metrics && heroBlog.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {heroBlog.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#dbd8cf] border border-[#093103]/30 rounded-xl p-3 text-center"
                      >
                        <div className="text-base sm:text-xl font-black text-[#093103]">
                          {m.value}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-black/70 uppercase tracking-wider mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Author & Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#093103]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#093103] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {heroBlog.author.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black">
                        {heroBlog.author.name}
                      </div>
                      <div className="text-xs text-black/70">
                        {heroBlog.author.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={getInsightHref(heroBlog)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#093103] text-white text-sm font-bold shadow-forest hover:bg-black transition-all group-hover:scale-[1.02]"
                  >
                    <span>Read Complete Breakdown</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Photo */}
              <Link
                href={getInsightHref(heroBlog)}
                className="lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#093103]/30 shadow-md group-hover:border-[#093103] transition-all block"
              >
                <img
                  src={heroBlog.image}
                  alt={heroBlog.imageAlt || heroBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold px-2">
                  <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    Lead Architecture Brief
                  </span>
                  <span className="flex items-center gap-1 bg-[#093103]/90 px-2.5 py-1 rounded-md">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Search & Category Filter Bar */}
      <section className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl p-5 sm:p-7 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[#093103]/20">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-black tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#093103]" />
              <span>Browse All Perspectives</span>
            </h2>
            <p className="text-xs sm:text-sm text-black/75 mt-0.5">
              Filter by engineering discipline or search by keywords.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-black/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI, Next.js, RLS, CAPI..."
              className="w-full bg-[#dbd8cf] text-black text-sm pl-10 pr-9 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103] placeholder:text-black/50 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="pt-5 flex flex-wrap items-center gap-2">
          {INSIGHT_CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? INSIGHTS_DATA.length
                : INSIGHTS_DATA.filter((i) => i.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#093103] text-white shadow-forest scale-[1.02]"
                    : "bg-[#dbd8cf] text-black border border-[#093103]/30 hover:border-[#093103] hover:bg-[#093103]/10"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white text-[#093103] font-black"
                      : "bg-[#093103]/15 text-black font-semibold"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Results Summary */}
        <div className="mt-3 pt-3 flex items-center justify-between text-xs text-black/70">
          <span>
            Showing <strong className="text-black">{filteredInsights.length}</strong> of{" "}
            {INSIGHTS_DATA.length} technical briefings
          </span>
          {(selectedCategory !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[#093103] font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Insights Grid - Rest of the blogs in normal size */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              {selectedCategory === "All"
                ? "All Perspectives & Briefings"
                : `${selectedCategory} Perspectives`}
            </h2>
            <p className="text-sm text-black/75">
              Production playbooks, architectural post-mortems, and performance benchmarks.
            </p>
          </div>
          {normalBlogs.length > 0 && (
            <span className="text-xs font-semibold text-black/70">
              Showing <strong className="text-black">{normalBlogs.length}</strong> additional{" "}
              {normalBlogs.length === 1 ? "article" : "articles"}
            </span>
          )}
        </div>

        {filteredInsights.length === 0 ? (
          <div className="text-center py-16 bg-[#dbd8cf] border-2 border-dashed border-[#093103]/30 rounded-3xl p-8 space-y-4">
            <BookOpen className="w-12 h-12 text-[#093103] mx-auto opacity-60" />
            <h3 className="text-xl font-bold text-black">No matching briefings found</h3>
            <p className="text-sm text-black/70 max-w-md mx-auto">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another keyword or switch categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#093103] text-white text-xs font-bold uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {normalBlogs.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl overflow-hidden shadow-card hover:border-[#093103] hover:shadow-forest hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {/* Photo at top of card */}
                <Link
                  href={getInsightHref(item)}
                  className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#093103]/20 block"
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {/* Floated Category Badge */}
                  <span className="absolute top-3 left-3 bg-[#093103] text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {item.category}
                  </span>

                  {/* Floated Read Time */}
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{item.readTime}</span>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-black/60">
                      <span>{item.date}</span>
                      {item.metrics && item.metrics.length > 0 && (
                        <span className="font-bold text-[#093103] truncate max-w-[150px]">
                          {item.metrics[0].value} {item.metrics[0].label}
                        </span>
                      )}
                    </div>

                    <Link href={getInsightHref(item)} className="block group/link">
                      <h3 className="text-xl font-black text-black leading-snug tracking-tight group-hover/link:text-[#093103] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-black/75 line-clamp-3 leading-relaxed">
                      {item.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold bg-[#dbd8cf] border border-[#093103]/30 text-black px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer with author and read button */}
                  <div className="pt-4 border-t border-[#093103]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#093103] text-white text-xs font-bold flex items-center justify-center">
                        {item.author.avatar}
                      </div>
                      <div className="text-xs font-semibold text-black truncate max-w-[110px]">
                        {item.author.name}
                      </div>
                    </div>

                    <Link
                      href={getInsightHref(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-black group-hover:text-[#093103] transition-colors focus:outline-none"
                    >
                      <span>Read Deep Dive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
