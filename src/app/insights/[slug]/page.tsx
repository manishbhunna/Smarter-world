import React from "react";
import type { Metadata } from "next";
import { INSIGHTS_DATA } from "@/data/insightsData";
import { SITE_CONFIG } from "@/lib/utils";
import { BlogPostClient } from "@/components/insights/BlogPostClient";

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all insights (required for output: 'export')
export function generateStaticParams() {
  return INSIGHTS_DATA.map((item) => ({
    slug: item.slug,
  }));
}

// Dynamic SEO metadata
export function generateMetadata({ params }: PageProps): Metadata {
  const post = INSIGHTS_DATA.find((item) => item.slug === params.slug);

  if (!post) {
    return {
      title: "Engineering Perspective | Acovate",
      description: "Technical architecture briefings and systems engineering analysis.",
    };
  }

  return {
    title: `${post.title} | Acovate Insights`,
    description: post.subtitle || post.summary,
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url: `${SITE_CONFIG.url}/insights/${post.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = INSIGHTS_DATA.find((item) => item.slug === params.slug) || null;

  // Structured JSON-LD Data for SEO when post exists at build time
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.subtitle || post.summary,
        image: post.image,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        articleSection: post.category,
        keywords: post.tags.join(", "),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostClient slug={params.slug} initialPost={post} />
    </>
  );
}
