/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Rural Market
      colors: {
        customPurple: 'hsl(314, 40%, 37%)',    // Purple: #853A76
        customGreen: 'hsl(123, 100%, 35%)', // Green: #00B207
        accentBlack: 'hsl(0, 0%, 0%)',       // Negro: #000000
        backgroundGray: 'hsl(240, 18%, 95%)',// Gris de fondo: #F4EFF4
        neutralGray: 'hsl(210, 22%, 89%)',   // Botón search: #DFE6E9
      },
    },
  },
  plugins: [],
}