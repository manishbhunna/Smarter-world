import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_CONFIG = {
  name: "Smarter World",
  tagline: "Next-Generation Digital Engineering & AI Solutions",
  description:
    "Smarter World is a premier digital agency specializing in custom website development, enterprise software, SaaS platforms, mobile apps, performance marketing, and autonomous AI automation.",
  url: "https://smarterworld.agency",
  ogImage: "https://smarterworld.agency/og-image.png",
  contact: {
    email: "contact@smarterworld.agency",
    phone: "+1 (800) 582-9675",
    address: "100 Innovation Boulevard, Suite 400, San Francisco, CA 94105",
    hours: "Monday - Friday: 8:00 AM - 6:00 PM PST",
  },
  socials: {
    twitter: "https://twitter.com/smarterworld_ai",
    linkedin: "https://linkedin.com/company/smarterworld-agency",
    github: "https://github.com/smarterworld",
  },
};
