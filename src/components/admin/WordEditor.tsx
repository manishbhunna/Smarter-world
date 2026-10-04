"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Code,
  Minus,
  Undo,
  Redo,
  RemoveFormatting,
  Save,
  ArrowLeft,
  Sparkles,
  Eye,
  FileText,
  Sliders,
  Check,
  AlertCircle,
} from "lucide-react";
import { InsightArticleCategory, InsightItem, INSIGHT_CATEGORIES } from "@/data/insightsData";
import { htmlToSections, sectionsToHtml } from "@/lib/insightsStorage";

interface WordEditorProps {
  initialPost?: InsightItem | null;
  onSave: (post: InsightItem) => void;
  onCancel: () => void;
}

export function WordEditor({ initialPost, onSave, onCancel }: WordEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Post Metadata States
  const [title, setTitle] = useState(initialPost?.title || "");
  const [subtitle, setSubtitle] = useState(initialPost?.subtitle || "");
  const [category, setCategory] = useState<InsightArticleCategory>(
    initialPost?.category || "AI & Automation"
  );
  const [imageUrl, setImageUrl] = useState(
    initialPost?.image ||
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  );
  const [authorName, setAuthorName] = useState(initialPost?.author.name || "Devon Chen");
  const [authorRole, setAuthorRole] = useState(
    initialPost?.author.role || "Lead AI Systems Engineer"
  );
  const [tagsInput, setTagsInput] = useState(initialPost?.tags.join(", ") || "AI, Cloud, System");
  const [metricLabel, setMetricLabel] = useState(
    initialPost?.metrics?.[0]?.label || "Execution SLA"
  );
  const [metricValue, setMetricValue] = useState(
    initialPost?.metrics?.[0]?.value || "99.9%"
  );
  const [isFeatured, setIsFeatured] = useState(Boolean(initialPost?.featured));

  // Word Editor Stats
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState("3 min read");
  const [showMetadataDrawer, setShowMetadataDrawer] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  // Initialize document content
  useEffect(() => {
    let initialHtml = `
      <h2>1. Architectural Overview & Context</h2>
      <p>Modern enterprise platforms require deterministic execution, sub-second latency, and fault-tolerant scalability. In this technical deep dive, we walk through production-tested architectures and performance teardowns.</p>
      <h2>2. Implementation Blueprint & Schema</h2>
      <p>Below is the deterministic state machine topology running across our distributed microservices environment:</p>
      <pre><code>// Production State Machine Topography
interface WorkflowState {
  transactionId: string;
  status: "idle" | "evaluating" | "executing" | "verified";
  latencyMs: number;
}</code></pre>
      <h2>3. Production Results & Empirical Lift</h2>
      <p>By enforcing database-level boundary isolation and vector caching, client platforms consistently achieve sub-80ms responses and zero schema drift.</p>
    `;

    if (initialPost) {
      initialHtml = sectionsToHtml(initialPost);
    }

    if (editorRef.current) {
      editorRef.current.innerHTML = initialHtml;
      setHtmlContent(initialHtml);
      updateStats();
    }
  }, [initialPost]);

  // Update Word counts and reading time
  const updateStats = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || "";
    setHtmlContent(editorRef.current.innerHTML);
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    setWordCount(words);
    setCharCount(text.length);
    const minutes = Math.max(1, Math.ceil(words / 200));
    setReadingTime(`${minutes} min read`);
  };

  // Execute formatting command on active selection
  const formatDoc = (cmd: string, val: string = "") => {
    if (typeof document !== "undefined") {
      document.execCommand(cmd, false, val);
      if (editorRef.current) {
        editorRef.current.focus();
        updateStats();
      }
    }
  };

  // Insert Link Prompt
  const handleInsertLink = () => {
    const url = prompt("Enter destination URL (e.g. https://...):", "https://");
    if (url) {
      formatDoc("createLink", url);
    }
  };

  // Insert Image Prompt
  const handleInsertImage = () => {
    const url = prompt(
      "Enter image URL (e.g. https://images.unsplash.com/...):",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
    );
    if (url) {
      formatDoc("insertImage", url);
    }
  };

  // Insert Code Snippet Prompt
  const handleInsertCode = () => {
    const code = prompt("Enter code snippet:", "console.log('Production ready');");
    if (code) {
      formatDoc(
        "insertHTML",
        `<pre><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre><p></p>`
      );
    }
  };

  // Handle Save / Publish Blog
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please provide a title for the blog post.");
      setShowMetadataDrawer(true);
      return;
    }

    const currentHtml = editorRef.current?.innerHTML || htmlContent;
    const { sections, summary } = htmlToSections(currentHtml);

    // Generate clean slug
    const generatedSlug =
      initialPost?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") ||
      `insight-${Date.now()}`;

    // Tags array
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Initials for avatar
    const initials = authorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AC";

    const newPost: InsightItem = {
      id: initialPost?.id || generatedSlug,
      slug: generatedSlug,
      title: title.trim(),
      subtitle: subtitle.trim() || summary,
      category,
      readTime: readingTime,
      date: initialPost?.date || "Oct 2026",
      featured: isFeatured,
      image: imageUrl.trim(),
      imageAlt: `${title} preview illustration`,
      summary: subtitle.trim() || summary,
      author: {
        name: authorName.trim() || "Devon Chen",
        role: authorRole.trim() || "Senior Systems Architect",
        avatar: initials,
      },
      tags: tags.length > 0 ? tags : ["Architecture", "Engineering"],
      metrics: [
        {
          label: metricLabel || "Verified Benchmark",
          value: metricValue || "100%",
        },
      ],
      executiveTakeaways: [
        "Deterministic architectures eliminate instruction decay and edge-case errors.",
        "Empirical benchmarks validate 4x+ ROI and sub-80ms production latency.",
        "Integrated guardrails protect data integrity during high-throughput execution.",
      ],
      sections: sections.length > 0 ? sections : [{ heading: "1. Overview", content: [summary] }],
      stack: tags.slice(0, 5),
    };

    onSave(newPost);
  };

  return (
    <div className="bg-[#e6e4df] min-h-screen text-black flex flex-col">
      {/* Top Application Bar (Word 2026 Title Bar) - Fully Mobile Responsive */}
      <div className="bg-[#093103] text-white px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 shadow-md shrink-0">
        {/* Left: Back & Document Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
            title="Return to Blog List"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back to Blog Manager</span>
            <span className="hidden sm:inline md:hidden">Back</span>
          </button>
          <div className="h-4 w-[1px] bg-white/30 hidden sm:block shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-tight truncate max-w-[110px] xs:max-w-[170px] sm:max-w-xs md:max-w-md">
              {title ? title : "New Document"}
            </span>
            <span className="text-[10px] text-emerald-300 font-mono hidden lg:inline shrink-0">
              • Word Ribbon Editor
            </span>
          </div>
        </div>

        {/* Right: Actions (Settings, Preview, Publish) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowMetadataDrawer(!showMetadataDrawer)}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showMetadataDrawer
                ? "bg-white text-[#093103]"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title="Configure article publishing metadata"
          >
            <Sliders className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              previewMode ? "bg-white text-[#093103]" : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            title={previewMode ? "Switch to edit mode" : "Preview live layout"}
          >
            <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{previewMode ? "Edit" : "Preview"}</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="px-3 sm:px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{initialPost ? "Update" : "Publish"}</span>
          </button>
        </div>
      </div>

      {/* Metadata Configuration Bar (Collapsible & Mobile Scrollable) */}
      {showMetadataDrawer && (
        <div className="bg-[#dbd8cf] border-b-2 border-[#093103] p-4 sm:p-6 shadow-inner animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#093103]/20">
              <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#093103]" />
                <span>Article Publishing Metadata</span>
              </span>
              <button
                type="button"
                onClick={() => setShowMetadataDrawer(false)}
                className="text-xs font-bold text-black/60 hover:text-black cursor-pointer px-2 py-1"
              >
                Close Settings ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
              {/* Category */}
              <div>
                <label className="font-bold text-black block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as InsightArticleCategory)}
                  className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-medium focus:ring-1 focus:ring-[#093103] focus:outline-none"
                >
                  {INSIGHT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cover Photo URL */}
              <div>
                <label className="font-bold text-black block mb-1">Cover Photo URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-mono text-xs focus:ring-1 focus:ring-[#093103] focus:outline-none"
                />
              </div>

              {/* Author Name & Role */}
              <div>
                <label className="font-bold text-black block mb-1">Author Name & Role</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author Name"
                    className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-medium focus:outline-none"
                  />
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Role"
                    className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="font-bold text-black block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="AI, Next.js, Cloud, Redis"
                  className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-medium focus:outline-none"
                />
              </div>

              {/* Metric Highlight */}
              <div>
                <label className="font-bold text-black block mb-1">Key Verified Metric</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    placeholder="e.g. 99.8%"
                    className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 font-bold focus:outline-none"
                  />
                  <input
                    type="text"
                    value={metricLabel}
                    onChange={(e) => setMetricLabel(e.target.value)}
                    placeholder="e.g. Execution SLA"
                    className="w-full bg-white text-black p-2.5 rounded-xl border border-[#093103]/30 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Featured Flag */}
              <div className="flex items-center gap-2 pt-2 sm:pt-6">
                <input
                  type="checkbox"
                  id="featuredHeroCheckbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#093103] focus:ring-[#093103] border-gray-400 cursor-pointer"
                />
                <label
                  htmlFor="featuredHeroCheckbox"
                  className="text-xs font-bold text-black cursor-pointer select-none"
                >
                  Feature this blog in the Hero Section
                </label>
              </div>
            </div>

            {/* Photo Thumbnail Preview */}
            {imageUrl && (
              <div className="pt-2 flex items-center gap-3">
                <div className="w-16 h-10 rounded-lg overflow-hidden border border-[#093103]/30 shadow-sm shrink-0 bg-black/10">
                  <img src={imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] text-black/70">
                  Photo loaded. This will appear on the blog card and dedicated article header.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MS Word Ribbon Toolbar - Horizontal Touch-Friendly Scroll Strip on Mobile */}
      {!previewMode && (
        <div className="bg-[#f0ede6] border-b border-[#093103]/20 sticky top-0 z-20 shadow-sm px-2 sm:px-4 py-1.5 sm:py-2">
          <div className="max-w-5xl mx-auto flex items-center overflow-x-auto no-scrollbar whitespace-nowrap gap-1 sm:gap-2 py-0.5 sm:py-0">
            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5 border-r border-[#093103]/20 pr-1.5 shrink-0">
              <button
                type="button"
                onClick={() => formatDoc("undo")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("redo")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>

            {/* Headings / Style Format Dropdown */}
            <div className="border-r border-[#093103]/20 pr-1.5 shrink-0">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "p") formatDoc("formatBlock", "<p>");
                  else if (val === "h1") formatDoc("formatBlock", "<h1>");
                  else if (val === "h2") formatDoc("formatBlock", "<h2>");
                  else if (val === "h3") formatDoc("formatBlock", "<h3>");
                  else if (val === "blockquote") formatDoc("formatBlock", "<blockquote>");
                  e.target.value = "";
                }}
                className="bg-white border border-[#093103]/30 text-xs font-semibold rounded-lg px-2 py-1 text-black focus:outline-none focus:ring-1 focus:ring-[#093103] h-8"
                defaultValue=""
              >
                <option value="" disabled>
                  Style...
                </option>
                <option value="p">Normal Text</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="blockquote">Quote Callout</option>
              </select>
            </div>

            {/* Font Styling: Bold, Italic, Underline, Strikethrough, Clear */}
            <div className="flex items-center gap-0.5 border-r border-[#093103]/20 pr-1.5 shrink-0">
              <button
                type="button"
                onClick={() => formatDoc("bold")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black font-black transition-colors"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("italic")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black italic transition-colors"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("underline")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black underline transition-colors"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("strikeThrough")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black line-through transition-colors"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("removeFormat")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Clear Formatting"
              >
                <RemoveFormatting className="w-4 h-4" />
              </button>
            </div>

            {/* Alignment: Left, Center, Right, Justify */}
            <div className="flex items-center gap-0.5 border-r border-[#093103]/20 pr-1.5 shrink-0">
              <button
                type="button"
                onClick={() => formatDoc("justifyLeft")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("justifyCenter")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("justifyRight")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("justifyFull")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Justify"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>

            {/* Lists: Bullets and Numbers */}
            <div className="flex items-center gap-0.5 border-r border-[#093103]/20 pr-1.5 shrink-0">
              <button
                type="button"
                onClick={() => formatDoc("insertUnorderedList")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("insertOrderedList")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            {/* Insert Tools: Link, Image, Code, Line */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={handleInsertLink}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Insert Hyperlink"
              >
                <Link2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Insert Picture into Document"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertCode}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Insert Code Block"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => formatDoc("insertHorizontalRule")}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#093103]/15 text-black transition-colors"
                title="Insert Horizontal Divider"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Area (Microsoft Word Sheet) - Fully Mobile Responsive */}
      <div className="flex-1 py-4 sm:py-8 px-2 sm:px-4 md:px-6 flex flex-col items-center overflow-y-auto w-full">
        {/* Document Title Header Input */}
        <div className="max-w-4xl w-full mb-3 sm:mb-4 px-1 sm:px-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type Article Title Here..."
            className="w-full bg-transparent text-xl sm:text-3xl md:text-4xl font-black text-black tracking-tight border-b-2 border-[#093103]/30 focus:border-[#093103] focus:outline-none pb-2 placeholder:text-black/40 transition-colors"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Brief executive subtitle / summary..."
            className="w-full bg-transparent text-xs sm:text-sm md:text-base text-black/75 border-b border-[#093103]/20 focus:border-[#093103] focus:outline-none pt-2 pb-1 placeholder:text-black/40 mt-1 transition-colors"
          />
        </div>

        {/* The White Word Sheet */}
        <div className="bg-white text-gray-900 shadow-xl rounded-2xl sm:rounded-sm p-4 sm:p-10 md:p-14 lg:p-16 max-w-4xl w-full min-h-[450px] sm:min-h-[750px] border border-gray-300 relative break-words overflow-x-hidden">
          {previewMode ? (
            /* Live Preview Rendering */
            <div className="space-y-6 font-serif">
              <div className="border-b pb-4">
                <span className="text-xs font-bold bg-[#093103] text-white px-3 py-1 rounded-full uppercase">
                  {category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-black mt-3">{title}</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{subtitle}</p>
                <div className="text-xs text-gray-500 mt-2">
                  By {authorName} ({authorRole}) • {readingTime}
                </div>
              </div>

              {imageUrl && (
                <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden border">
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="prose max-w-none text-sm sm:text-base leading-relaxed break-words"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          ) : (
            /* Word Document Canvas (ContentEditable) */
            <div
              ref={editorRef}
              contentEditable
              onInput={updateStats}
              onKeyUp={updateStats}
              className="outline-none min-h-[400px] sm:min-h-[600px] text-sm sm:text-base md:text-lg leading-relaxed font-serif prose max-w-none focus:outline-none focus:ring-0 break-words [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:text-gray-800 [&_blockquote]:border-l-4 [&_blockquote]:border-[#093103] [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 sm:[&_blockquote]:my-4 [&_pre]:bg-black [&_pre]:text-emerald-300 [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:font-mono [&_pre]:text-xs [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:my-3 sm:[&_pre]:my-4 [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6 [&_ul]:mb-3 sm:[&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6 [&_ol]:mb-3 sm:[&_ol]:mb-4 [&_img]:rounded-xl [&_img]:my-3 sm:[&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_hr]:my-4 sm:[&_hr]:my-6 [&_hr]:border-gray-300"
              spellCheck
            />
          )}
        </div>
      </div>

      {/* Microsoft Word Bottom Status Bar - Mobile Responsive */}
      <footer className="bg-[#093103] text-white text-[10px] sm:text-[11px] px-3 sm:px-4 py-1.5 flex items-center justify-between border-t border-white/20 select-none shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <span>Page 1</span>
          <span>
            <strong>{wordCount}</strong> words
          </span>
          <span className="hidden md:inline">
            <strong>{charCount}</strong> chars
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Document Ready</span>
          </span>
          <span>{readingTime}</span>
        </div>
      </footer>
    </div>
  );
}
