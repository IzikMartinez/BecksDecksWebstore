/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'wave-blue-100': '#c8fefe',
        'wave-blue-200': '#a8eeee',
        'wave-blue-400': '#96fdfd',
        'wave-compliment': '#96cafd',
        'dark-wave': '#6098b7',
        'pastel-yellow': '#fdfd96',
        'yellow-compliment': '#fdca96',
        'pastel-coral': '#fd9696'
      },
      fontFamily: {
        'title-display': ['Bangers', 'cursive'],
        'main-display': ['Yeseva', 'cursive'],
        'sans-fira': ['Fira Sans', 'sans-serif'],
        'texgyre-adventor': ['Tex Gyre Heros', 'sans-serif'],
        'iosevka': ['Iosevka']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-opentype')
  ],
}
