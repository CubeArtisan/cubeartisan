import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const container = style({
  minHeight: 'calc(100vh - 4.25rem)',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
});

export const mainContainer = style({
  position: 'relative',
  backgroundColor: vars.color.neutral1,
  overflowX: 'scroll',
  paddingBottom: vars.space['2.5'],

  '@media': {
    [`screen and (min-width: ${tokens.screens.laptop})`]: {
      borderRadius: vars.borderRadius.lg,
      marginInline: vars.space['2.5'],
    },
  },
});

export const modalOverlay = style({
  backgroundColor: vars.color.shadowDark10,
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '0',

  selectors: {
    '&[data-expanded]': {
      width: '100vw',
    },
  },
});

const modalContent = style({
  position: 'fixed',
  backgroundColor: vars.color.neutral2,
  paddingTop: vars.space.gutter,
  width: 0,
  transition: 'width 200ms',
  overflow: 'hidden',
  whiteSpace: 'nowrap',

  selectors: {
    '&[data-expanded]': {
      width: vars.size.md,
    },
  },
});

export const cubeSidebarContainer = style({
  position: 'relative',
  maxWidth: 0,
  width: 0,
  transition: 'max-width 200ms',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  selectors: {
    '&[data-open=true]': {
      '@media': {
        [`screen and (min-width: ${tokens.screens.laptop})`]: {
          maxWidth: vars.size[44],
          width: 'auto',
        },
      },
    },
    '&[data-open=false]': {
      maxWidth: 0,
    },
  },

  '@media': {
    [`screen and (min-width: ${tokens.screens.laptop})`]: {
      maxWidth: vars.size[44],
      width: 'auto',
    },
  },
});

export const editSidebarModalContent = style([
  modalContent,
  {
    inset: '0 0 0 auto',
  },
]);

export const editSidebarContainer = style([
  cubeSidebarContainer,
  {
    paddingTop: vars.space[10],
    backgroundColor: vars.color.neutral1,
    borderRadius: vars.borderRadius.lg,

    '@media': {
      [`screen and (min-width: ${tokens.screens.laptop})`]: {
        selectors: {
          '&[data-open="true"]': {
            marginRight: vars.space['2.5'],
          },
        },
      },
    },
  },
]);

export const editSidebar = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.space.gutter,
  gap: vars.space['2.5'],
});

export const editSidebarOpenButton = style({
  position: 'fixed',
  bottom: vars.space.gutter,
  right: vars.space.gutter,
  padding: vars.space['2.5'],
  borderRadius: `${vars.borderRadius.xl} !important`,
});

export const editSidebarCloseButton = style({
  position: 'absolute',
  top: vars.space['2.5'],
  left: vars.space['2.5'],
});

export const editSidebarModalCloseButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  left: vars.space.gutter,
});

export const editSidebarTitle = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
  cursor: 'default',
  textAlign: 'center',
});

export const buttonIcon = style({
  width: vars.size[6],
  height: vars.size[6],
  margin: vars.space[1],
});

export const cubeNavModalContent = style([
  modalContent,
  {
    inset: '0 auto 0 0',
  },
]);

export const cubeNavSidebarContainer = style([cubeSidebarContainer]);

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
  zIndex: 10,

  '@media': {
    [`screen and (max-width: ${tokens.screens.tablet})`]: {
      position: 'fixed',
      padding: vars.space['2.5'],
      borderRadius: `${vars.borderRadius.xl} !important`,
    },
  },
});

export const cubeNavOpenIcon = style([
  buttonIcon,
  {
    '@media': {
      [`screen and (max-width: ${tokens.screens.tablet})`]: {
        width: vars.size[8],
        height: vars.size[8],
        margin: 0,
      },
    },
  },
]);

export const cubeNavSidebarCloseButton = style({
  position: 'absolute',
  top: vars.space['2.5'],
  right: vars.space['2.5'],
});

export const cubeNavModalCloseButton = style({
  position: 'absolute',
  top: vars.space.gutter,
  right: vars.space.gutter,
});

const cubeNavLink = style({
  color: vars.color.neutral11,
  padding: vars.space[1],
  borderRadius: vars.borderRadius.md,
  transition: 'color 100ms',

  ':hover': {
    color: vars.color.neutral12,
  },
  ':focus-visible': {
    outline: `${vars.borderSize['focus-ring']} solid ${vars.color.neutral7}`,
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
    backgroundColor: vars.color.primary8,
    color: vars.color.primary12,
  },
]);

export const cubeNavLinkLargeActive = style([
  cubeNavLinkLarge,
  {
    backgroundColor: vars.color.primary8,
    color: vars.color.primary12,
  },
]);

export const cubeNavHeading = style({
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
  cursor: 'default',

  selectors: {
    [`${cubeNavLinkSmall} ~ &`]: {
      marginTop: vars.space['2.5'],
    },
  },
});
