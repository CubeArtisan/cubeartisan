import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const nav = style([
  atoms({
    height: 12,
    width: 'full',
  }),
  {
    background: vars.backgroundColor.neutral.neutralSubtleSecondary,
    color: vars.textColor.neutral.neutralContrast,
  },
]);

export const navContainer = style([
  atoms({
    display: 'flex',
    justifyContent: 'spaceBetween',
    height: 'full',
    fontSize: 'base',
  }),
  {
    width: `clamp(${vars.size.sm}, 80%, ${vars.size['5xl']})`,
    marginInline: 'auto',
  },
]);

export const navList = style([
  atoms({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spaceBetween',
  }),
  {
    gap: vars.space[3],
  },
]);
