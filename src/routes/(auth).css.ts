import { style } from '@vanilla-extract/css';

import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const authContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',

  '@media': {
    [`screen and (min-width: ${tokens.screens.tablet})`]: {
      justifyContent: 'center',
    },
  },
});

export const authFormContainer = style({
  display: 'flex',
});
