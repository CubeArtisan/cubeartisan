/**
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

const remToPx = (rem: number) => `${rem * 16}px`;

/**
 * min: portrait phone
 * sm: landscape phone
 * md: tablet
 * lg: laptop
 * xl: desktop
 * 2xl: ultrawide
 */
export const screens = {
  min: remToPx(screensRem.min),
  sm: remToPx(screensRem.sm),
  md: remToPx(screensRem.md),
  lg: remToPx(screensRem.lg),
  xl: remToPx(screensRem.xl),
  '2xl': remToPx(screensRem['2xl']),
};

export default screens;
