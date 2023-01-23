import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const heroContainer = style({
  backgroundColor: vars.color.neutral2,
  marginBottom: vars.space[5],
});

export const heroRoot = style({
  minHeight: vars.space[40],
  width: vars.size['content-80'],
  marginInline: 'auto',
  display: 'grid',
  alignItems: 'start',
  justifyItems: 'start',
  gridTemplateColumns: '1fr 1fr',
  paddingInline: vars.space[5],
  paddingBlock: vars.space[8],
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

export const hSeparator = style({
  marginInline: 'auto',
  width: '90vw',
  height: '1px',
  backgroundColor: vars.color.neutral12,
});
