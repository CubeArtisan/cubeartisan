import { createThemeContract } from '@vanilla-extract/css';

import { lightPalette } from '@cubeartisan/cubeartisan/styles/themes/lightTheme';
import makeTheme from '@cubeartisan/cubeartisan/styles/themes/makeTheme';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const vars = createThemeContract(makeTheme(tokens, lightPalette));
