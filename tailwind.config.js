/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bbe3bf',
          300: '#90cd96',
          400: '#65b26e',
          500: '#48944f',
          600: '#3a5a40',
          700: '#2d472f',
          800: '#253a26',
          900: '#1f301f',
        },
      },
    },
  },
  plugins: [],
};