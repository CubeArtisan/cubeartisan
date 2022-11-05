/**
 * screen size settins in rem. Converted to pixels for use in breakpoints.
 * font size variables used to calculate fluid typography
 */
const screensRem = {
  min: 20,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
  '2xl': 96,
};

const typographyConfig = {
  fontSizeMin: 1.125,
  fontSizeMax: 1.25,
  msFactorMin: 1.125,
  msFactorMax: 1.2,
  lineHeight: 1.6,
};

// used to calculate variable clamp properties for fluid typography tailwind classes
const clamp = (multi) => {
  // calc min and max font sizes
  const fsMin = typographyConfig.fontSizeMin * typographyConfig.msFactorMin ** multi;
  const fsMax = typographyConfig.fontSizeMax * typographyConfig.msFactorMax ** multi;

  const scMin = screensRem.min;
  const scMax = screensRem['2xl'];

  return `clamp(${fsMin}rem, calc(${fsMin}rem + (${fsMax} - ${fsMin}) * (100vw - ${scMin}rem / (${scMax} - ${scMin}))), ${fsMax}rem)`;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    screens: {
      min: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: clamp(-2),
      sm: clamp(-1),
      base: clamp(0),
      lg: clamp(1),
      xl: clamp(2),
      '2xl': clamp(3),
      '3xl': clamp(4),
      '4xl': clamp(5),
      '5xl': clamp(6),
      '6xl': clamp(7),
      '7xl': clamp(8),
      '8xl': clamp(9),
      '9xl': clamp(10),
    },
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
