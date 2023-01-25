import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const appContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const appContent = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  marginBottom: vars.space[5],
});
