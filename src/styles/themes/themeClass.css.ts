import { assignVars, style } from '@vanilla-extract/css';

import { darkPalette } from '@cubeartisan/cubeartisan/styles/themes/darkTheme';
import { lightPalette } from '@cubeartisan/cubeartisan/styles/themes/lightTheme';
import makeTheme from '@cubeartisan/cubeartisan/styles/themes/makeTheme';
import { vars } from '@cubeartisan/cubeartisan/styles/themes/vars.css';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const theme = style({
  vars: assignVars(vars, makeTheme(tokens, lightPalette)),
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: assignVars(vars, makeTheme(tokens, darkPalette)),
    },
  },
});
