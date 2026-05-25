/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        ink: "#0F172A",
        sand: "#F6F3EE",
        coral: "#FF6B5A",
        teal: "#0E7C7B",
        lime: "#C9F27C",
      },
      boxShadow: {
        card: "0 20px 45px -30px rgba(15, 23, 42, 0.45)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 0 rgba(255, 107, 90, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(255, 107, 90, 0.3)" },
        },
      },
      animation: {
        floatIn: "floatIn 0.7s ease-out both",
        glow: "glow 1.8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
