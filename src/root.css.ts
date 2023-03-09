import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const body = style({
  backgroundColor: vars.color.neutral2,
  color: vars.color.neutral12,

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
