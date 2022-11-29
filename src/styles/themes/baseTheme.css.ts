import { assignVars, style } from '@vanilla-extract/css';

import { darkTheme, lightTheme } from '@cubeartisan/cubeartisan/styles/themes/themes.css';
import { colors } from '@cubeartisan/cubeartisan/styles/themes/themeVars.css';

export const baseTheme = style({
  vars: assignVars(colors, lightTheme),
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: assignVars(colors, darkTheme),
    },
  },
});
