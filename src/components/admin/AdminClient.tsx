"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { InsightCategory, InsightItem, INSIGHT_CATEGORIES } from "@/data/insightsData";
import {
  getStoredInsights,
  addStoredInsight,
  updateStoredInsight,
  deleteStoredInsight,
  resetStoredInsights,
  getInsightHref,
} from "@/lib/insightsStorage";
import { WordEditor } from "./WordEditor";

const ADMIN_STORAGE_AUTH_KEY = "acovate_admin_auth";

// Default admin credentials for convenience
const DEFAULT_ADMIN_EMAIL = "admin@acovate.agency";
const DEFAULT_ADMIN_PASSWORD = "admin123";

export function AdminClient() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Admin View State: 'list' (Manage Blogs) or 'editor' (Add/Edit with MS Word)
  const [activeView, setActiveView] = useState<"list" | "editor">("list");
  const [editingPost, setEditingPost] = useState<InsightItem | null>(null);

  // Insights List State
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(
    null
  );

  // Check persisted auth session on mount
  useEffect(() => {
    const isAuth = localStorage.getItem(ADMIN_STORAGE_AUTH_KEY) === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
    // Load stored insights
    setInsights(getStoredInsights());
  }, []);

  // Show temporary banner notification
  const notify = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    setTimeout(() => {
      const email = emailInput.trim().toLowerCase();
      const password = passwordInput.trim();

      // Validate email format and check credentials
      if (!email.includes("@")) {
        setAuthError("Please enter a valid email address.");
        setAuthLoading(false);
        return;
      }

      if (
        (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) ||
        (password.length >= 6 && email.endsWith("@acovate.agency")) ||
        (email === "admin@agency.com" && password === "admin123")
      ) {
        setIsAuthenticated(true);
        localStorage.setItem(ADMIN_STORAGE_AUTH_KEY, "true");
        setInsights(getStoredInsights());
        notify("Successfully logged into Admin Panel.", "success");
      } else {
        setAuthError(
          `Invalid credentials. Use preset: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`
        );
      }
      setAuthLoading(false);
    }, 300);
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_STORAGE_AUTH_KEY);
    setActiveView("list");
    setEditingPost(null);
  };

  // Switch to Word Editor to Add a New Blog
  const handleStartCreate = () => {
    setEditingPost(null);
    setActiveView("editor");
  };

  // Switch to Word Editor to Edit an Existing Blog
  const handleStartEdit = (post: InsightItem) => {
    setEditingPost(post);
    setActiveView("editor");
  };

  // Save Blog from Word Editor (Create or Update)
  const handleSavePost = (savedPost: InsightItem) => {
    if (editingPost) {
      // Update
      const updated = updateStoredInsight(savedPost);
      setInsights(updated);
      notify(`Article "${savedPost.title}" updated successfully!`, "success");
    } else {
      // Create
      const updated = addStoredInsight(savedPost);
      setInsights(updated);
      notify(`New article "${savedPost.title}" published successfully!`, "success");
    }
    setActiveView("list");
    setEditingPost(null);
  };

  // Delete Blog
  const handleDeletePost = (post: InsightItem) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${post.title}"? This will permanently remove it from the insights page.`
      )
    ) {
      const updated = deleteStoredInsight(post.id);
      setInsights(updated);
      notify(`Article "${post.title}" deleted.`, "info");
    }
  };

  // Reset to initial sample dataset
  const handleResetData = () => {
    if (
      window.confirm(
        "Reset all blogs back to the original sample dataset? Any custom blogs will be overwritten."
      )
    ) {
      const reset = resetStoredInsights();
      setInsights(reset);
      notify("Insights reset to default sample dataset.", "info");
    }
  };

  // Filtered insights in the admin management list
  const filteredInsights = useMemo(() => {
    return insights.filter((post) => {
      const matchesCat =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [insights, selectedCategory, searchQuery]);

  // If in Word Editor view, render the dedicated WordEditor component
  if (isAuthenticated && activeView === "editor") {
    return (
      <WordEditor
        initialPost={editingPost}
        onSave={handleSavePost}
        onCancel={() => {
          setActiveView("list");
          setEditingPost(null);
        }}
      />
    );
  }

  // 1. Gated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#dbd8cf] text-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#dbd8cf] border-2 border-[#093103] rounded-3xl p-8 sm:p-10 shadow-forest-lg space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#093103] text-white flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Admin Portal Login
            </h1>
            <p className="text-xs sm:text-sm text-black/75">
              Secure authentication for managing Acovate technical perspectives and insights.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-black uppercase tracking-wider block mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@acovate.agency"
                  className="w-full bg-white text-black text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103] placeholder:text-black/40"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-black uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white text-black text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-[#093103] text-white text-xs font-black uppercase tracking-wider shadow-forest hover:bg-black transition-all disabled:opacity-50 mt-2"
            >
              {authLoading ? "Authenticating..." : "Unlock Admin Panel"}
            </button>
          </form>

          {/* Preset Credentials Hint Box */}
          <div className="bg-[#093103]/10 border border-[#093103]/25 rounded-2xl p-4 text-xs space-y-1.5">
            <span className="font-bold text-[#093103] block uppercase tracking-wider text-[11px]">
              Preset Admin Access:
            </span>
            <div className="text-black/80 flex items-center justify-between">
              <span>Email:</span>
              <code className="font-bold bg-white px-2 py-0.5 rounded text-[11px]">
                {DEFAULT_ADMIN_EMAIL}
              </code>
            </div>
            <div className="text-black/80 flex items-center justify-between">
              <span>Password:</span>
              <code className="font-bold bg-white px-2 py-0.5 rounded text-[11px]">
                {DEFAULT_ADMIN_PASSWORD}
              </code>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmailInput(DEFAULT_ADMIN_EMAIL);
                setPasswordInput(DEFAULT_ADMIN_PASSWORD);
              }}
              className="text-[#093103] font-bold text-[11px] underline pt-1 block text-right hover:text-black"
            >
              Auto-fill Credentials
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/insights"
              className="text-xs text-black/70 hover:text-[#093103] underline font-medium"
            >
              ← Return to public Insights page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard (Blog Management & CRUD)
  return (
    <div className="min-h-screen bg-[#dbd8cf] text-black">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#093103] text-white border-b border-[#093103] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-400 text-[#093103] flex items-center justify-center font-black text-sm shadow-sm">
              AC
            </div>
            <div>
              <span className="text-sm sm:text-base font-black tracking-tight block">
                Acovate Editorial Admin
              </span>
              <span className="text-[10px] text-emerald-300 font-mono hidden sm:block">
                Admin Panel • Insights Management Only
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
            <Link
              href="/insights"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Blog</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div className="p-3.5 rounded-2xl bg-[#093103] text-white text-xs font-bold shadow-forest flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
        {/* Metric Overview Strip & Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-2xl p-5 shadow-card">
            <span className="text-xs font-bold text-black/70 uppercase tracking-wider block">
              Total Published Articles
            </span>
            <div className="text-3xl font-black text-[#093103] mt-1">{insights.length}</div>
            <span className="text-[11px] text-black/60">Live across the agency platform</span>
          </div>

          <div className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-2xl p-5 shadow-card">
            <span className="text-xs font-bold text-black/70 uppercase tracking-wider block">
              Hero Featured Article
            </span>
            <div className="text-sm font-bold text-black mt-2 line-clamp-1">
              {insights.find((i) => i.featured)?.title || insights[0]?.title || "None"}
            </div>
            <span className="text-[11px] text-[#093103] font-bold">1 In Hero Spotlight</span>
          </div>

          <div className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-2xl p-5 shadow-card">
            <span className="text-xs font-bold text-black/70 uppercase tracking-wider block">
              Writing Engine
            </span>
            <div className="text-base font-black text-[#093103] mt-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#093103]" />
              <span>Microsoft Word Ribbon</span>
            </div>
            <span className="text-[11px] text-black/60">WYSIWYG document editor</span>
          </div>

          <div className="bg-[#dbd8cf] border-2 border-[#093103] rounded-2xl p-5 shadow-forest flex flex-col justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Create New Article
            </span>
            <button
              type="button"
              onClick={handleStartCreate}
              className="w-full mt-2 py-2.5 rounded-xl bg-[#093103] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Write Blog (Word)</span>
            </button>
          </div>
        </section>

        {/* Filter and Search Bar for Blogs */}
        <section className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl p-6 shadow-card space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-black tracking-tight">
                Manage Insights & Technical Perspectives
              </h2>
              <p className="text-xs text-black/70 mt-0.5">
                Full CRUD control: Create, Read/Preview, Update in Word Editor, and Delete.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-black/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, author, tag..."
                className="w-full bg-white text-black text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103]"
              />
            </div>
          </div>

          {/* Category Filter Pills & Reset Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#093103]/15">
            <div className="flex flex-wrap items-center gap-1.5">
              {INSIGHT_CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? insights.length
                    : insights.filter((i) => i.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#093103] text-white shadow-sm"
                        : "bg-white text-black border border-[#093103]/25 hover:border-[#093103]"
                    }`}
                  >
                    <span>{cat}</span> ({count})
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="text-[11px] font-bold text-black/60 hover:text-black flex items-center gap-1 hover:underline"
              title="Reset data back to initial sample posts"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default Sample Data</span>
            </button>
          </div>
        </section>

        {/* Blogs Table / CRUD Management List */}
        <section className="bg-[#dbd8cf] border-2 border-[#093103]/25 rounded-3xl overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#093103] text-white uppercase tracking-wider text-[11px] select-none">
                <tr>
                  <th className="py-3.5 px-4 font-black">Article & Photo</th>
                  <th className="py-3.5 px-4 font-black">Category</th>
                  <th className="py-3.5 px-4 font-black">Author & Date</th>
                  <th className="py-3.5 px-4 font-black">Hero Placement</th>
                  <th className="py-3.5 px-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#093103]/15">
                {filteredInsights.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-black/70 space-y-2">
                      <BookOpen className="w-8 h-8 text-[#093103] mx-auto opacity-50" />
                      <p className="font-bold">No articles match your filter or search.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("All");
                          setSearchQuery("");
                        }}
                        className="text-xs text-[#093103] font-black underline"
                      >
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredInsights.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-white/40 transition-colors group"
                    >
                      {/* Photo Thumbnail & Title */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-11 rounded-lg overflow-hidden border border-[#093103]/30 shadow-sm shrink-0 bg-black/10">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <span className="font-black text-sm text-black group-hover:text-[#093103] transition-colors line-clamp-1">
                              {post.title}
                            </span>
                            <span className="text-[11px] text-black/60 line-clamp-1 mt-0.5">
                              {post.subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#093103] text-white">
                          {post.category}
                        </span>
                      </td>

                      {/* Author & Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-black">{post.author.name}</div>
                        <div className="text-[11px] text-black/60">
                          {post.date} • {post.readTime}
                        </div>
                      </td>

                      {/* Hero Placement Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {post.featured ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>Hero Featured</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-black/50 font-medium">Standard Grid</span>
                        )}
                      </td>

                      {/* Actions: View Live, Edit (Word), Delete */}
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* View Live Page */}
                          <Link
                            href={getInsightHref(post)}
                            target="_blank"
                            className="p-2 rounded-lg bg-white border border-[#093103]/30 text-black hover:bg-[#093103] hover:text-white transition-colors"
                            title="View Public Blog Post"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Edit in Word Editor */}
                          <button
                            type="button"
                            onClick={() => handleStartEdit(post)}
                            className="px-3 py-1.5 rounded-lg bg-[#093103] text-white font-bold flex items-center gap-1 hover:bg-black transition-colors"
                            title="Edit this post in Microsoft Word Editor"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post)}
                            className="p-2 rounded-lg bg-red-100 border border-red-300 text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                            title="Delete Blog Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
