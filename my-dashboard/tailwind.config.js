/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        scale: {
            '200': '2',
            '250': '2.5',
            '300': '3',
            // Add as many as you need...
        }
      },
    },
    plugins: [],
  }