import { recipe } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const separatorRecipe = recipe({
  base: [
    atoms({
      backgroundColor: 'neutralSolid',
    }),
    {
      border: 'none',
    },
  ],
  variants: {
    orientation: {
      horizontal: atoms({
        height: 'px',
        width: '4/5',
      }),
      vertical: atoms({
        height: '4/5',
        width: 'px',
      }),
    },
  },
});
