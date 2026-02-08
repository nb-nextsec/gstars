import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Geelong Cats official colors - Darker navy to match header
        'navy': {
          DEFAULT: '#002244',
          50: '#E6EBF2',
          100: '#BFD0E0',
          200: '#7FA0C2',
          300: '#4070A3',
          400: '#1A4A7A',
          500: '#002244',
          600: '#001C38',
          700: '#00162C',
          800: '#001020',
          900: '#000A14',
        },
        'accent': {
          DEFAULT: '#1E5A8D',
          light: '#2A6FA8',
          dark: '#174872',
        },
        'cats-white': '#FFFFFF',
        'cats-gold': '#FFD700',
        'gray-bg': '#F5F7FA',
        'warm-gray': '#F8F6F3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
