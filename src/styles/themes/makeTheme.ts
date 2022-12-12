import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import type { TokenType } from '@cubeartisan/cubeartisan/styles/tokens';

export default (tokens: TokenType, colorPalette: ColorPaletteType) =>
  ({
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight,
    fontSize: tokens.typography.fontSize,
    lineHeight: tokens.typography.lineHeight,
    letterSpacing: tokens.typography.letterSpacing,

    space: tokens.space,
    size: tokens.size,

    borderRadius: tokens.border.radius,
    borderWidth: tokens.border.width,

    color: {
      ...tokens.color,
      ...colorPalette,
    },
  } as const);
