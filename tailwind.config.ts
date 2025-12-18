import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          background: "var(--color-base-background)",
          card: "var(--color-base-card)",
          white: "var(--color-base-white)",
          title: "var(--color-base-title)",
          subtitle: "var(--color-base-subtitle)",
          text: "var(--color-base-text)",
          label: "var(--color-base-label)",
          hover: "var(--color-base-hover)",
          button: "var(--color-base-button)",
          input: "var(--color-base-input)",
        },
        brand: {
          yellow: "var(--color-brand-yellow)",
          "yellow-dark": "var(--color-brand-yellow-dark)",
          purple: "var(--color-brand-purple)",
          "purple-dark": "var(--color-brand-purple-dark)",
          "purple-light": "var(--color-brand-purple-light)",
        },
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        soft: "0 8px 24px var(--color-shadow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
