const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uciblue: "#0064A4",
        uciyellow: "#FFD200",
        darkblue: "#1B3D6D",
        lightblue: "#0064A4",
        cardtitle: "#1B3D6D",
        red: "#C63E04",
      },
      fontFamily: {
        primary: ["var(--raleway-font)", ...fontFamily.sans],
        inter: ["var(--inter-font)", ...fontFamily.sans],
        serif: ["var(--raleway-font)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
