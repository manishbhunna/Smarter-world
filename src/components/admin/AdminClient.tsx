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
  ShieldAlert,
  Eye,
  EyeOff,
  Clock,
  KeyRound,
  History,
  RefreshCw,
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
import {
  createAdminSession,
  validateAdminSession,
  destroyAdminSession,
  verifyCredentials,
  checkRateLimit,
  updateAdminPassword,
  getAuditLogs,
  AuditLogEntry,
  RateLimitStatus,
  SESSION_DURATION_SECONDS,
} from "@/lib/adminSecurity";
import { WordEditor } from "./WordEditor";

export function AdminClient() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("admin@acovate.agency");
  const [sessionSecondsRemaining, setSessionSecondsRemaining] = useState<number>(SESSION_DURATION_SECONDS);

  // Login Form State
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [botTrap, setBotTrap] = useState(""); // Honeypot field for anti-bot protection
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Rate Limiting Status
  const [rateLimitStatus, setRateLimitStatus] = useState<RateLimitStatus>({
    isLocked: false,
    remainingSeconds: 0,
    attemptsCount: 0,
    attemptsLeft: 5,
    progressiveDelay: false,
  });

  // Security Modals
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [currentPwdInput, setCurrentPwdInput] = useState("");
  const [newPwdInput, setNewPwdInput] = useState("");
  const [confirmPwdInput, setConfirmPwdInput] = useState("");
  const [pwdChangeError, setPwdChangeError] = useState("");
  const [pwdChangeSuccess, setPwdChangeSuccess] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

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

  // 1. Check persisted 1-hour session on mount
  useEffect(() => {
    const initAuth = async () => {
      const status = await validateAdminSession();
      if (status.valid && status.session) {
        setIsAuthenticated(true);
        setCurrentUserEmail(status.session.email);
        setSessionSecondsRemaining(status.remainingSeconds);
      } else {
        setIsAuthenticated(false);
        if (status.reason && status.reason.includes("expired")) {
          setAuthError(status.reason);
        }
      }
      setInsights(getStoredInsights());
    };

    initAuth();
  }, []);

  // 2. Active 1-Hour Session Timer & Auto-Termination
  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(() => {
      setSessionSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated]);

  // 3. Rate limiter polling timer when on login screen
  useEffect(() => {
    if (isAuthenticated) return;

    const updateRateLimit = () => {
      const status = checkRateLimit();
      setRateLimitStatus(status);
    };

    updateRateLimit();
    const interval = setInterval(updateRateLimit, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
    }
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  // Show temporary banner notification
  const notify = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Secure Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    // Anti-bot honeypot detection
    if (botTrap.trim().length > 0) {
      setAuthError("Automated bot submission detected. Request rejected.");
      return;
    }

    // Rate limiter client pre-check
    if (rateLimitStatus.isLocked) {
      setAuthError(
        `Rate limit active. Please wait ${rateLimitStatus.remainingSeconds} seconds before retrying.`
      );
      return;
    }

    setAuthLoading(true);

    try {
      const result = await verifyCredentials(emailInput, passwordInput);
      if (!result.success) {
        setAuthError(result.error || "Authentication failed.");
        setRateLimitStatus(checkRateLimit());
        setAuthLoading(false);
        return;
      }

      // Create signed 1-hour session cookie and token
      const session = await createAdminSession(emailInput);
      setIsAuthenticated(true);
      setCurrentUserEmail(session.email);
      setSessionSecondsRemaining(SESSION_DURATION_SECONDS);
      setInsights(getStoredInsights());
      notify("Authenticated successfully. 1-hour secure session initialized.", "success");
      setEmailInput("");
      setPasswordInput("");
    } catch (err) {
      setAuthError("An unexpected cryptographic error occurred. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Automatic logout when 1-hour expires
  const handleAutoLogout = () => {
    destroyAdminSession();
    setIsAuthenticated(false);
    setActiveView("list");
    setEditingPost(null);
    setAuthError("Your 1-hour administrative session has safely expired. Please log in again.");
  };

  // Manual logout handler
  const handleLogout = () => {
    destroyAdminSession();
    setIsAuthenticated(false);
    setActiveView("list");
    setEditingPost(null);
    notify("Securely signed out of the Admin Panel.", "info");
  };

  // Extend active session by another 1 hour
  const handleExtendSession = async () => {
    if (!isAuthenticated) return;
    try {
      await createAdminSession(currentUserEmail);
      setSessionSecondsRemaining(SESSION_DURATION_SECONDS);
      notify("Session extended for another 60 minutes.", "success");
    } catch {
      notify("Failed to extend session.", "info");
    }
  };

  // Handle password change submission
  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdChangeError("");
    setPwdChangeSuccess("");

    if (newPwdInput !== confirmPwdInput) {
      setPwdChangeError("New passwords do not match.");
      return;
    }

    // Verify current password first
    const verifyCurrent = await verifyCredentials(currentUserEmail, currentPwdInput);
    if (!verifyCurrent.success) {
      setPwdChangeError("Current password is incorrect.");
      return;
    }

    const result = await updateAdminPassword(currentUserEmail, newPwdInput);
    if (!result.valid) {
      setPwdChangeError(result.error || "Failed to update password.");
      return;
    }

    setPwdChangeSuccess("Password successfully changed and cryptographically salted!");
    setCurrentPwdInput("");
    setNewPwdInput("");
    setConfirmPwdInput("");
    setTimeout(() => {
      setIsPasswordModalOpen(false);
      setPwdChangeSuccess("");
    }, 2000);
  };

  // Open security audit log modal
  const handleOpenAuditLogs = () => {
    setAuditLogs(getAuditLogs());
    setIsAuditModalOpen(true);
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
      const updated = updateStoredInsight(savedPost);
      setInsights(updated);
      notify(`Article "${savedPost.title}" updated successfully!`, "success");
    } else {
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

  // =========================================================================
  // 1. HIGH-SECURITY LOGIN GATE
  // =========================================================================
  if (!isAuthenticated) {
    const isLocked = rateLimitStatus.isLocked;

    return (
      <div className="min-h-screen bg-[#dbd8cf] text-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#dbd8cf] border-2 border-[#093103] rounded-3xl p-8 sm:p-10 shadow-forest-lg space-y-6">
          {/* Security Shield Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#093103] text-white flex items-center justify-center mx-auto shadow-forest">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#093103]/15 text-[#093103] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3 h-3" />
                <span>256-Bit Cryptographic Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Admin Authentication
              </h1>
            </div>
            <p className="text-xs text-black/75 leading-relaxed">
              Protected administrative portal with brute-force rate limiting, strict 1-hour session cookies, and encrypted credential verification.
            </p>
          </div>

          {/* Rate Limit Alert Box */}
          {isLocked && (
            <div className="p-4 rounded-2xl bg-red-100 border-2 border-red-500 text-red-950 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
                <span>Security Rate Limit Activated</span>
              </div>
              <p className="leading-relaxed">
                Too many consecutive failed attempts. Gateway locked for security.
              </p>
              <div className="flex items-center justify-between font-mono bg-red-200/80 px-3 py-1.5 rounded-lg font-bold">
                <span>Lockout Cooldown:</span>
                <span>{formatTime(rateLimitStatus.remainingSeconds)}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authError && !isLocked && (
            <div className="p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
              <span>{authError}</span>
            </div>
          )}

          {/* Rate Limit Remaining Warning */}
          {!isLocked && rateLimitStatus.attemptsCount > 0 && (
            <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-[11px] flex items-center justify-between">
              <span>Security Warning:</span>
              <span className="font-bold">
                {rateLimitStatus.attemptsLeft} of 5 attempts remaining
              </span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Honeypot Bot Trap (Invisible to humans, caught if automated bots fill it) */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="username_bot_check"
                value={botTrap}
                onChange={(e) => setBotTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-black uppercase tracking-wider block mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  disabled={isLocked || authLoading}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@acovate.agency"
                  className="w-full bg-white text-black text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103] placeholder:text-black/40 disabled:opacity-50 transition-all"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide Toggle */}
            <div>
              <label className="text-xs font-bold text-black uppercase tracking-wider block mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLocked || authLoading}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white text-black text-sm pl-10 pr-11 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:ring-1 focus:ring-[#093103] disabled:opacity-50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLocked || authLoading}
              className="w-full py-3 rounded-xl bg-[#093103] text-white text-xs font-black uppercase tracking-wider shadow-forest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {authLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                "Authenticate & Initialize Session"
              )}
            </button>
          </form>

          {/* Security Features Badge List */}
          <div className="border-t border-[#093103]/20 pt-4 space-y-2">
            <div className="text-[11px] text-black/75 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#093103] shrink-0" />
              <span>Strict 1-hour session expiration with automatic cookie invalidation.</span>
            </div>
            <div className="text-[11px] text-black/75 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#093103] shrink-0" />
              <span>Rate limiter with 15-minute anti-brute-force lockout.</span>
            </div>
            <div className="text-[11px] text-black/75 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#093103] shrink-0" />
              <span>Device fingerprint binding against cross-device session hijacking.</span>
            </div>
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

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  const isExpiringSoon = sessionSecondsRemaining < 300; // Less than 5 minutes

  return (
    <div className="min-h-screen bg-[#dbd8cf] text-black">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#093103] text-white border-b border-[#093103] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          {/* Brand Logo & Portal Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-400 text-[#093103] flex items-center justify-center font-black text-sm shadow-sm">
              AC
            </div>
            <div>
              <span className="text-sm sm:text-base font-black tracking-tight block">
                Acovate Editorial Admin
              </span>
              <span className="text-[10px] text-emerald-300 font-mono hidden sm:block">
                Secure Session • {currentUserEmail}
              </span>
            </div>
          </div>

          {/* Center: Live 1-Hour Session Countdown Timer */}
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                isExpiringSoon
                  ? "bg-amber-500 text-black animate-pulse"
                  : "bg-white/10 text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Session Expiry: {formatTime(sessionSecondsRemaining)}</span>
            </div>

            {/* Quick Session Refresh / Extension */}
            <button
              type="button"
              onClick={handleExtendSession}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Extend session for another 60 minutes"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">Extend 1h</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
            {/* Security Audit Log Trigger */}
            <button
              type="button"
              onClick={handleOpenAuditLogs}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
              title="View Security Audit Logs"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Audit Log</span>
            </button>

            {/* Change Password Trigger */}
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
              title="Change Admin Password"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Security</span>
            </button>

            {/* View Public Live Site */}
            <Link
              href="/insights"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Blog</span>
            </Link>

            {/* Secure Sign Out */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
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
              className="w-full mt-2 py-2.5 rounded-xl bg-[#093103] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
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
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...INSIGHT_CATEGORIES] as (InsightCategory | "All")[]).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#093103] text-white shadow-sm"
                        : "bg-white/60 text-black hover:bg-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="text-[11px] font-bold text-black/60 hover:text-black flex items-center gap-1 hover:underline cursor-pointer"
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
                        className="text-xs text-[#093103] font-black underline cursor-pointer"
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
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-700 text-white shadow-sm">
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
                            className="px-3 py-1.5 rounded-lg bg-[#093103] text-white font-bold flex items-center gap-1 hover:bg-black transition-colors cursor-pointer"
                            title="Edit this post in Microsoft Word Editor"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post)}
                            className="p-2 rounded-lg bg-red-100 border border-red-300 text-red-700 hover:bg-red-700 hover:text-white transition-colors cursor-pointer"
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

      {/* ========================================================================= */}
      {/* 3. SECURITY MODAL: CHANGE ADMIN PASSWORD                                  */}
      {/* ========================================================================= */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#dbd8cf] border-2 border-[#093103] max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-forest-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#093103]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#093103] text-white flex items-center justify-center shadow-sm">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-black">Update Master Password</h3>
                  <span className="text-[11px] text-black/60">SHA-256 Salted Cryptographic Storage</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPwdChangeError("");
                  setPwdChangeSuccess("");
                }}
                className="text-black/60 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {pwdChangeError && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs">
                {pwdChangeError}
              </div>
            )}

            {pwdChangeSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs">
                {pwdChangeSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-black block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPwdInput}
                  onChange={(e) => setCurrentPwdInput(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full bg-white text-black px-3.5 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-black block mb-1">New Password (Min 8 Characters)</label>
                <input
                  type="password"
                  required
                  value={newPwdInput}
                  onChange={(e) => setNewPwdInput(e.target.value)}
                  placeholder="Enter strong new password"
                  className="w-full bg-white text-black px-3.5 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-black block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPwdInput}
                  onChange={(e) => setConfirmPwdInput(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-white text-black px-3.5 py-2.5 rounded-xl border border-[#093103]/30 focus:border-[#093103] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#093103]/30 text-black font-bold hover:bg-black/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#093103] text-white font-bold hover:bg-black shadow-sm"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECURITY MODAL: AUDIT LOG VIEWER                                       */}
      {/* ========================================================================= */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#dbd8cf] border-2 border-[#093103] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-forest-lg space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#093103]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#093103] text-white flex items-center justify-center shadow-sm">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-black">Administrative Security Audit Trail</h3>
                  <span className="text-[11px] text-black/60">Real-time authentication and security event log</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="text-black/60 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 space-y-2 text-xs">
              {auditLogs.length === 0 ? (
                <div className="text-center py-8 text-black/60 font-bold">
                  No security events recorded yet in this session.
                </div>
              ) : (
                auditLogs.map((log, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/70 rounded-xl border border-[#093103]/20 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            log.action === "LOGIN_SUCCESS"
                              ? "bg-emerald-700 text-white"
                              : log.action === "LOCKOUT_TRIGGERED" || log.action === "LOGIN_FAILED"
                              ? "bg-red-700 text-white"
                              : "bg-[#093103] text-white"
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="font-bold text-black">{log.email}</span>
                      </div>
                      <p className="text-[11px] text-black/70 mt-1">{log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-black/50 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-[#093103]/20 flex justify-between items-center text-[11px] text-black/60">
              <span>Encrypted local tamper-resistant record</span>
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#093103] text-white font-bold hover:bg-black"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
