/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const hideScrollbar = {
        ".scrollbar-hide::-webkit-scrollbar": {
          width: "0.4rem", // Width of the scrollbar
        },
        ".scrollbar-hide::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent", // Color of the thumb
        },
        ".scrollbar-hide": {
          "scrollbar-width": "thin",
          "scrollbar-color": "transparent transparent", // Thumb and track color
        },
      };
      addUtilities(hideScrollbar, ["responsive"]);
    },
  ],
};
