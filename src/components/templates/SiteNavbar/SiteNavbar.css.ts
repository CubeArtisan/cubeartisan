import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const navContainer = style({
  width: vars.size['content-80'],
  marginInline: 'auto',
  display: 'grid',
  grid: '[nav-start] "nav . actions" 4.25rem [nav-end] / auto 1fr auto',
  alignItems: 'center',
});

export const nav = style({
  gridArea: 'nav',
});

export const navLinks = style({
  display: 'flex',
  gap: vars.size[3],
});

const navItemBase = style({
  ':hover': {
    background: vars.color.neutral4,
    outline: `solid ${vars.borderSize.large} ${vars.color.neutral7}`,
  },

  ':active': {
    background: vars.color.neutral5,
  },
});

export const logoContainer = style([
  navItemBase,
  {
    borderRadius: vars.borderRadius.md,
    paddingLeft: vars.space[1],
  },
]);

export const logoImage = style({
  height: vars.space[12],
  marginRight: vars.space[4],
});

export const navLink = style([
  navItemBase,
  {
    borderRadius: vars.borderRadius.md,
    paddingInline: vars.space[2],
    paddingBlock: vars.space[1],
  },
]);

export const navActions = style({
  gridArea: 'actions',
  display: 'flex',
  gap: vars.size[3],
});

export const navAction = style([
  navItemBase,
  {
    borderRadius: vars.borderRadius.lg,
    height: vars.size[8],
  },
]);
