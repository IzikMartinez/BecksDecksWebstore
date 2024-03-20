/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '62': '15.5rem',
      },      
      width: {
        '66': '16.5rem',
        '1/7': '14.2857143%',
      },
      maxWidth: {
        '1/7': '14.2857143%',
      },
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
        'texgyre-adventor': ['Adventor', 'sans-serif'],
        'pagella': ['Pagella', 'serif'],
        'bonum': ['Bonum', 'serif'],
        'iosevka': ['Iosevka', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-opentype')
  ],
}
