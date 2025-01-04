/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'secondary' : {
          500: 'rgb(244, 244, 245)',
        },
        'happy-blue': {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#0087ff',
          600: '#006ccc',
          700: '#005199',
          800: '#003666',
          900: '#001b33',
        },
        'happy-yellow': {
          50: '#fffde6',
          100: '#fffbcc',
          200: '#fff799',
          300: '#fff366',
          400: '#ffef33',
          500: '#ffeb00',
          600: '#ccbc00',
          700: '#998d00',
          800: '#665e00',
          900: '#332f00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

