import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#dbd8cf",
        foreground: "#000000",
        card: {
          DEFAULT: "#dbd8cf",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#dbd8cf",
          foreground: "#000000",
        },
        primary: {
          DEFAULT: "#093103",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#dbd8cf",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#dbd8cf",
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#093103",
          foreground: "#ffffff",
        },
        border: "#093103",
        input: "#093103",
        ring: "#093103",
        brand: {
          bg: "#dbd8cf",
          forest: "#093103",
          dark: "#093103",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        forest: "0 4px 20px -2px rgba(9, 49, 3, 0.25)",
        "forest-lg": "0 10px 30px -5px rgba(9, 49, 3, 0.35)",
        card: "0 2px 12px 0 rgba(9, 49, 3, 0.08)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
