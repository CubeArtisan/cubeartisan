import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const container = style({
  flexGrow: 1,
  width: '100vw',
  height: 'calc(100vh - 4.25rem)',
  display: 'flex',
  paddingInline: vars.space['2.5'],
  paddingBottom: vars.space['2.5'],
  overflowY: 'scroll',
  scrollBehavior: 'smooth',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const main = style({
  position: 'relative',
  flexGrow: 1,
  backgroundColor: vars.color.neutral2,
  borderRadius: vars.borderRadius.lg,
  transition: 'ease 200ms',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
});

export const sidebar = style({
  backgroundColor: vars.color.neutral2,
  borderRadius: vars.borderRadius.lg,
  width: vars.size.sm,
  marginRight: vars.space['2.5'],
  display: 'flex',
  flexDirection: 'column',
  transition: 'ease 200ms, translate ease 100ms',
  overflow: 'hidden',

  selectors: {
    '&:not([data-open])': {
      width: 0,
      margin: 0,
      translate: `-15.25rem 0`,
      transition: 'ease 200ms, translate ease 200ms',
    },
  },
});

export const sidebarButton = style({
  color: vars.color.neutral9,
  position: 'absolute',
  top: 0,
  left: 0,
  padding: vars.space['1'],
  borderRadius: vars.borderRadius.sm,
  transition: 'background-color 100ms, opacity 1s',
  backgroundColor: vars.color.neutral2,

  ':hover': {
    backgroundColor: vars.color.neutral6,
  },
  ':active': {
    backgroundColor: vars.color.neutral7,
    transition: 'background-color 0ms',
  },
  ':focus': {
    outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
    outlineOffset: `-4px`,
    color: vars.color.neutral10,
  },
});

export const sidebarIcon = style({
  height: vars.size[8],
  width: vars.size[8],
});

export const sidebarContent = style({
  transition: 'inherit',

  selectors: {
    [`${sidebar}[data-open] &`]: {
      width: 0,
    },
  },
});

export const sidebarNav = style({
  paddingLeft: vars.space.gutter,
});
