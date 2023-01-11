import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import makeBorders from '@cubeartisan/cubeartisan/styles/themes/makeBorders';
import type { TokenType } from '@cubeartisan/cubeartisan/styles/tokens';

export type MakeThemeProps = {
  tokens: TokenType;
  colorPalette: ColorPaletteType;
};

export const makeTheme = ({ tokens, colorPalette }: MakeThemeProps) =>
  ({
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight,
    fontSize: tokens.typography.fontSize,
    lineHeight: tokens.typography.lineHeight,
    letterSpacing: tokens.typography.letterSpacing,

    screens: tokens.screens,
    space: tokens.space,
    size: tokens.size,

    boxShadow: makeBorders(colorPalette),
    borderRadius: tokens.border.radius,

    color: {
      ...colorPalette,
      ...tokens.color,
    },
  } as const);
