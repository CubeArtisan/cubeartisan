import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const hero = style({
  height: vars.size[40],
  backgroundImage: `linear-gradient(to right, ${vars.color.primary9}, transparent)`,
});
