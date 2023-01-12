import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const overlay = style({
  backgroundColor: vars.color.shadowDark10,
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
  paddingInline: vars.space[10],
  paddingBlock: vars.space[8],
  width: vars.size.md,
  backgroundColor: vars.color.neutral3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  borderRadius: vars.borderRadius.md,
  gap: vars.space[4],
});

export const title = style({
  fontSize: vars.fontSize['2xl'],
  lineHeight: vars.lineHeight['2xl'],
  fontWeight: vars.fontWeight.semibold,
});

export const description = style({
  fontWeight: vars.fontWeight.light,
});
