import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const hero = style([
  atoms({
    height: 40,
  }),
  {
    backgroundImage: `linear-gradient(to right, ${vars.backgroundColor.primary.primarySolid}, transparent)`,
  },
]);
