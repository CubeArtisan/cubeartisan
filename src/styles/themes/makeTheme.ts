import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
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
    relativeSpace: tokens.relativeSpace,
    size: tokens.size,
    relativeSize: tokens.relativeSize,

    borderSize: tokens.border.width,
    borderRadius: tokens.border.radius,
    boxShadow: {
      none: '0 0 #0000',
      xs: `0 1px 2px 0 ${colorPalette.shadow4}`,
      sm: `0 1px 3px 0 ${colorPalette.shadow5}, 0 1px 2px -1px ${colorPalette.shadow6}`,
      md: `0 4px 6px -1px ${colorPalette.shadow5}, 0 2px 4px -2px ${colorPalette.shadow6}`,
      lg: `0 10px 15px -3px ${colorPalette.shadow5}, 0 4px 6px -4px ${colorPalette.shadow6}`,
      xl: `0 20px 25px -5px ${colorPalette.shadow5}, 0 8px 10px -6px ${colorPalette.shadow6}`,
      '2xl': `0 25px 50px -12px ${colorPalette.shadow8}`,
      inner: `inset 0 2px 4px 0 ${colorPalette.shadow4}`,
    },

    color: {
      ...colorPalette,
      ...tokens.color,
    },
  } as const);
