const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#1A4150',
      dark: '#202124',
      secondaryDark: '#333333',
      white: '#fff',
      whiteGrey: '#E8EAED',
      grey: '#D8D8D8',
      black: '#000',
      blackOpacity: 'rgba(0, 0, 0, 0.55)',
      transparent: 'rgba(0,0,0,0)',
      ...colors,
    },
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
};
