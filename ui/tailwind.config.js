/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const {purple, ...rest} = colors
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,tsx,jsx,html}"
  ],
  theme: {
    colors: {
      purple: {
        100: '#FFFFFF',
        200: '#E5ECF4',
        300: '#C3BEF7',
        400: '#A787FB',
        500: '#8A4FFF',
        600: '#7733FF',
        700: '#651AFA',
        800: '#5200F5',
        900: '#5409EC',
      },
      white: '#FFFFFF',
      ...rest,
    },
    borderWidth: {
      '0':'0',
      '1': '1px'
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

