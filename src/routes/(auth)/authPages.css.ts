import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const formContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space['5'],
  padding: vars.space['8'],

  '@media': {
    [`screen and (min-width: ${tokens.screens.tablet})`]: {
      outline: `solid ${vars.borderSize.large} ${vars.color.neutral11}`,
      borderRadius: vars.borderRadius.lg,
    },
  },
});
