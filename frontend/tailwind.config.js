/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
        terracotta: {
          50: '#fdf5f3',
          100: '#fce8e4',
          200: '#fad5ce',
          300: '#f5b8ac',
          400: '#ed8f7c',
          500: '#e2725b',
          600: '#cd4f35',
          700: '#ac3f29',
          800: '#8e3826',
          900: '#773325',
          950: '#40170f',
        },
      },
      backgroundImage: {
        hero: "url('./img/hero-img.jpg')",
        
      },
    },
  },
  plugins: [],
};
