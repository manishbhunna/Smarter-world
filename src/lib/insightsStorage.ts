import { INSIGHTS_DATA, InsightItem } from "@/data/insightsData";

const STORAGE_KEY = "acovate_insights_v1";

/**
 * Retrieve the current insights list from browser localStorage,
 * falling back to INSIGHTS_DATA if not yet initialized or on SSR.
 */
export function getStoredInsights(): InsightItem[] {
  if (typeof window === "undefined") {
    return INSIGHTS_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INSIGHTS_DATA));
      return INSIGHTS_DATA;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INSIGHTS_DATA;
  } catch (err) {
    console.error("Failed to read stored insights:", err);
    return INSIGHTS_DATA;
  }
}

/**
 * Save the entire insights array to localStorage and notify listeners.
 */
export function saveStoredInsights(items: InsightItem[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("insights_updated", { detail: items }));
  } catch (err) {
    console.error("Failed to save insights:", err);
  }
}

/**
 * Create/Add a new insight to stored list.
 */
export function addStoredInsight(item: InsightItem): InsightItem[] {
  const current = getStoredInsights();
  // If new item is featured, un-feature others
  const updated = [
    item,
    ...current.map((i) => (item.featured ? { ...i, featured: false } : i)),
  ];
  saveStoredInsights(updated);
  return updated;
}

/**
 * Update an existing insight.
 */
export function updateStoredInsight(item: InsightItem): InsightItem[] {
  const current = getStoredInsights();
  const updated = current.map((i) => {
    if (i.id === item.id) {
      return item;
    }
    // If the updated item is marked featured, unfeature others
    if (item.featured) {
      return { ...i, featured: false };
    }
    return i;
  });
  saveStoredInsights(updated);
  return updated;
}

/**
 * Delete an insight by id.
 */
export function deleteStoredInsight(id: string): InsightItem[] {
  const current = getStoredInsights();
  const updated = current.filter((i) => i.id !== id);
  // Ensure at least one item remains featured if list not empty
  if (updated.length > 0 && !updated.some((i) => i.featured)) {
    updated[0].featured = true;
  }
  saveStoredInsights(updated);
  return updated;
}

/**
 * Reset storage back to initial sample dataset.
 */
export function resetStoredInsights(): InsightItem[] {
  saveStoredInsights(INSIGHTS_DATA);
  return INSIGHTS_DATA;
}

/**
 * Convert technical sections to editable HTML string for the Word Editor.
 */
export function sectionsToHtml(post: InsightItem): string {
  let html = "";
  if (post.sections && post.sections.length > 0) {
    post.sections.forEach((sec) => {
      html += `<h2>${sec.heading}</h2>`;
      sec.content.forEach((p) => {
        html += `<p>${p}</p>`;
      });
      if (sec.codeSnippet) {
        html += `<pre><code>${sec.codeSnippet}</code></pre>`;
      }
    });
  } else if (post.summary) {
    html += `<p>${post.summary}</p>`;
  }
  return html;
}

/**
 * Convert Word Editor HTML back into structured TechnicalSection[]
 */
export function htmlToSections(html: string): {
  sections: InsightItem["sections"];
  summary: string;
} {
  if (typeof window === "undefined") {
    return {
      sections: [{ heading: "1. Overview", content: [html] }],
      summary: html.replace(/<[^>]*>?/gm, "").slice(0, 160),
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const nodes = Array.from(doc.body.children);

  const sections: InsightItem["sections"] = [];
  let currentSection: InsightItem["sections"][0] = {
    heading: "1. Overview",
    content: [],
  };

  if (nodes.length === 0) {
    const text = doc.body.textContent?.trim() || "";
    return {
      sections: [{ heading: "1. Overview", content: text ? [text] : [] }],
      summary: text.slice(0, 160),
    };
  }

  nodes.forEach((node) => {
    const tag = node.tagName.toLowerCase();
    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
      if (currentSection.content.length > 0 || currentSection.codeSnippet) {
        sections.push(currentSection);
      }
      currentSection = { heading: node.textContent?.trim() || "Section", content: [] };
    } else if (tag === "pre") {
      currentSection.codeSnippet = node.textContent?.trim() || "";
    } else {
      const text = node.textContent?.trim();
      if (text) {
        currentSection.content.push(text);
      }
    }
  });

  if (currentSection.content.length > 0 || currentSection.codeSnippet) {
    sections.push(currentSection);
  }

  if (sections.length === 0) {
    sections.push({
      heading: "1. Overview",
      content: [doc.body.textContent?.trim() || ""],
    });
  }

  const allText = doc.body.textContent?.trim() || "";
  const summary = allText.slice(0, 180) + (allText.length > 180 ? "..." : "");

  return { sections, summary };
}

/**
 * Return the appropriate URL for an insight:
 * For built-in static posts, uses direct clean slug path: /insights/${slug}/
 * For dynamically created posts in browser storage, uses export-safe path: /insights/post/?slug=${slug}
 */
export function getInsightHref(item: InsightItem | { slug: string }): string {
  const isStatic = INSIGHTS_DATA.some((i) => i.slug === item.slug);
  if (isStatic) {
    return `/insights/${item.slug}/`;
  }
  return `/insights/post/?slug=${encodeURIComponent(item.slug)}`;
}

