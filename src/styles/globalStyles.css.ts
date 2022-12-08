import { globalStyle } from '@vanilla-extract/css';

import { colors } from '@cubeartisan/cubeartisan/styles';

globalStyle('body', {
  height: '100vh',
  backgroundColor: colors.neutral[1],
  color: colors.neutral[12],
});
