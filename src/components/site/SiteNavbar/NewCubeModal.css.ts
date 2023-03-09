import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const triggerIcon = style({
  height: vars.space[8],
  width: vars.space[8],
  color: vars.color.white,
});

export const importContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const buttonsContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
