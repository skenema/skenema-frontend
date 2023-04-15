const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'IBM Plex Sans Thai',
          ...defaultTheme.fontFamily.sans
        ]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Remove other themes to simplify development
    themes: ['light']
  }
}

