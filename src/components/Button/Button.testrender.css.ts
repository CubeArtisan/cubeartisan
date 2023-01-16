import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const testButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const testButtonRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['2.5'],
});
