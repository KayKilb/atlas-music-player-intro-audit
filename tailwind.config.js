/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-background': '#7967A2',
        'text-color': '#08874E',

        primaryPurple: {
          light: '#D6BCFA', // light purple
          DEFAULT: '#9F7AEA', // default purple
          dark: '#6B46C1', // dark purple
        },
        secondaryPurple: {
          light: '#B794F4', // another shade of purple
          DEFAULT: '#805AD5', // another default shade
          dark: '#553C9A', // dark variant
        },
        accentPurple: {
          light: '#E9D8FD', // accent purple
          DEFAULT: '#D6BCFA', // default accent purple
        },
      },
    },
  },
  plugins: [],
};
