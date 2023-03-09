import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2.5'],
  width: vars.size['content-80'],
  height: vars.size.xs,
  marginInline: 'auto',

  '@media': {
    [`screen and (max-width: ${tokens.screens.tablet})`]: {
      justifyContent: 'space-around',
    },
  },
});

export const logo = style({
  height: vars.size[10],
});

export const navIcon = style({
  height: vars.size[6],
  width: vars.size[6],
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

export const siteSearch = style({
  position: 'relative',
  marginInline: 'auto',
});

export const searchInput = style({
  ':hover': {
    backgroundColor: vars.color.neutral4,
  },
});

export const searchIcon = style({
  position: 'absolute',
  width: '20px',
  height: '20px',
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
