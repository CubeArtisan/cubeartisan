import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const editSidebar = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space.gutter,
  gap: vars.space['2.5'],
});

export const editSidebarTitle = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
  cursor: 'default',
  textAlign: 'center',
});
