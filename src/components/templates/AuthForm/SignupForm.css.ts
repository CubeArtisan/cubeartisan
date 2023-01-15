import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space['2.5'],
  gap: vars.space['2.5'],
});

export const formTitle = style({
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space['1'],
  alignSelf: 'center',
});

export const formLabel = style({
  fontSize: vars.fontSize.sm,
});

export const formTextInput = style({});
