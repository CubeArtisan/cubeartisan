import { colorPalette } from '@cubeartisan/cubeartisan/styles/themes/light/colorPalette';
import { semanticColorOverrides } from '@cubeartisan/cubeartisan/styles/themes/light/semanticColorsOverrides';
import { makeTheme } from '@cubeartisan/cubeartisan/styles/themes/makeTheme';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const lightTheme = makeTheme({ tokens, colorPalette, semanticColorOverrides });
