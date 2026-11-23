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
          950: "#07080b", // Deepest background
          900: "#0b0d13", // Main background
          850: "#10131a", // Section background
          800: "#151923", // Card background
          750: "#1a202c", // Card hover background
          700: "#222a3a", // Border / divider
          600: "#323d53", // Subtle borders
          500: "#4b5773", // Inactive states
        },
        brand: {
          orange: "#ff5e00", // Vibrant gaming orange
          "orange-hover": "#ff7520",
          "orange-light": "#ffa266",
          "orange-glow": "rgba(255, 94, 0, 0.35)",
          gold: "#f59e0b",
          red: "#ef4444",
          green: "#10b981",
          cyan: "#06b6d4",
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
          "Orbitron",
          "Rajdhani",
          "Inter",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gaming-gradient": "linear-gradient(135deg, #10131a 0%, #151923 100%)",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(255, 94, 0, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "orange-glow": "0 0 25px -5px rgba(255, 94, 0, 0.45)",
        "orange-sm": "0 0 15px -3px rgba(255, 94, 0, 0.3)",
        "card-hover": "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -2px rgba(255, 94, 0, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
