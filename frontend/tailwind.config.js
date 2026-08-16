/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Override the smallest text utilities to be larger than Tailwind's defaults
      fontSize: {
        'xs':   ['0.8rem',  { lineHeight: '1.2rem' }],   // was 0.75rem (12px) → now ~14.4px
        'sm':   ['0.9rem',  { lineHeight: '1.4rem' }],   // was 0.875rem (14px) → now ~16.2px
        'base': ['1rem',    { lineHeight: '1.625rem' }], // 18px (matches html root)
        'lg':   ['1.125rem',{ lineHeight: '1.75rem' }],  // ~20.25px
        'xl':   ['1.25rem', { lineHeight: '1.85rem' }],  // ~22.5px
        '2xl':  ['1.5rem',  { lineHeight: '2rem' }],     // ~27px
        '3xl':  ['1.875rem',{ lineHeight: '2.25rem' }],  // ~33.75px
        '4xl':  ['2.25rem', { lineHeight: '2.5rem' }],   // ~40.5px
        '5xl':  ['3rem',    { lineHeight: '1.1' }],      // ~54px
        '6xl':  ['3.75rem', { lineHeight: '1.1' }],      // ~67.5px
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#0052cc',
          700: '#0043a8',
          800: '#1e40af',
          900: '#0f172a',
        },
        civic: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#090d16',
          darkCard: '#0f172a',
          darkBorder: '#1e293b',
          darkSurface: '#182235',
          navy: '#0b132b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
