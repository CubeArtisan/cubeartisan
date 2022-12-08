import { assignVars, style } from '@vanilla-extract/css';

import { darkTheme } from '@cubeartisan/cubeartisan/styles/themes/darkTheme.css';
import { lightTheme } from '@cubeartisan/cubeartisan/styles/themes/lightTheme.css';
import { themeColors } from '@cubeartisan/cubeartisan/styles/themes/themeVars.css';

export const theme = style({
  vars: assignVars(themeColors, lightTheme),
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: assignVars(themeColors, darkTheme),
    },
  },
});
