/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        masters: {
          green: '#006747',
          'green-dark': '#004d35',
          'green-light': '#00805a',
          gold: '#FFD700',
          'gold-dark': '#c9a800',
          'gold-light': '#ffe566',
          cream: '#f5f0e8',
          'off-white': '#fafaf7',
        },
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
