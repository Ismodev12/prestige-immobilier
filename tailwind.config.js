/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0E2552', 800: '#0B1E44', 700: '#16336B', 600: '#24467F', 100: '#E8EDF6' },
        coral: { DEFAULT: '#D85C45', light: '#F3907D', dark: '#B9472F', soft: '#FCE3DB' },
        peach: { DEFAULT: '#FDF3EE', 200: '#FBE6DC', 300: '#F8D6C7' },
        mist: '#F7F8FA',
        ink: { DEFAULT: '#1F2937', muted: '#5F6B7A' },
        line: '#E6E8EC',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1240px' },
      borderRadius: { card: '4px' },
      boxShadow: {
        card: '0 1px 2px rgba(14,37,82,.05), 0 10px 30px -18px rgba(14,37,82,.25)',
        lift: '0 2px 4px rgba(14,37,82,.06), 0 24px 48px -24px rgba(14,37,82,.35)',
        bar: '0 18px 40px -22px rgba(14,37,82,.35)',
      },
      letterSpacing: { eyebrow: '.2em' },
    },
  },
  plugins: [],
}
