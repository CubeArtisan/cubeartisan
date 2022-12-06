import { screensRem } from './screens.css';

// font size settings in rem
const fontVars = {
  baseMin: 1.125,
  baseMax: 1.25,
  minMultiScale: 1.125,
  maxMultiScale: 1.2,
};

/**
 * used to calculate variable clamp properties for fluid typography tailwind classes
 *
 * clamp([min]rem, [v]vw + [r]rem , [max]rem)
 *
 * y = (v/100) * x + r
 *
 * x = current viewport width
 * y = resulting fluid font size
 * v = viewport modifier to calculate font size
 * r = relative size from default font size
 *
 * source: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
 */
const fluidFontScale = (multi: number) => {
  /**
   * note that with this implementation, negative multipliers result in static clamp values
   * as min will be larger than max. This is intended and ok
   */
  const minFont = fontVars.baseMin * fontVars.minMultiScale ** multi;
  const maxFont = fontVars.baseMax * fontVars.maxMultiScale ** multi;
  const minScreen = screensRem.min;
  const maxScreen = screensRem['2xl'];

  const v = (100 * (maxFont - minFont)) / (maxScreen - minScreen);
  const r = (maxScreen * minFont - minScreen * maxFont) / (maxScreen - minScreen);

  return `clamp(${minFont}rem, ${v}vw + ${r}rem , ${maxFont}rem)`;
};

export const fontFamily = {
  sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
} as const;

const fluidFontSize = {
  'fluid-xs': fluidFontScale(-2),
  'fluid-sm': fluidFontScale(-1),
  'fluid-base': fluidFontScale(0),
  'fluid-lg': fluidFontScale(1),
  'fluid-xl': fluidFontScale(2),
  'fluid-2xl': fluidFontScale(3),
  'fluid-3xl': fluidFontScale(4),
  'fluid-4xl': fluidFontScale(5),
  'fluid-5xl': fluidFontScale(6),
  'fluid-6xl': fluidFontScale(7),
  'fluid-7xl': fluidFontScale(8),
  'fluid-8xl': fluidFontScale(9),
  'fluid-9xl': fluidFontScale(10),
} as const;

export const fontSize = {
  ...fluidFontSize,
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
} as const;

export const lineHeights = {
  xs: '1rem',
  sm: '1.25rem',
  base: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem',
  '2xl': '2rem',
  '3xl': '2.25rem',
  '4xl': '2.5rem',
  '5xl': '1',
  '6xl': '1',
  '7xl': '1',
  '8xl': '1',
  '9xl': '1',
} as const;

export const fontWeight = {
  hairline: '100',
  thin: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;
