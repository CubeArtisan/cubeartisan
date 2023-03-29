import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const formRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.gutter,
});

export const formHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

export const cubeLogo = style({
  height: vars.size[10],
});

export const formTitle = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
});

export const formButtons = style({
  marginTop: vars.space.gutter,
  display: 'flex',
  justifyContent: 'space-between',
});
