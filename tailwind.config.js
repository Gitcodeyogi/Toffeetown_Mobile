/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        brand: ['"Luckiest Guy"', 'cursive'],
      },
      colors: {
        choco: {
          dark: '#1a1a1a',
          panel: 'rgba(0, 0, 0, 0.6)', // 60% darkness standard
        }
      }
    },
  },
  plugins: [],
}
