import { style } from '@vanilla-extract/css';

import { colors, vars } from '@cubeartisan/cubeartisan/styles';

export const nav = style({
  height: vars.space[12],
  background: colors.secondary[6],
  color: colors.neutral[12],
  width: '100%',
});

export const navContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: `clamp(${vars.sizes.sm}, 80%, ${vars.sizes['5xl']})`,
  height: '100%',
  marginInline: 'auto',
  fontSize: vars.fontSize.base,
});

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[3],
});
