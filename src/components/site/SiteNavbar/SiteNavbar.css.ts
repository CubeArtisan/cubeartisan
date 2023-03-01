import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const navContainer = style({
  display: 'flex',
  justifyContent: 'space-around',
  marginInline: 'auto',
  height: vars.size.xs,
  alignItems: 'center',
});

export const navSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space['2.5'],
});

export const siteLogo = style({
  height: vars.size[10],
});

export const navItemContainer = style({
  color: vars.color.neutral11,
  padding: vars.space['1.5'],
  borderRadius: vars.borderRadius.lg,

  ':hover': {
    color: vars.color.neutral12,
    backgroundColor: vars.color.neutral4,
    outline: `1px solid ${vars.color.neutral6}`,
  },

  ':active': {
    backgroundColor: vars.color.neutral5,
    outline: `1px solid ${vars.color.neutral7}`,
  },

  selectors: {
    '&:has(:focus-visible)': {
      backgroundColor: vars.color.neutral4,
      outline: `3px solid ${vars.color.neutral6}`,
    },
  },
});

export const navItem = style({});

export const navIcon = style({
  width: vars.size[5],
  height: vars.size[5],
});

export const siteSearch = style({
  position: 'relative',
});

export const searchInput = style({
  ':hover': {
    backgroundColor: vars.color.neutral4,
  },
});

export const searchIconContainer = style({
  position: 'absolute',
  top: '20%',
  left: '6px',
  color: vars.color.neutral11,

  selectors: {
    ':focus ~ &': {
      display: 'none',
    },
    ':hover ~ &': {
      color: vars.color.neutral12,
    },
  },
});

export const avatarIcon = style({
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.color.primary7,
  padding: vars.space[1],
  outline: `${vars.borderSize.large} solid ${vars.color.neutral11}`,
});
