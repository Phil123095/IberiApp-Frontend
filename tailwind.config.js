module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
