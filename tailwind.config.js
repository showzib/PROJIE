/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Ye add karo - dark mode enable karne ke liye
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        text: "var(--color-text)",
        background: "var(--color-bg)",
      },
    },
  },
  plugins: [],
}