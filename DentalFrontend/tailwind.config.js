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
          50: '#eef8ff',
          100: '#d8eeff',
          200: '#b9e1ff',
          300: '#89cfff',
          400: '#51b4ff',
          500: '#2996ff',
          600: '#1177f2',
          700: '#0b60de',
          800: '#104eb4',
          900: '#14448d',
          950: '#102a56',
          DEFAULT: '#2996ff',
        },
        mint: {
          50: '#effefb',
          100: '#c8fff4',
          200: '#91feea',
          300: '#53f5dc',
          400: '#1ee3cb',
          500: '#06c7b2',
          600: '#02a092',
          700: '#067f77',
          800: '#0a6460',
          900: '#0d534f',
          DEFAULT: '#06c7b2',
        },
        medical: {
          teal: '#06c7b2',
          light: '#f8fbff',
          muted: '#94a3b8',
          accent: '#53f5dc',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.72)',
          border: 'rgba(255, 255, 255, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(0, 0, 0, 0.06)',
        'float': '0 8px 32px -8px rgba(0, 0, 0, 0.08)',
        'premium': '0 16px 48px -12px rgba(0, 0, 0, 0.12)',
        'glow-brand': '0 8px 40px -8px rgba(41, 150, 255, 0.3)',
        'glow-mint': '0 8px 40px -8px rgba(6, 199, 178, 0.3)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
    },
  },
  plugins: [],
}
