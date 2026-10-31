/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF6',
          200: '#F8F0D8',
          300: '#F5E8C5',
          400: '#EBD9A8',
          500: '#D9C58D',
        },
        tea: {
          light: '#E8C45D',
          caramel: '#D9A514',
          orange: '#C28A17',
          accent: '#A87908',
          brown: '#5A4515',
          dark: '#292316',
          deep: '#1D190F',
        },
        sage: {
          50: '#F6F8F5',
          100: '#EBF0E8',
          200: '#D5DFCF',
          300: '#BCCEB5',
          400: '#A9B89A',
          500: '#8E9F7F',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(107, 62, 38, 0.06)',
        'medium': '0 10px 30px -4px rgba(107, 62, 38, 0.1)',
        'elevated': '0 20px 40px -6px rgba(107, 62, 38, 0.15)',
        'glow': '0 0 30px rgba(201, 139, 75, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-20px) scaleX(1.2)', opacity: '0.4' },
          '100%': { transform: 'translateY(-40px) scaleX(1.5)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        steam: 'steam 3s ease-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
