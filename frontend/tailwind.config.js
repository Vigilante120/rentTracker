/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#14121A",
        sand: "#FFF7ED",
        coral: "#FF6E7B",
        teal: "#3A86FF",
        lime: "#C7F9CC",
        lilac: "#CDB4FF",
        sky: "#BDE0FE",
        blush: "#FFE5EC",
      },
      boxShadow: {
        card: "0 20px 45px -30px rgba(20, 18, 26, 0.35)",
        glow: "0 16px 40px -20px rgba(58, 134, 255, 0.45)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floatIn: "floatIn 0.7s ease-out both",
        shimmer: "shimmer 6s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
