import { assignVars, style } from '@vanilla-extract/css';

import { darkTheme } from '@cubeartisan/cubeartisan/styles/themes/dark/';
import { lightTheme } from '@cubeartisan/cubeartisan/styles/themes/light/';
import { vars } from '@cubeartisan/cubeartisan/styles/themes/vars.css';

export const themeClass = style({
  vars: assignVars(vars, lightTheme),
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: assignVars(vars, darkTheme),
    },
  },
});
