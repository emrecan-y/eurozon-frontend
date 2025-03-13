/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-bg": "var(--primary-bg)",
        "primary-text": "var(--primary-text)",
        "tooltip-bg": "var(--tooltip-bg)",
        "tooltip-text": "var(--tooltip-text)",
      },
    },
  },

  plugins: [],
};
