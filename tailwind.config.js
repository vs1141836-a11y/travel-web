/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#09090B",       // Near black
          card: "#18181B",       // Card background
          accent: "#E5A93C",     // Warm amber/gold
          electric: "#6366F1",   // Indigo accent
          muted: "#71717A",      // Cool gray
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        glow: "0 0 25px -5px rgba(229, 169, 60, 0.35)",
        cardHover: "0 30px 60px -20px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #09090B 30%, #1E1B4B 100%)',
        'gradient-cta': 'linear-gradient(135deg, #1E1B4B 0%, #09090B 100%)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-out',
        'scaleIn': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
