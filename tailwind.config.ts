import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        charcoal: "#1A1A1A",
        smoke: "#222220",
        bone: "#F6F4F0",
        bronze: { DEFAULT: "#B08D57", deep: "#8A6B3F", soft: "#C9AE82" },
        line: "rgba(255,255,255,0.12)",
        "line-dark": "rgba(18,18,18,0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.22em" },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: { "400": "400ms" },
      maxWidth: { wrap: "82rem" },
    },
  },
  plugins: [],
};
export default config;
