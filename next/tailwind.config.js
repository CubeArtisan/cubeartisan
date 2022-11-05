/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 25px 25px rgba(0, 0, 0, 0.25)',
      },
      gridTemplateColumns: {
        'auto-3': 'repeat(auto-fit, minmax(min(max(25% + 0.75rem, 13rem), 100%), 1fr))',
      },
      aspectRatio: {
        thumbnail: '4/3',
        card: '36/56',
      },
    },
  },
};
