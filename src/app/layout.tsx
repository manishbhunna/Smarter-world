import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/layout/JsonLd";
import { SITE_CONFIG } from "@/lib/utils";

export const viewport: Viewport = {
  themeColor: "#dbd8cf",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Digital Engineering & AI Solutions Agency`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Digital Agency",
    "Website Development",
    "Custom Website Development",
    "Ecommerce Website Development",
    "Website Redesign",
    "Software Development",
    "SaaS Product Development",
    "Mobile App Development",
    "Facebook and Google Ads",
    "AI Integration",
    "AI Automation",
    "AI Agent Automation",
    "Next.js Agency",
    "San Francisco Digital Agency",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_CONFIG.name} | Digital Engineering & AI Solutions Agency`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Digital Engineering & AI Solutions Agency`,
    description: SITE_CONFIG.description,
    creator: "@smarterworld_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#dbd8cf] text-black selection:bg-[#093103] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
