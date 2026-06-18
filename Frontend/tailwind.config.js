/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffbf5',
          100: '#fef6e8',
          200: '#fce4c0',
          300: '#fbd299',
          400: '#f9c070',
          500: '#f8ae47',
          600: '#d68627',
          700: '#ad5a0f',
          800: '#8c4608',
          900: '#6d3606'
        },
        gold: {
          50: '#fffbf0',
          100: '#fff5dd',
          200: '#ffeab5',
          300: '#ffd97d',
          400: '#ffc345',
          500: '#ffb400',
          600: '#cc8f00',
          700: '#996b00',
          800: '#664600',
          900: '#332300'
        }
      }
    }
  },
  plugins: []
}
