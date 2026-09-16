import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smarter World - Digital & AI Agency",
    short_name: "Smarter World",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#dbd8cf",
    theme_color: "#093103",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
