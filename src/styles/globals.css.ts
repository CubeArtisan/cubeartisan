import { globalStyle } from '@vanilla-extract/css';

import { darkTheme, lightTheme } from './themes';

globalStyle('html, body', {
  lineHeight: 'calc(2px + 2ex + 2px)',
});

globalStyle('body', {
  color: lightTheme,
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: darkTheme,
    },
  },
});
