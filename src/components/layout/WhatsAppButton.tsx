import React from "react";
import { SITE_CONFIG } from "@/lib/utils";

export function WhatsAppButton() {
  const phoneClean = SITE_CONFIG.contact.phone.replace(/\D/g, "");
  const defaultMessage = encodeURIComponent(
    "Hello Smarter World, I would like to inquire about your engineering & AI services."
  );
  const whatsappUrl = `https://wa.me/${phoneClean}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#093103] text-white shadow-forest flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black hover:shadow-forest-lg focus:outline-none focus:ring-2 focus:ring-[#093103] focus:ring-offset-2 focus:ring-offset-[#dbd8cf]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.778.979-.954 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.897-.8-1.503-1.788-1.679-2.089-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.241-.244-.59-.492-.51-.678-.52l-.578-.01c-.2 0-.526.075-.802.376-.276.3-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.536 2 2.07 6.466 2.07 11.97c0 1.954.564 3.78 1.542 5.328L2.1 22l4.838-1.48a9.92 9.92 0 0 0 5.102 1.41h.004c5.504 0 9.97-4.466 9.97-9.97C22.014 6.466 17.548 2 12.04 2zm0 18.06h-.003a8.23 8.23 0 0 1-4.195-1.149l-.3-.178-3.116.953.968-3.036-.195-.312a8.243 8.243 0 0 1-1.264-4.368c0-4.542 3.696-8.238 8.24-8.238 2.2 0 4.269.858 5.824 2.414a8.188 8.188 0 0 1 2.41 5.824c0 4.542-3.696 8.238-8.24 8.238z" />
        </svg>
      </a>
    </aside>
  );
}
