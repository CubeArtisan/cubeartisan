import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const appContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const appContent = style({
  minHeight: '100vh',
});

export const appBody = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
});

export const siteNavContainer = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

export const siteNav = style({
  display: 'flex',
});

export const siteNavUserActionsContainer = style({
  display: 'flex',
});

export const siteNavIcon = style({});

export const appSidebar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginInline: vars.space.gutter,
});

export const appMain = style({
  display: 'flex',
  flexDirection: 'column',
});

export const logoImage = style({
  height: vars.space[12],
  marginRight: vars.space[4],
});

export const sidebarButton = style({
  color: vars.color.neutral9,
  padding: vars.space['0.5'],
  borderRadius: vars.borderRadius.sm,
  transition: 'background-color 100ms, opacity 1s',
  border: 'none',
  borderImage: 'none',

  ':hover': {
    backgroundColor: vars.color.neutral6,
  },
  ':active': {
    backgroundColor: vars.color.neutral7,
    transition: 'background-color 0ms',
  },
  ':focus': {
    outline: 'none',
  },
});

export const sidebarIcon = style({
  height: vars.size[8],
  width: vars.size[8],
});

export const avatarContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
});

export const avatarIcon = style({});

export const avatarUsername = style({
  fontSize: vars.fontSize.lg,
  lineHeight: vars.lineHeight.lg,
  color: vars.color.primary11,
});

export const sidebarNav = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: vars.borderRadius.lg,
  width: vars.size.sm,
  transition: 'ease 200ms, translate ease 100ms',
  overflow: 'hidden',

  selectors: {
    '&:not([data-open])': {
      width: 0,
      translate: `-15.25rem 0`,
      transition: 'ease 200ms, translate ease 200ms',
    },
  },
});

export const sidebarActions = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: vars.borderRadius.lg,
  width: vars.size.sm,
  transition: 'ease 200ms, translate ease 100ms',
  overflow: 'hidden',

  selectors: {
    '&:not([data-open])': {
      width: 0,
      translate: `15.25rem 0`,
      transition: 'ease 200ms, translate ease 200ms',
    },
  },
});

export const main = style({
  flexGrow: 1,
  marginInline: vars.space['2.5'],
  marginBottom: vars.space['2.5'],
  backgroundColor: vars.color.neutral1,
  borderRadius: vars.borderRadius.lg,
});
