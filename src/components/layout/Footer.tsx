import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";
import { SERVICES_DATA } from "@/data/servicesData";

export function Footer() {
  const webServices = SERVICES_DATA.filter((s) => s.category === "Web & Digital");
  const softwareAndAiServices = SERVICES_DATA.filter(
    (s) => s.category === "Software & SaaS" || s.category === "AI & Automation"
  );

  return (
    <footer className="bg-[#dbd8cf] text-black pt-20 pb-12 border-t border-[#093103]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#093103]/20">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 inline-flex focus:outline-none group">
              <div className="relative w-10 h-10 rounded-xl bg-[#093103] shadow-forest flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-black leading-none">
                  SmarterWorld
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-black/70 uppercase mt-1">
                  Digital & AI Agency
                </span>
              </div>
            </Link>
            <p className="text-sm text-black/80 leading-relaxed max-w-sm">
              We empower modern enterprises and fast-growing founders with world-class web engineering, custom software, high-converting digital advertising, and autonomous AI automation.
            </p>
            <div className="flex flex-col space-y-2.5 pt-2 text-xs text-black">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Enterprise Grade Security & High Performance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#093103] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Full Intellectual Property Ownership</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-black/80 hover:text-black font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-black/80 hover:text-black font-medium transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black/80 hover:text-black font-medium transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black/80 hover:text-black font-medium transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services#faq" className="text-black/80 hover:text-black font-medium transition-colors">
                  FAQs & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Web & Marketing Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Web & Growth
            </h4>
            <ul className="space-y-3 text-sm">
              {webServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-black/80 hover:text-black font-medium transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services#facebook-google-ads"
                  className="text-black/80 hover:text-black font-medium transition-colors"
                >
                  Facebook & Google Ads
                </Link>
              </li>
            </ul>
          </div>

          {/* Software & AI Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Software & AI
            </h4>
            <ul className="space-y-3 text-sm">
              {softwareAndAiServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-black/80 hover:text-black font-medium transition-colors line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact info bar */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#093103]/20 text-sm">
          <div className="flex items-center gap-3.5 bg-[#dbd8cf] p-3.5 rounded-xl border border-[#093103]/20 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#093103] flex items-center justify-center text-white shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-black/70">Direct Inquiries</p>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-black hover:underline font-bold">
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#dbd8cf] p-3.5 rounded-xl border border-[#093103]/20 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#093103] flex items-center justify-center text-white shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-black/70">Client Support & Sales</p>
              <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g, "")}`} className="text-black hover:underline font-bold">
                {SITE_CONFIG.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#dbd8cf] p-3.5 rounded-xl border border-[#093103]/20 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#093103] flex items-center justify-center text-white shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-black/70">Headquarters</p>
              <span className="text-black font-bold">San Francisco, CA & Global Remote</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/70">
          <p>© {new Date().getFullYear()} Smarter World Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-black hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-black hover:underline transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
