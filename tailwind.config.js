/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#13b6ec',
        'primary-hover': '#0f8cc9',
        'background-light': '#f6f8f8',
        'background-dark': '#101d22',
        'surface-light': '#ffffff',
        'surface-dark': '#1a2c32',
      },
      fontFamily: {
        display: ['Inter', 'Noto Sans SC', 'sans-serif'],
        body: ['Noto Sans SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};




