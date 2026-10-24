import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/resources/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        label: ["var(--font-label)", "system-ui", "sans-serif"],
        code: ["var(--font-code)", "monospace"],
      },
      colors: {
        page: "var(--bg-page)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          elevated: "var(--bg-surface-elevated)",
          glass: "var(--bg-surface-glass)",
        },
        fg: {
          DEFAULT: "var(--fg-primary)",
          muted: "var(--fg-muted)",
          subtle: "var(--fg-subtle)",
        },
        brand: {
          DEFAULT: "var(--brand-primary)",
          strong: "var(--brand-strong)",
          soft: "var(--brand-soft)",
          glow: "var(--brand-glow)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          soft: "var(--accent-soft)",
        },
        border: {
          DEFAULT: "var(--border-subtle)",
          strong: "var(--border-strong)",
          brand: "var(--border-brand)",
        },
      },
      boxShadow: {
        glass: "0 8px 32px -4px rgba(0, 0, 0, 0.24), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        "brand-glow": "0 0 30px -5px var(--brand-glow)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.35), 0 0 20px -5px var(--brand-glow)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
