import { style } from '@vanilla-extract/css';

import { colors, sprinkles, vars } from '@cubeartisan/cubeartisan/styles';

export const nav = style([
  sprinkles({
    height: 12,
    width: 'full',
  }),
  {
    background: colors.neutral[2],
    color: colors.neutral[12],
  },
]);

export const navContainer = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    height: 'full',
    fontSize: 'base',
  }),
  {
    width: `clamp(${vars.sizes.sm}, 80%, ${vars.sizes['5xl']})`,
    marginInline: 'auto',
  },
]);

export const navList = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  {
    gap: vars.space[3],
  },
]);
