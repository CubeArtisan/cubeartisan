import { screensRem } from '@cubeartisan/cubeartisan/styles/vars/screens';

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
export const fluidFontScale = (multi: number) => {
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
