import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.gutter,
});

export const separator = style({
  height: '1px',
  width: vars.size['content-90'],
  marginInline: 'auto',
  backgroundColor: vars.color.neutral12,
});
