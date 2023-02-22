import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const heroContainer = style({
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

export const cubeName = style({
  fontSize: vars.fontSize['3xl'],
  lineHeight: vars.lineHeight['3xl'],
  fontWeight: vars.fontWeight.bold,
  borderRadius: vars.borderRadius.sm,
});

export const cubeOwnerName = style({
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.neutral11,
});

export const cubeDescriptionHeader = style({
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.semibold,
});

export const cubeDescription = style({
  maxWidth: '40ch',
});

export const separator = style({
  marginInline: 'auto',
  width: vars.size['content-90'],
  height: '1px',
  backgroundColor: vars.color.neutral12,
});
