import { blackA, mauve, mauveDark, whiteA } from '@radix-ui/colors/src';

import { makeFluidFonts, remToPx } from '@cubeartisan/cubeartisan/styles/tokens/utils';

// maybe a better way to do this than exporting screens to utils
// done like this to get things working
// ideally for a more complete design system breakpoints would be customizeable
// probably unnecessary for the scope of this project
// maybe all settings are set separate from tokens def?

/**
 * converted to px for use in breakpoints
 * needed in rem for fluidFontScale and possible future settings
 *
 * min: portrait phone
 * sm: landscape phone
 * md: tablet
 * lg: laptop
 * xl: desktop
 * 2xl: ultrawide
 */
export const screensRem = {
  min: 20,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 80,
  '2xl': 96,
};

const screens = {
  min: remToPx(screensRem.min),
  sm: remToPx(screensRem.sm),
  md: remToPx(screensRem.md),
  lg: remToPx(screensRem.lg),
  '2xl': remToPx(screensRem['2xl']),
};

const fluidFonts = makeFluidFonts(screensRem);

export const tokens = {
  typography: {
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
      ...fluidFonts,
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
  },
  space: {
    px: '1px',
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
  },
  size: {
    px: '1px',
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
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    auto: 'auto',
    'content-60': `clamp(${screens.sm}, 60%, ${screens.lg})`,
    'content-70': `clamp(${screens.sm}, 70%, ${screens.lg})`,
    'content-80': `clamp(${screens.sm}, 80%, ${screens.lg})`,
    'content-90': `clamp(${screens.sm}, 90%, ${screens.lg})`,
    screenW: '100vw',
    screenH: '100vh',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
  },
  screens,
  focusRingSize: '3px',
  border: {
    radius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    width: {
      standard: '1px',
      large: '2px',
    },
  },
  color: {
    white: '#fff',
    black: '#121212',
    grayLight: {
      1: mauve.mauve1,
      2: mauve.mauve2,
      3: mauve.mauve3,
      4: mauve.mauve4,
      5: mauve.mauve5,
      6: mauve.mauve6,
      7: mauve.mauve7,
      8: mauve.mauve8,
      9: mauve.mauve9,
      10: mauve.mauve10,
      11: mauve.mauve11,
      12: mauve.mauve12,
    },
    grayDark: {
      1: mauveDark.mauve1,
      2: mauveDark.mauve2,
      3: mauveDark.mauve3,
      4: mauveDark.mauve4,
      5: mauveDark.mauve5,
      6: mauveDark.mauve6,
      7: mauveDark.mauve7,
      8: mauveDark.mauve8,
      9: mauveDark.mauve9,
      10: mauveDark.mauve10,
      11: mauveDark.mauve11,
      12: mauveDark.mauve12,
    },
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
  },
  effects: {
    blur: {
      none: '0',
      xs: '0.25rem',
      sm: '0.50rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    brightness: {
      0: 0,
      0.5: 0.5,
      0.75: 0.75,
      0.9: 0.9,
      0.95: 0.95,
      1: 1,
      1.05: 1.05,
      1.1: 1.1,
      1.25: 1.25,
      1.5: 1.5,
      2: 2,
    },
    contrast: {
      0: 0,
      0.5: 0.5,
      0.75: 0.75,
      1: 1,
      1.25: 1.25,
      1.5: 1.5,
      2: 2,
    },
    dropShadow: {
      xs: '0 1px 1px rgb(0 0 0 / 0.05)',
      sm: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
      md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
      none: '0 0 #0000',
    },
  },
  movement: {
    ease: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
  },
  shadow: {
    none: '0 0 #0000',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.09), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.09), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.09), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.09), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.24)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
  },
};

export type TokenType = typeof tokens;
