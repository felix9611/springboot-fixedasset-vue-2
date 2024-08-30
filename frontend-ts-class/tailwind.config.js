/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'JNR185': "url('/assets/img/background3.jpg')"
      }
    },
  },
  plugins: [],
}

