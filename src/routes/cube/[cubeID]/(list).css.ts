import { style } from '@vanilla-extract/css';

import { colors, sprinkles } from '@cubeartisan/cubeartisan/styles';

export const hero = style([
  sprinkles({
    height: 40,
  }),
  {
    backgroundImage: `linear-gradient(to right, ${colors.primary[6]}, transparent)`,
  },
]);
