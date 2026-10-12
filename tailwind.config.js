const colors = require("./theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        display: ["Cinzel", "Georgia", "serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.06)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        flicker: "flicker 3.2s ease-in-out infinite",
        "spin-slow": "spinSlow 90s linear infinite",
      },
    },
  },
  plugins: [],
};
