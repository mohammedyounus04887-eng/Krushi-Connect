/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f4f5ef',
          100: '#e9eddd',
          200: '#d7dfbf',
          300: '#bfce8b',
          400: '#a9bd57',
          500: '#8da332',
          600: '#657b23',
          700: '#4d601d',
          800: '#414d28',
          900: '#333d25',
          950: '#262d20',
        },
        earth: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        forest: {
          50: '#f4f5ef',
          100: '#e9eddd',
          200: '#d7dfbf',
          500: '#657b23',
          600: '#4d601d',
          700: '#333d25',
          800: '#164a2a',
          900: '#123d24',
          950: '#262d20',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.85))',
        'glass-dark': 'linear-gradient(135deg, rgba(18, 61, 36, 0.95), rgba(15, 57, 43, 0.95))',
        'glass-gold': 'linear-gradient(135deg, rgba(254, 243, 199, 0.85), rgba(255, 255, 255, 0.95))',
        'agri-gradient': 'linear-gradient(135deg, #4d601d 0%, #657b23 50%, #eab308 100%)',
      },
      boxShadow: {
        'glow-agri': '0 0 25px -2px rgba(34, 197, 94, 0.35)',
        'glow-gold': '0 0 25px -2px rgba(234, 179, 8, 0.45)',
        'agri-card': '0 10px 30px -5px rgba(22, 101, 52, 0.1), 0 0 15px 0 rgba(234, 179, 8, 0.15)',
      }
    },
  },
  plugins: [],
};
