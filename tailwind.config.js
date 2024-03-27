/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#409EFF",
        secondary: "#3b8ee4",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
