import type { DeepPartial } from 'utility-types';

import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import { makeSemanticColors, SemanticColors } from '@cubeartisan/cubeartisan/styles/themes/semanticColors';
import type { TokenType } from '@cubeartisan/cubeartisan/styles/tokens';

export type MakeThemeProps = {
  tokens: TokenType;
  colorPalette: ColorPaletteType;
  semanticColorOverrides?: DeepPartial<SemanticColors>;
};

export const makeTheme = ({ tokens, colorPalette, semanticColorOverrides }: MakeThemeProps) => {
  const { backgroundColor, boxShadow, textColor } = makeSemanticColors({
    colorPalette,
    overrides: semanticColorOverrides,
  });
  return {
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight,
    fontSize: tokens.typography.fontSize,
    lineHeight: tokens.typography.lineHeight,
    letterSpacing: tokens.typography.letterSpacing,

    space: tokens.space,
    size: tokens.size,
    screens: tokens.screens,

    borderRadius: tokens.border.radius,

    backgroundColor: {
      ...backgroundColor,
      shadow: colorPalette.shadow,
    },
    textColor,
    staticColor: tokens.color,

    boxShadow: tokens.shadow,
    boxShadowBorder: boxShadow,
  } as const;
};
