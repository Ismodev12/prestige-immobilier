/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#071D3B', 800: '#071D3B', 700: '#102B50', 600: '#1B3A66', 100: '#E7ECF3' },
        gold: { DEFAULT: '#D5A447', light: '#E8BD69', dark: '#B98A31', soft: '#FBF4E6' },
        mist: '#F6F7F9',
        ink: { DEFAULT: '#1D2733', muted: '#626B78' },
        line: '#E4E7EC',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1320px' },
      borderRadius: { card: '6px' },
      boxShadow: {
        card: '0 1px 2px rgba(7,29,59,.06), 0 8px 24px -12px rgba(7,29,59,.18)',
        lift: '0 2px 4px rgba(7,29,59,.06), 0 18px 40px -18px rgba(7,29,59,.35)',
        bar: '0 20px 50px -20px rgba(7,29,59,.35)',
      },
      letterSpacing: { eyebrow: '.22em' },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
}
