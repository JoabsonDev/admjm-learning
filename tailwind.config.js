/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("active", "&.active")
    }
  ]
}
