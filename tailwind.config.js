/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        asphalt: '#0C0404',
        capri: '#00BFFF',
        whitegray: '#F2F3F5',
        // Variantes de los colores principales
        'capri-light': '#66D9FF',
        'capri-dark': '#0099CC',
        'asphalt-light': '#2D2525',
        'asphalt-dark': '#070202',
      }
    }
  },
  plugins: [],
}