import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

const makeBorders = (colorPalette: ColorPaletteType) => {
  const makeBorderStrings = (color) => ({
    standard: `0 0 0 ${tokens.border.width.standard} ${color}`,
    large: `0 0 0 ${tokens.border.width.large} ${color}`,
  });

  const borders = {
    neutral: makeBorderStrings(colorPalette.neutral),
    primary: makeBorderStrings(colorPalette.primary),
    success: makeBorderStrings(colorPalette.success),
    info: makeBorderStrings(colorPalette.info),
    warning: makeBorderStrings(colorPalette.warning),
    danger: makeBorderStrings(colorPalette.danger),
    focus: `0 0 0 ${tokens.border.width['focus-ring']} ${colorPalette.neutral[9]}`,
  };

  return borders;
};

export default makeBorders;
