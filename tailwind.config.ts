import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Avenir Next"',
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        background: "oklch(var(--background))",
        ink: "oklch(var(--ink))",
        muted: "oklch(var(--muted))",
        surface: "oklch(var(--surface))",
        border: "oklch(var(--border))",
        inverse: "oklch(var(--inverse))",
        "inverse-ink": "oklch(var(--inverse-ink))",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
