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
        "pulse-bullet-green": "pulse-bullet-animation-green 1.5s infinite",
        shimmer: "shimmer 1.5s infinite linear",
        "slide-in": "slide-in 0.3s ease-in-out forwards",
        "slide-out": "slide-out 0.3s ease-in-out forwards"
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
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "slide-in": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0"
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "slide-out": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1"
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0"
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
        },

        ".backdrop-filter-blur::backdrop": {
          "backdrop-filter": "blur(2px)"
        }
      }

      addUtilities(newUtilities, ["focus", "hover", "active"])
    }
  ]
}
