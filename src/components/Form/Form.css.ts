import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const form = style({
  backgroundColor: vars.color.neutral3,
  color: vars.color.neutral1,
  padding: vars.space[5],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const formTitle = style({
  fontSize: vars.fontSize['2xl'],
  lineHeight: vars.lineHeight['2xl'],
  marginBottom: vars.space[5],
});
