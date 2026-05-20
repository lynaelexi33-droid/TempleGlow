/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biblical-green': '#2D5A27',
        'biblical-olive': '#808000',
        'biblical-gold': '#D4AF37',
        'biblical-cream': '#F5F5DC',
        'biblical-earth': '#704214',
      },
      fontFamily: {
        'serif': ['Merriweather', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
