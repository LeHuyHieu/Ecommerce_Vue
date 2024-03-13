/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('flowbite/plugin')
  ],
}

