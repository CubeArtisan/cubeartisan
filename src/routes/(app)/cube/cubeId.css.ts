import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const container = style({
  height: 'calc(100vh - 4.25rem)',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
});

export const mainContainer = style({
  position: 'relative',
  backgroundColor: vars.color.neutral1,
  overflowX: 'scroll',
  scrollBehavior: 'smooth',

  textAlign: 'center', // temp

  '@media': {
    [`screen and (min-width: ${tokens.screens.tablet})`]: {
      borderRadius: vars.borderRadius.lg,
      margin: vars.space['2.5'],
    },
  },
});

export const editSidebarContainer = style({
  background: 'red',
  overflow: 'hidden',
  width: 0,

  selectors: {
    '&[data-open=true]': {
      width: 'auto',
    },
    '&[data-open=false]': {
      width: 0,
    },
  },
});

export const editSidebarToggleButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  right: vars.space.gutter,

  '@media': {
    [`screen and (min-width: ${tokens.screens.laptop})`]: {
      display: 'none',
    },
  },
});

export const buttonIcon = style({
  width: vars.size[6],
  height: vars.size[6],
  margin: vars.space[1],
});

export const cubeNavSidebarContainer = style({
  position: 'relative',
  width: 0,

  selectors: {
    '&[data-open=true]': {
      '@media': {
        [`screen and (min-width: ${tokens.screens.tablet})`]: {
          width: 'auto',
        },
        [`screen and (min-width: ${tokens.screens.laptop})`]: {
          width: 'auto',
        },
      },
    },
    '&[data-open=false]': {
      width: 0,
    },
  },

  '@media': {
    [`screen and (min-width: ${tokens.screens.laptop})`]: {
      width: 'auto',
    },
  },
});

export const cubeNavModalOverlay = style({
  backgroundColor: vars.color.shadowDark10,
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
});

export const cubeNavModalContent = style({
  position: 'fixed',
  inset: '0 auto 0 0',
  backgroundColor: vars.color.neutral3,
  paddingTop: vars.space.gutter,
  width: vars.size.md,
});

export const cubeNav = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space.gutter,
  gap: vars.space['2.5'],
});

export const cubeNavOpenButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  left: vars.space.gutter,
});

export const cubeNavSidebarCloseButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  right: vars.space['2.5'],
});

export const cubeNavModalCloseButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  right: vars.space.gutter,
});

const cubeNavLink = style({
  color: vars.color.neutral11,

  ':hover': {
    color: vars.color.neutral12,
  },
});

export const cubeNavLinkSmall = style([
  cubeNavLink,
  {
    marginLeft: vars.space.gutter,
    fontSize: vars.fontSize.lg,
    lineHeight: vars.lineHeight.lg,
  },
]);

export const cubeNavLinkLarge = style([
  cubeNavLink,
  {
    fontSize: vars.fontSize.xl,
    lineHeight: vars.lineHeight.xl,
    fontWeight: vars.fontWeight.semibold,
  },
]);

export const cubeNavLinkSmallActive = style([
  cubeNavLinkSmall,
  {
    backgroundColor: vars.color.primary9,
  },
]);

export const cubeNavLinkLargeActive = style([
  cubeNavLinkLarge,
  {
    backgroundColor: vars.color.primary9,
  },
]);

export const cubeNavHeading = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,

  selectors: {
    [`${cubeNavLinkSmall} ~ &`]: {
      marginTop: vars.space['2.5'],
    },
  },
});
