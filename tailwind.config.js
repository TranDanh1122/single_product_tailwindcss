/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        'orange': 'hsl(26, 100%, 55%)',
        'pale_orange': 'hsl(25, 100%, 94%)',
        'very_dark_blue': 'hsl(220, 13%, 13%)',
        'dark_grayish_blue': 'hsl(219, 9%, 45%)',
        'grayish_blue': 'hsl(220, 14%, 75%)',
        'light_grayish_blue': 'hsl(223, 64%, 98%)',
        'white': 'hsl(0, 0%, 100%)',
        'black': 'hsla(0, 0%, 0% , 0.5)',
      },
      screens: {
        'mb': { min: '0px', max: '768px' },
        'tb': { min: '769px', max: '1024px' },
      },
    },
  },
  plugins: [],
}

