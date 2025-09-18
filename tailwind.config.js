/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryText: "#10151F",
        secondaryText: "#3E424A",
        borderColor: "#E1DFE1",
        buttonColor: "#FF4000",
      },
    },
  },
  plugins: [],
};
