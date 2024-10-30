/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "false",
  theme: {
    extend: {
      colors: {
        dayInt: "#f4ca28",
        nightInt: "#c8d3a2",
        dayExt: "#86bc33",
        nightExt: "#5bc5ae",
      },
    },
  },
  plugins: [],
};
