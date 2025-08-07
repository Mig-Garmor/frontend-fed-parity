/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseSkeleton: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
      animation: {
        "pulse-skeleton": "pulseSkeleton 1.5s ease-in-out infinite",
      },
      backgroundSize: {
        "auto-height": "auto 100%",
      },
    },
  },
  plugins: [],
};
