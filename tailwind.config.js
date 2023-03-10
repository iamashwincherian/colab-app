const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.green[600],
        "primary-dark": colors.green[700],
        dark: "#161819",
        "dark-2": "#1f2123",
        "dark-3": "#2b2c30",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
