/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-bg-1": "var(--primary-1)",
        "primary-text-1": "var(--primary-text-1)",
        "accent-1": "var(--accent-1)",

        "primary-bg-2": "var(--primary-2)",
        "primary-text-2": "var(--primary-text-2)",
        "accent-2": "var(--accent-2)",

        "primary-bg-3": "var(--primary-3)",
        "primary-text-3": "var(--primary-text-3)",
        "accent-3": "var(--accent-3)",
      },
    },
  },

  plugins: [],
};
