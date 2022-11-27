import { fluidFontScale } from '@cubeartisan/cubeartisan/styles/utils';

export const font = {
  sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
} as const;

export const fontSize = {
  xs: fluidFontScale(-2),
  sm: fluidFontScale(-1),
  base: fluidFontScale(0),
  lg: fluidFontScale(1),
  xl: fluidFontScale(2),
  '2xl': fluidFontScale(3),
  '3xl': fluidFontScale(4),
  '4xl': fluidFontScale(5),
  '5xl': fluidFontScale(6),
  '6xl': fluidFontScale(7),
  '7xl': fluidFontScale(8),
  '8xl': fluidFontScale(9),
  '9xl': fluidFontScale(10),
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

export const lineHeights = {
  none: '1',
  shorter: '1.25',
  short: '1.375',
  base: '1.5',
  tall: '1.625',
  taller: '2',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
} as const;

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;
