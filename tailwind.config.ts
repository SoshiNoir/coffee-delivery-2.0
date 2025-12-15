import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          background: "#FAFAFA",
          card: "#F3F2F2",
          white: "#FFFFFF",
          title: "#272221",
          subtitle: "#403937",
          text: "#574F4D",
          label: "#8D8686",
          hover: "#D7D5D5",
          button: "#E6E5E5",
          input: "#EDEDED",
        },
        brand: {
          yellow: "#DBAC2C",
          "yellow-dark": "#C47F17",
          purple: "#8047F8",
          "purple-dark": "#4B2995",
          "purple-light": "#EBE5F9",
        },
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
