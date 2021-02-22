module.exports = {
  purge: {
    mode:'layers',
    content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'oswald':["'Oswald'", 'sans-serif']
      },
      TransitionProperty:{
        'height':'height'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
