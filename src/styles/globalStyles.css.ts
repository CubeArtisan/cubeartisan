import { globalStyle } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

globalStyle('body', {
  height: '100vh',
  backgroundColor: vars.color.neutral[1],
  color: vars.color.neutral[12],
});
