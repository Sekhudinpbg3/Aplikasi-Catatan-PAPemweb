const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "./resources/js/Pages/**/*.jsx",
    "./resources/js/Assets/icons/**/*.jsx",
    "./resources/js/Components/*.jsx",
    "./resources/js/Components/atoms/**/*.jsx",
    "./resources/js/Components/molecules/**/*.jsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
