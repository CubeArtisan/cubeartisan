import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const container = style({
  flexGrow: 1,
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
  backgroundColor: vars.color.neutral1,
  borderRadius: vars.borderRadius.lg,
  transition: 'ease 200ms',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
});
