/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
