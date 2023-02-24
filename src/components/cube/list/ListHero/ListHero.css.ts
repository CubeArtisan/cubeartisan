import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const heroRoot = style({
  minHeight: vars.space[40],
  width: vars.size['content-80'],
  marginInline: 'auto',
  display: 'grid',
  alignItems: 'start',
  justifyItems: 'start',
  gridTemplateColumns: '1fr 1fr',
  paddingInline: vars.space.gutter,
  marginTop: vars.space.gutter,
});

export const heroTitleSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const cubeTitle = style({
  fontSize: vars.fontSize['4xl'],
  lineHeight: vars.lineHeight['4xl'],
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space['2.5'],
});

export const cubeSubtitle = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.neutral11,
  marginBottom: vars.space.gutter,
});

export const cubeOwner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1.5'],
  marginLeft: vars.space['2.5'],
});

export const cubeOwnerAvatar = style({
  width: vars.space[6],
  height: vars.space[6],
});

export const heroActions = style({
  display: 'flex',
  gap: vars.space[8],
  alignItems: 'center',
});

export const heroActionButton = style({
  color: vars.color.neutral11,

  ':hover': {
    color: vars.color.neutral12,
  },
});

export const heroActionIcon = style({
  height: vars.space[6],
  width: vars.space[6],
});

export const cubeDescriptionHeader = style({
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.semibold,
});

export const cubeDescription = style({
  maxWidth: '40ch',
  color: vars.color.neutral11,
});

export const heroSeparator = style({
  width: vars.size['content-90'],
  height: '1px',
  marginInline: 'auto',
  marginBottom: vars.space[5],
  backgroundColor: vars.color.neutral12,
});
