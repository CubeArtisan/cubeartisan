import { colorPalette } from '@cubeartisan/cubeartisan/styles/themes/dark/colorPalette';
import { semanticColorOverrides } from '@cubeartisan/cubeartisan/styles/themes/dark/semanticColorsOverrides';
import { makeTheme } from '@cubeartisan/cubeartisan/styles/themes/makeTheme';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const darkTheme = makeTheme({ tokens, colorPalette, semanticColorOverrides });
