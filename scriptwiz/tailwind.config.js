/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "false",
  theme: {
    extend: {
      colors: {
        primary: "#2596EB",
        secondary: "#8D89FA",
        blackbg: "#1E1E25",
        morningInt: "#FFACA9",
        dayInt: "#E9E79E",
        eveningInt: "#FEA940",
        nightInt: "#00BAEE",
        morningExt: "#F72E96",
        dayExt: "#D4D201",
        eveningExt: "#FF7C02",
        nightExt: "#0E27C8",
      },
      height: {
        timeline: "600px",
      },
      fontFamily: {
        primary: ["Fascinate"],
      },
      backgroundImage: {
        topography: "",
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 0.5s linear forwards',
      },
    },
  },
  plugins: [],
};
