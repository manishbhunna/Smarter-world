import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/Smarter-world" : "");

export function getAssetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}

export const SITE_CONFIG = {
  name: "Acovate",
  tagline: "Next-Generation Digital Engineering & AI Solutions",
  description:
    "Acovate is a premier digital agency specializing in custom website development, enterprise software, SaaS platforms, mobile apps, performance marketing, and autonomous AI automation.",
  url: "https://acovate.agency",
  ogImage: "https://acovate.agency/og-image.png",
  contact: {
    email: "contact@acovate.agency",
    phone: "+1 (800) 582-9675",
    address: "100 Innovation Boulevard, Suite 400, San Francisco, CA 94105",
    hours: "Monday - Friday: 8:00 AM - 6:00 PM PST",
  },
  socials: {
    twitter: "https://twitter.com/acovate_ai",
    linkedin: "https://linkedin.com/company/acovate-agency",
    instagram: "https://instagram.com/acovate.agency",
    github: "https://github.com/acovate",
  },
};
