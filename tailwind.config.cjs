/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0ff0e0",
          "teal-dark": "#0cc8b8",
          amber: "#f5a623",
          "amber-light": "#ffd580",
          coral: "#ff6b6b",
        },
        surface: {
          950: "#09090b",
          900: "#18181b",
          850: "#1e1e22",
          800: "#27272a",
          700: "#3f3f46",
          600: "#52525b",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', "sans-serif"],
        body: ['"General Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
