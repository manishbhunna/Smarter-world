import React from "react";
import { SITE_CONFIG } from "@/lib/utils";
import { SERVICES_DATA } from "@/data/servicesData";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/logo.png`,
        description: SITE_CONFIG.description,
        email: SITE_CONFIG.contact.email,
        telephone: SITE_CONFIG.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Innovation Boulevard, Suite 400",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94105",
          addressCountry: "US",
        },
        sameAs: [
          SITE_CONFIG.socials.twitter,
          SITE_CONFIG.socials.linkedin,
          SITE_CONFIG.socials.github,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.tagline,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_CONFIG.url}/#service`,
        name: `${SITE_CONFIG.name} - Digital & AI Engineering Agency`,
        url: SITE_CONFIG.url,
        telephone: SITE_CONFIG.contact.phone,
        priceRange: "$$$",
        openingHours: "Mo-Fr 08:00-18:00",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Agency Services",
          itemListElement: SERVICES_DATA.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.shortDescription,
            },
            position: index + 1,
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
