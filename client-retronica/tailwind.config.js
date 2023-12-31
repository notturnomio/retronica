/** @type {import('tailwindcss').Config} */

const twColors = require('tailwindcss/colors');

const colors = {
  transparent: twColors.transparent,
  black: '#2D2D2D',
  white: twColors.white,
  primary: '#FFE500',
  secondary: '#00AE9C',
  accent: '#00E7D3',
  bg_green: '#C4FCF1',
  bg_yellow: '#FCF0CA',
  bg_light: '#f6f3e6',
  dark: '#4B4737',
  grey: '#B1AB99',
  light_grey: '#d3cdba',
  red: twColors.red[500]
};

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors,
    extend: {
      fontSize: {
        xs: '0.82rem',
        sm: '0.98rem',
        base: '1.15rem',
        lg: '1.22rem',
        xl: '1.36rem',
        '1.5x1': '1.5rem',
        '2x1': '1.725rem',
        '3x1': '2.155rem',
        '4x1': '2.58',
        '5x1': '3.45rem',
        '6x1': '4.3rem',
        '7x1': '5.17rem',
        '8x1': '6.9rem',
        '9x1': '9.2rem'
      },
      keyframes: {
        animationOpacity: {
          from: { opacity: 0.2 },
          to: { opacity: 1 }
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        opacity: 'animationOpacity .5s easy-in-out',
        scaleIn: 'scaleIn 1s'
      }
    }
  },
  plugins: []
};
