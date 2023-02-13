import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const heroRoot = style({
  minHeight: vars.space[40],
  width: vars.size['content-80'],
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  paddingInline: vars.space[5],
  paddingBlock: vars.space[8],

  // temp
  background: vars.color.neutral2,
});

export const cubeNameLabel = style({
  fontSize: vars.fontSize['3xl'],
  fontWeight: vars.fontWeight.bold,
});

export const cubeDescriptionLabel = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.semibold,
});

export const cubeDescription = style({
  maxWidth: '40ch',
});
