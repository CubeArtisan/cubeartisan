import { globalStyle } from '@vanilla-extract/css';

import { darkTheme, lightTheme } from '@cubeartisan/cubeartisan/styles/themes';

globalStyle('html, body', {
  lineHeight: 'calc(2px + 2ex + 2px)',
});

lightTheme;
