import { blackA, whiteA } from '@radix-ui/colors/src';

const typography = {
  fontFamily: {
    sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontWeight: {
    hairline: '100',
    thin: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  fontSize: {
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
  },
  lineHeight: {
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
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

/**
 * Current calculation is num-columns * column-size * gaps
 * notably this excludes the side margins which add a total of 1.25rem or 20px more
 */
const screens = {
  mobile: '332px',
  tablet: '684px',
  laptop: '1036px',
  ultrawide: '1388px',
};

const space = {
  auto: 'auto',
  px: '1px',
  gutter: '1.25rem',
  0: '0px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

/**
 * xs-8xl are based on design grid column widths
 */
const size = {
  ...space,
  xs: '4.25rem',
  sm: '9.75rem',
  md: '15.25rem',
  lg: '20.75rem', // 4 columns (mobile breakpoint). Never set min-size to larger than this
  xl: '26.25rem',
  '2xl': '31.75rem', // 6 columns, half of laptop breakpoint
  '3xl': '37.25rem',
  '4xl': '42.75rem',
  '5xl': '48.75rem',
  '6xl': '53.75rem',
  '7xl': '59.25rem',
  '8xl': '64.75rem',
  screenWidth: '100vw',
  screenHeight: '100vh',
  maxContent: 'max-content',
  minContent: 'min-content',
  'content-60': `clamp(${screens.mobile}, 60%, ${screens.laptop})`,
  'content-70': `clamp(${screens.mobile}, 70%, ${screens.laptop})`,
  'content-80': `clamp(${screens.mobile}, 80%, ${screens.laptop})`,
  'content-90': `clamp(${screens.mobile}, 90%, ${screens.laptop})`,
};

const border = {
  width: {
    standard: '1px',
    large: '2px',
    'focus-ring': '3px',
  },
  radius: {
    none: 0,
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
};

const color = {
  white: '#fff',
  black: '#121212',
  shadowLight: {
    1: whiteA.whiteA1,
    2: whiteA.whiteA2,
    3: whiteA.whiteA3,
    4: whiteA.whiteA4,
    5: whiteA.whiteA5,
    6: whiteA.whiteA6,
    7: whiteA.whiteA7,
    8: whiteA.whiteA8,
    9: whiteA.whiteA9,
    10: whiteA.whiteA10,
    11: whiteA.whiteA11,
    12: whiteA.whiteA12,
  },
  shadowDark: {
    1: blackA.blackA1,
    2: blackA.blackA2,
    3: blackA.blackA3,
    4: blackA.blackA4,
    5: blackA.blackA5,
    6: blackA.blackA6,
    7: blackA.blackA7,
    8: blackA.blackA8,
    9: blackA.blackA9,
    10: blackA.blackA10,
    11: blackA.blackA11,
    12: blackA.blackA12,
  },
};

const effects = {
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// dropShadow: {
//   xs: '0 1px 1px rgb(0 0 0 / 0.05)',
//   sm: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
//   md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
//   lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
//   xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
//   '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
//   none: '0 0 #0000',
// },

export const tokens = {
  typography,
  screens,
  space,
  size,
  border,
  color,
  effects,
};

export type TokenType = typeof tokens;
