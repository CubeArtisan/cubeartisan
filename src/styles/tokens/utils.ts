export const remToPx = (rem: number) => `${rem * 16}px`;

export const makeFluidFonts = (
  screens: Record<string, number> & { min: number; '2xl': number },
): Record<string, string> => {
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
  const fluidFontScale = (multi: number): string => {
    // fluid font size settings in rem
    const fontVars = {
      baseMin: 1.125,
      baseMax: 1.25,
      minMultiScale: 1.125,
      maxMultiScale: 1.2,
    };

    /**
     * note that with this implementation, negative multipliers result in static clamp values
     * as min will be larger than max. This is intended and ok
     */
    const minFont = fontVars.baseMin * fontVars.minMultiScale ** multi;
    const maxFont = fontVars.baseMax * fontVars.maxMultiScale ** multi;
    const minScreen = screens.min;
    const maxScreen = screens['2xl'];

    const v = (100 * (maxFont - minFont)) / (maxScreen - minScreen);
    const r = (maxScreen * minFont - minScreen * maxFont) / (maxScreen - minScreen);

    return `clamp(${minFont}rem, ${v}vw + ${r}rem , ${maxFont}rem)`;
  };

  return {
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
  };
};
