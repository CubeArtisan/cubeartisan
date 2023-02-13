import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const container = style({
  flexGrow: 1,
  width: '100vw',
  display: 'flex',
});

export const main = style({
  position: 'relative',
  flexGrow: 1,
});

export const sidebar = style({
  backgroundColor: vars.color.neutral3,
  width: vars.size.md,
  display: 'flex',
  flexDirection: 'column',
  transition: 'width ease 200ms',
  overflow: 'visible',

  selectors: {
    '&:not([data-open])': {
      width: 0,
    },
  },
});

export const sidebarCloseButton = style({
  alignSelf: 'end',
  marginTop: vars.space['1'],
  marginRight: vars.space['1'],
  borderRadius: vars.borderRadius.sm,
  transition: 'background-color 100ms',

  ':hover': {
    backgroundColor: vars.color.neutral6,
  },
  ':active': {
    backgroundColor: vars.color.neutral7,
    transition: 'background-color 0ms',
  },
});

export const sidebarOpenButton = style({
  position: 'absolute',
  top: 0,
  left: 0,
  marginTop: vars.space['1'],
  marginLeft: vars.space['1'],
  borderRadius: vars.borderRadius.sm,
  transition: 'background-color 100ms, opacity 1s',

  ':hover': {
    backgroundColor: vars.color.neutral6,
  },
  ':active': {
    backgroundColor: vars.color.neutral7,
    transition: 'background-color 0ms',
  },
});

export const sidebarIcon = style({
  color: vars.color.neutral9,
  height: vars.size[8],
  width: vars.size[8],
  padding: vars.space['0.5'],
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
