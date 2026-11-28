/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#06080d", // Ultra-deep obsidian backdrop
          900: "#0b0f17", // Main page backdrop
          850: "#101520", // Section container backdrop
          800: "#151b29", // Card surface
          750: "#1d2538", // Card hover surface
          700: "#27324b", // Border & divider
          600: "#3a4a6d", // Elevated borders
          500: "#50638e", // Inactive captions
        },
        brand: {
          cyan: "#00e5ff", // Electric studio cyan
          "cyan-hover": "#33ebff",
          "cyan-light": "#80f2ff",
          "cyan-glow": "rgba(0, 229, 255, 0.35)",
          crimson: "#ff2a51", // Vivid racing crimson
          "crimson-hover": "#ff4769",
          "crimson-glow": "rgba(255, 42, 81, 0.35)",
          orange: "#ff5e00", // Signature VayZen flame
          "orange-hover": "#ff7520",
          "orange-light": "#ffa266",
          "orange-glow": "rgba(255, 94, 0, 0.35)",
          gold: "#f59e0b",
          red: "#ef4444",
          green: "#10b981",
          emerald: "#10b981",
          purple: "#8b5cf6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        gaming: [
          "Rajdhani",
          "Orbitron",
          "Inter",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gaming-gradient": "linear-gradient(135deg, #101520 0%, #171e2e 100%)",
        "studio-gradient": "linear-gradient(135deg, rgba(16, 21, 32, 0.95) 0%, rgba(21, 27, 41, 0.85) 100%)",
        "hero-glow": "radial-gradient(circle at 50% 25%, rgba(0, 229, 255, 0.12) 0%, rgba(255, 94, 0, 0.08) 50%, transparent 80%)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -4px rgba(0, 229, 255, 0.4)",
        "cyan-sm": "0 0 15px -3px rgba(0, 229, 255, 0.3)",
        "crimson-glow": "0 0 25px -4px rgba(255, 42, 81, 0.4)",
        "orange-glow": "0 0 25px -5px rgba(255, 94, 0, 0.45)",
        "orange-sm": "0 0 15px -3px rgba(255, 94, 0, 0.3)",
        "card-studio": "0 15px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px -3px rgba(0, 229, 255, 0.12)",
        "card-hover": "0 14px 35px -10px rgba(0, 0, 0, 0.85), 0 0 20px -3px rgba(0, 229, 255, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
