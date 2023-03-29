import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const main = style({
  marginTop: vars.space[10],
  width: vars.size.md,
  padding: vars.space.gutter,
  marginInline: 'auto',
});
