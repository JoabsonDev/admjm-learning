/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      animation: {
        pulse: "pulse 1s ease-in-out infinite",
        "pulse-bullet-red": "pulse-bullet-animation-red 1.5s infinite",
        "pulse-bullet-green": "pulse-bullet-animation-green 1.5s infinite"
      },
      keyframes: {
        pulse: {
          "0%": { scale: "1" },
          "50%": { scale: "0.95" },
          "100%": { scale: "1" }
        },
        "pulse-bullet-animation-red": {
          "0%": {
            boxShadow: "0 0 0 0rem rgba(252, 165, 165, 0.5)"
          },
          "100%": {
            boxShadow: "0 0 0 1.25rem rgba(252, 165, 165, 0)"
          }
        },
        "pulse-bullet-animation-green": {
          "0%": {
            boxShadow: "0 0 0 0rem rgba(22, 163, 74, 0.5)"
          },
          "100%": {
            boxShadow: "0 0 0 1.25rem rgba(252, 165, 165, 0)"
          }
        }
      }
    }
  },
  plugins: [
    function ({ addVariant, addUtilities }) {
      addVariant("active", "&.active")

      const newUtilities = {
        ".outline-ring": {
          outline: "-webkit-focus-ring-color auto .0625rem"
        }
      }

      addUtilities(newUtilities, ["focus", "hover", "active"])
    }
  ]
}
