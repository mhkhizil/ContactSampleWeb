/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    fontFamily: {
      'primary': ['Manrope', 'sans-serif'],
      'secondary': ['Roboto', 'sans-serif'],
    },

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1537px',
      // => @media (min-width: 1537px) { ... }
    }
,
    extend: {
      colors: {
        'background' : '#1e2631', //[sky-50]
        'headline' : '#D1D1D1', //[sky-950]
        'para' : '#D1D1D1', //[sky-800]
        'button' : '#14ae9c', //[sky-500]
        'button-text' : '#fff', //[sky-200]
        'hover': '#2a343e',
        'placeholder' : '#38bdf8', //[sky-400] placeholder,link
      }

    },
  },
  plugins: [],
}


